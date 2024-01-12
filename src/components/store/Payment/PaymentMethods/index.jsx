import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { savePaymentMethod } from '@/services/payment';
import { getPaymentMethods } from '@/services/payment';
import { paramGetBinData, paramGetRates } from '@/services/store/payment';

{
  /* VAKIFBANK: 
75021001021102040015031223VBB7463119061223091113543407122409102034345412
000000030000 // Tutar 12 hane yazılamlıdır.
61580126TR4100015001580073057794380718MUHAMMED BERA PUSA1002032032F2E40CAF2995A981BF6CC1211B4246356304B942


                  Enpara: 
7502100102110204011103120000016564525412
000000055599 //Tutar 12 hane yazılmalıdır.
61590126TR6500111000000000811690350719Abdullah%20Cihad%20Teke10020320320c0092c329a84c469fa200da1281bd93630449C3 */
}
{
  /* isbank:
75021001021102040064031232544487821606122309111505555412
000000060000 //Tutar 12 hane yazılmalıdır.
61530126TR2900064000001424604011390713ABDULLAH TEKE1002032032E7054DBB31781D7A15F5043372E802C56304041F */
}
{
  /* 
                75 //Karekod Biçim Göstergesi Z
                02 //Karekod Türü Z
                1001 //Karekod Üretici Kodu Z
                000000050000 //Tutar
                  61590126 //Uygulama Şablonu
                  TR650011100000000081169035
                  0719
                  Abdullah Cihad Teke
                  1002032032
                  0c0092c329a84c469fa200da1281bd93
                  6304
                  49C3 
                  */
}

// const kk_data = {
//   card_holder: '',
//   card_number: '',
//   card_valid_thru: '',
//   card_ccv: '',
//   installment: 1,
// };

function calculateInstallmentsByBIN(posRates, binData, totalAmount) {
  const parser = new DOMParser();
  const cardsXmlDoc = parser.parseFromString(posRates, 'text/xml');
  const ratesXmlDoc = parser.parseFromString(binData, 'text/xml');

  const cardInfoList = cardsXmlDoc.getElementsByTagName('Temp');
  const ratesList = ratesXmlDoc.getElementsByTagName('DT_Ozel_Oranlar');

  let matchingRatesAndCardInfo = [];

  for (let j = 0; j < cardInfoList.length; j++) {
    const cardInfo = cardInfoList[j];
    const posIdCard =
      cardInfo.getElementsByTagName('SanalPOS_ID')[0].textContent;

    for (let i = 0; i < ratesList.length; i++) {
      const rate = ratesList[i];
      const posIdRate = rate.getElementsByTagName('SanalPOS_ID')[0].textContent;

      if (posIdRate === posIdCard) {
        const bankName =
          cardInfo.getElementsByTagName('Kart_Banka')[0].textContent;
        const cardImage = rate.getElementsByTagName(
          'Kredi_Karti_Banka_Gorsel'
        )[0].textContent;

        let installmentRates = [];
        for (let k = 1; k <= 18; k++) {
          const rateTag = `MO_${k.toString().padStart(2, '0')}`;
          const rateElement = rate.getElementsByTagName(rateTag)[0];
          if (rateElement) {
            const rateValue = parseFloat(rateElement.textContent);
            // Sadece pozitif oranlar için işlem yap
            if (rateValue >= 0) {
              // prettier-ignore
              const totalInstallmentAmount = totalAmount + ((totalAmount * rateValue) / 100);
              const monthlyInstallment = totalInstallmentAmount / k;

              installmentRates.push({
                id: rateTag,
                rate: rateValue,
                numberOfInstallments: k,
                monthlyAmount: monthlyInstallment.toFixed(2),
                totalInstallmentAmount: totalInstallmentAmount.toFixed(2),
              });
            }
          }
        }

        matchingRatesAndCardInfo.push({
          posId: posIdRate,
          bankName,
          cardImage,
          installmentRates,
        });
        break;
      }
    }
  }

  return matchingRatesAndCardInfo;
}

export default function PaymentMethods({
  payment,
  totals,
  paymentError,
  setTotals,
  realTotals,
  payment_method,
  handleChangePaymentMethod,
  handleChangePaymentEFTMethod,
  kkData,
  setKkData,
}) {
  // const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
  //   payment_methods[0].code
  // );
  const [selectedInstallment, setSelectedInstallment] = useState(false);
  const [selectedInstallmentIndex, setSelectedInstallmentIndex] = useState(0);
  const [installmentRatesXML, setInstallmentRatesXML] = useState('');
  const [oranlarListesi, setOranlarListesi] = useState([]);

  useEffect(() => {
    const getInstallment = async () => {
      const response = await paramGetRates();
      setInstallmentRatesXML(response);
    };

    getInstallment();
  }, []);

  useEffect(() => {
    const getBinData = async () => {
      const bin = kkData.card_number.replace(/\s/g, '').substring(0, 16);
      const binData = await paramGetBinData(bin);
      const rateList = calculateInstallmentsByBIN(
        binData,
        installmentRatesXML,
        JSON.parse(realTotals).total
      );

      setOranlarListesi(rateList);

      if (rateList.length > 0) {
        setTotals((prev) => ({
          ...prev,
          total: rateList[0].installmentRates[0].totalInstallmentAmount,
          fee:
            rateList[0].installmentRates[0].totalInstallmentAmount -
            JSON.parse(realTotals).total,
        }));
        setSelectedInstallment(rateList[0].installmentRates[0]);
      }
    };

    if (kkData.card_number && kkData.card_number.length > 18) {
      getBinData();
    }
  }, [kkData.card_number, installmentRatesXML, realTotals, setTotals]);

  // if (installmentRatesXML != '') {
  //   oranlarListesi = calculateInstallmentsByBIN(
  //     ikinciXmlString,
  //     installmentRatesXML,
  //     totals.total
  //   );
  // }
  const handleSelectionChange = (taksit, index) => {
    setSelectedInstallment(taksit);
    setSelectedInstallmentIndex(index);
    setKkData((prev) => ({
      ...prev,
      installment: taksit.numberOfInstallments,
    }));

    setTotals((prev) => ({
      ...prev,
      total: taksit.totalInstallmentAmount,
      fee: taksit.totalInstallmentAmount - JSON.parse(realTotals).total,
    }));
  };

  const handleChangeKK = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // CCV için sadece sayıları kabul et ve maksimum 3 veya 4 haneli olmasını sağla
    if (name === 'card_ccv') {
      setKkData((prev) => ({
        ...prev,
        [name]: value.replace(/\D/g, '').substring(0, 4), // Varsayılan olarak 3 haneli CCV kabul edilir
      }));
    }

    // Kart numarasını formatla
    else if (name === 'card_number') {
      // Sadece sayıları kabul et ve her dört rakamdan sonra bir boşluk ekle
      formattedValue = value
        .replace(/\D/g, '') // Non-digit karakterleri kaldır
        .replace(/(\d{4})(?=\d)/g, '$1 '); // Her dört rakamdan sonra boşluk ekle
    }

    // Kart geçerlilik tarihini formatla
    else if (name === 'card_valid_thru') {
      // Sadece sayıları kabul et ve iki karakterden sonra bir slash (/) ekle
      formattedValue = value
        .replace(/\D/g, '') // Non-digit karakterleri kaldır
        .replace(/^(0[1-9]|1[0-2])/, '$1/') // MM/ formatını zorla
        .substring(0, 7); // En fazla 7 karakter: MM/YYYY
    }

    // Diğer inputlar için genel işlem
    setKkData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const [paymentMethods, setPaymentMethods] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    payment_method || false
  );
  const [selectedEFTMethod, setSelectedEFTMethod] = useState(
    payment_method || false
  );

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      const paymentMethods = await getPaymentMethods();
      setPaymentMethods(paymentMethods);
    };
    fetchPaymentMethods();
  }, []);

  const formatIBAN = (iban) => {
    // "TR" kısmını kaldır
    const mainPart = iban.slice(2);

    // İlk iki ve son iki rakamı ayır
    const firstTwo = mainPart.slice(0, 2);
    const lastTwo = mainPart.slice(-2);

    // Ortadaki kısmı dört haneli gruplara ayır
    const middlePart = mainPart.slice(2, -2).replace(/(.{4})/g, '$1 ');

    return `${firstTwo} ${middlePart} ${lastTwo}`;
  };

  const handleChangePayment = (selectedCode) => {
    setSelectedPaymentMethod(selectedCode);
    handleChangePaymentMethod(selectedCode);

    if (selectedCode == 0) {
      if (selectedInstallment) {
        setTotals((prev) => ({
          ...prev,
          total: selectedInstallment.totalInstallmentAmount,
        }));
      }
    }

    if (selectedCode == 1) {
      setTotals((prev) => ({
        ...prev,
        total: JSON.parse(realTotals).total,
        fee: 0,
      }));
    }

    console.log('Seçilen ödeme yöntemi handleChangePayment: ', selectedCode);
    // İşlem yapmak için seçilen ödeme yöntemini kullanabilirsiniz.
  };

  const handleChangeEFT = (selectedCode) => {
    setSelectedEFTMethod(selectedCode);
    handleChangePaymentEFTMethod(selectedCode);

    console.log('Seçilen ödeme yöntemi handleChangeEFT: ', selectedCode);
    // İşlem yapmak için seçilen ödeme yöntemini kullanabilirsiniz.
  };

  return (
    <>
      {/* {console.log('oranlar Listesi: ', oranlarListesi)} */}
      {/* Payment Methods */}
      <div className='items-center pl-4 border border-gray-200 rounded'>
        <div className='flex items-center pl-2'>
          <input
            id='bordered-radio-1'
            type='radio'
            checked={selectedPaymentMethod == 0}
            name='payment-method'
            className='w-6 h-6 text-blue-600  border-gray-300 focus:ring-blue-500 focus:ring-2 '
            onChange={() => handleChangePayment(0)}
          />
          <label
            htmlFor='bordered-radio-1'
            className='w-full py-4 ml-4 text-sm font-medium text-gray-900 '
          >
            <div className='flex space-x-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-16 h-16'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z'
                />
              </svg>
              <div className='mt-2'>
                <h3 className='text-base font-semibold text-heading'>
                  Kredi Kartı
                </h3>
                <div className='text-sm'>Tüm kartlara 12 taksit</div>
              </div>
            </div>
          </label>
        </div>
        <div className={`${selectedPaymentMethod == 0 ? 'block ' : 'hidden'}`}>
          <div className=' mx-4 '>
            {console.log('paymentError: ', paymentError)}
            {paymentError ? (
              <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
                <strong className='font-bold'>Hata! </strong>
                <span className='block sm:inline'>
                  Kart doğrulaması yapılamadı. Lütfen bilgilerinizi kontrol edip
                  tekrar deneyiniz. <br />
                  <strong className='font-bold'>Banka mesajı: </strong>{' '}
                  {paymentError.bankResult}
                </span>
              </div>
            ) : null}
            <div className='flex flex-col md:flex-row items-center gap-5 m-2'>
              <div className='w-full'>
                <label
                  htmlFor='card_holder'
                  className='text-gray-600 mb-2 block font-bold'
                >
                  Kart Sahibi İsim Soyisim
                </label>
                <input
                  required
                  type='text'
                  name='card_holder'
                  id='card_holder'
                  value={kkData.card_holder}
                  onChange={handleChangeKK}
                  className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
                  placeholder='Kart Sahibi isim Soyisim'
                />
              </div>
            </div>
            <div className='flex flex-col md:flex-row items-center gap-5 m-2'>
              <div className='w-full'>
                <label
                  htmlFor='card_number'
                  className='text-gray-600 mb-2 block font-bold'
                >
                  Kart Numarası
                </label>
                <input
                  required
                  type='text'
                  maxLength={19}
                  name='card_number'
                  value={kkData.card_number}
                  onChange={handleChangeKK}
                  className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
                  placeholder='**** **** **** ****'
                />
              </div>
            </div>

            <div className='flex flex-col md:flex-row items-center gap-5 m-2'>
              <div className='w-full'>
                <label
                  htmlFor='card_valid_thru'
                  className='text-gray-600 mb-2 block font-bold'
                >
                  Geçerlilik Tarihi
                </label>
                <input
                  required
                  type='text'
                  name='card_valid_thru'
                  id='card_valid_thru'
                  maxLength={5}
                  value={kkData.card_valid_thru}
                  onChange={handleChangeKK}
                  className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
                  placeholder='**/**'
                />
              </div>
              <div className='w-full'>
                <label
                  htmlFor='card_ccv'
                  className='text-gray-600 mb-2 block font-bold'
                >
                  Güvenlik Numarası
                </label>
                <input
                  required
                  type='text'
                  maxLength={4}
                  name='card_ccv'
                  id='card_ccv'
                  value={kkData.card_ccv}
                  onChange={handleChangeKK}
                  className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
                  placeholder='***'
                />
              </div>
            </div>

            {oranlarListesi.length > 0 ? (
              <div className='flex flex-col md:flex-row items-center gap-5 m-2'>
                <div className='w-full'>
                  <Image
                    src={`${oranlarListesi[0].cardImage}`}
                    alt='bank-logo'
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            ) : null}

            {oranlarListesi.length > 0 ? (
              <div className={` max-w-sm pb-12 mt-12 m-2`}>
                <label
                  htmlFor='installment'
                  className='text-gray-600 mb-2 block font-bold'
                >
                  Taksit Seçenekleri
                </label>

                <div className=' max-w-xl'>
                  <div className='flex flex-wrap gap-1 '>
                    {oranlarListesi[0]?.installmentRates?.map(
                      (taksit, index) => {
                        return (
                          <label key={index} className='cursor-pointer border'>
                            <input
                              type='radio'
                              className='peer sr-only'
                              name='pricing'
                              checked={selectedInstallmentIndex === index}
                              onChange={() =>
                                handleSelectionChange(taksit, index)
                              }
                            />
                            <div className='w-72 max-w-xl rounded-md bg-white p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2'>
                              <div className='flex flex-col gap-1'>
                                <div className='flex items-center justify-between'>
                                  <p className='text-sm font-semibold  text-gray-500'>
                                    {taksit.numberOfInstallments == 1
                                      ? 'Tek Çekim'
                                      : taksit.numberOfInstallments + ' Taksit'}
                                  </p>
                                  <div>
                                    <svg
                                      width='24'
                                      height='24'
                                      viewBox='0 0 24 24'
                                    >
                                      <path
                                        fill='currentColor'
                                        d='m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z'
                                      />
                                    </svg>
                                  </div>
                                </div>
                                <div className='flex items-end justify-between'>
                                  <p>
                                    <span className='text-lg font-bold'>
                                      ₺
                                      {taksit.monthlyAmount.toLocaleString(
                                        'tr-TR',
                                        {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2,
                                        }
                                      )}
                                    </span>{' '}
                                    x{taksit.numberOfInstallments}
                                  </p>
                                  <p className='text-sm font-bold'>
                                    ₺
                                    {taksit.totalInstallmentAmount.toLocaleString(
                                      'tr-TR',
                                      {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      }
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </label>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            ) : oranlarListesi.length == 0 && kkData.card_number.length > 8 ? (
              <div className={` max-w-sm pb-12 mt-12 m-2`}>
                <label
                  htmlFor='installment'
                  className='text-gray-600 mb-2 block font-bold'
                >
                  Taksit Seçenekleri
                </label>

                <div className=' max-w-xl'>
                  <div className='flex flex-wrap gap-1 '>
                    <label className='cursor-pointer border'>
                      <input
                        type='radio'
                        className='peer sr-only'
                        name='pricing'
                        checked={selectedInstallmentIndex === 0}
                        onChange={() =>
                          handleSelectionChange(
                            { numberOfInstallments: '1' },
                            0
                          )
                        }
                      />
                      <div className='w-72 max-w-xl rounded-md bg-white p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-sky-600 peer-checked:ring-blue-400 peer-checked:ring-offset-2'>
                        <div className='flex flex-col gap-1'>
                          <div className='flex items-center justify-between'>
                            <p className='text-sm font-semibold  text-gray-500'>
                              Tek Çekim
                            </p>
                            <div>
                              <svg width='24' height='24' viewBox='0 0 24 24'>
                                <path
                                  fill='currentColor'
                                  d='m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z'
                                />
                              </svg>
                            </div>
                          </div>
                          <div className='flex items-end justify-between'>
                            <p>
                              <span className='text-lg font-bold'>
                                ₺
                                {JSON.parse(realTotals).total.toLocaleString(
                                  'tr-TR',
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }
                                )}
                              </span>
                            </p>
                            <p className='text-sm font-bold'>
                              ₺
                              {JSON.parse(realTotals).total.toLocaleString(
                                'tr-TR',
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className='items-center pl-4 border border-gray-200 rounded'>
        <div className='flex items-center pl-2 '>
          <input
            id='bordered-radio-2'
            type='radio'
            checked={selectedPaymentMethod == 1}
            name='payment-method'
            className='w-6 h-6 text-blue-600  border-gray-300 focus:ring-blue-500 focus:ring-2 '
            onChange={() => handleChangePayment(1)}
          />
          <label
            htmlFor='bordered-radio-2'
            className='w-full py-4 ml-4 text-sm font-medium text-gray-900 '
          >
            <div className='flex space-x-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-16 h-16'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z'
                />
              </svg>

              <div className='mt-2'>
                <h3 className='text-base font-semibold text-heading'>
                  Banka Havalesi / EFT
                </h3>
                <div className='text-sm'>Banka havalesi</div>
              </div>
            </div>
          </label>
        </div>
        <div className={`${selectedPaymentMethod == 1 ? 'block' : 'hidden'}`}>
          {/* EFT METHOD */}
          {paymentMethods &&
            paymentMethods.banks.map((paymentMethod, index) => {
              return (
                <div key={paymentMethod.ID} className='bg-white ml-2 py-0.5'>
                  <div className='items-center pl-4 border border-gray-200 rounded'>
                    <div className='flex items-center pl-2 '>
                      <input
                        id={`havale-radio-${index}`}
                        type='radio'
                        checked={selectedEFTMethod == paymentMethod.ID}
                        name='havale-radio'
                        className='w-6 h-6 text-blue-600  border-gray-300 focus:ring-blue-500 focus:ring-2 '
                        onChange={() => handleChangeEFT(paymentMethod.ID)}
                      />
                      <label
                        htmlFor={`havale-radio-${index}`}
                        className='w-full py-4 ml-4 text-sm font-medium text-gray-900 '
                      >
                        <div className='flex space-x-4'>
                          <Image
                            className='w-24 h-8 sm:w-32 sm:h-8'
                            src={`/${paymentMethod.bank_logo}`}
                            alt={`${paymentMethod.bank_name}-logo}`}
                            width={192}
                            height={20}
                          ></Image>

                          <div className='mt-2'>
                            <h3 className='text-base font-semibold text-heading'>
                              {paymentMethod.bank_name}
                            </h3>
                            <div className='text-sm'>TL Hesabı</div>
                          </div>
                        </div>
                      </label>
                    </div>
                    <div
                      className={`${
                        selectedEFTMethod == paymentMethod.ID
                          ? 'block'
                          : 'hidden'
                      }`}
                    >
                      <div className=' ml-2 sm:ml-14 mr-2'>
                        <h4 className='text-sm text-gray-600'>
                          Sipariş sonrası IBAN / Hesap No’ya Havale / EFT ile
                          ödeyin, ödemeniz sonrası siparişiniz onaylansın
                        </h4>

                        <h4 className='text-lg font-semibold text-gray-600 my-4'>
                          {paymentMethod.account_name}
                        </h4>
                        <div className='my-2'>
                          <span className='text-lg text-gray-500'>TR</span>
                          <span className='text-2xl font-bold text-gray-700'>
                            {' '}
                            {formatIBAN(paymentMethod.iban)}
                          </span>
                        </div>

                        <div className='my-2'>
                          <span className='text-lg text-gray-500'>
                            Sipariş Numarası
                          </span>
                          <span className='text-2xl font-bold text-gray-700'>
                            {' '}
                            {payment.order.ID}
                          </span>
                        </div>
                        <Image
                          src={`/${paymentMethod.qr_code}`}
                          alt='iban'
                          width={200}
                          height={200}
                        ></Image>

                        <div className='my-4'>
                          <h6 className='my-4 font-bold text-gray-700'>
                            Bunları Unutmayın
                          </h6>
                          <ul className=''>
                            <li className='text-xs my-4 text-gray-500'>
                              * Havale / EFT işlemini yaparken açıklama kısmına{' '}
                              <strong>sipariş numaranızı</strong> mutlaka
                              yazmalısınız.
                            </li>
                            <li className='text-xs my-4 text-gray-500'>
                              * Havale / EFT ile ödeme yaptıktan sonra
                              siparişiniz onaylanacak ve işlemleriniz
                              başlayacaktır. Siparişinizin iptal olmaması için{' '}
                              <strong>1 iş günü</strong> içerisinde ödeme
                              işlemini tamamlamalısınız.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
