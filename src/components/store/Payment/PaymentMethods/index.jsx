import { useState, useEffect } from 'react';
import Image from 'next/image';
import { savePaymentMethod } from '@/services/payment';
import { getPaymentMethods } from '@/services/payment';

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

export default function PaymentMethods({
  payment_method,
  handleChangePaymentMethod,
  handleChangePaymentEFTMethod,
}) {
  // const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
  //   payment_methods[0].code
  // );
  const [paymentMethods, setPaymentMethods] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    payment_method || false
  );
  const [selectedEFTMethod, setSelectedEFTMethod] = useState(
    payment_method || false
  );

  console.log('selectedEFTMethod: ', selectedEFTMethod);

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
    console.log('Seçilen ödeme yöntemi: ', selectedCode);
    // İşlem yapmak için seçilen ödeme yöntemini kullanabilirsiniz.
  };

  const handleChangeEFT = (selectedCode) => {
    setSelectedEFTMethod(selectedCode);
    handleChangePaymentEFTMethod(selectedCode);
    console.log('Seçilen ödeme yöntemi: ', selectedCode);
    // İşlem yapmak için seçilen ödeme yöntemini kullanabilirsiniz.
  };

  return (
    <>
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
          <div className=' ml-12 mr-8 '>
            <div className='flex flex-col md:flex-row items-center gap-5 m-2'>
              <div className='w-full'>
                <label
                  htmlFor='cartHolder'
                  className='text-gray-600 mb-2 block font-bold'
                >
                  Kart Sahibi İsim Soyisim
                </label>
                <input
                  required
                  type='text'
                  name='cartHolder'
                  id='cartHolder'
                  // value={cart.firstname}
                  // onChange={handleChange}
                  className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
                  placeholder='Kart Sahibi isim Soyisim'
                />
              </div>
            </div>
            <div className='flex flex-col md:flex-row items-center gap-5 m-2'>
              <div className='w-full'>
                <label
                  htmlFor='cartNumber'
                  className='text-gray-600 mb-2 block font-bold'
                >
                  Kart Numarası
                </label>
                <input
                  required
                  type='text'
                  name='cartNumber'
                  id='cartNumber'
                  // value={cart.firstname}
                  // onChange={handleChange}
                  className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
                  placeholder='**** **** **** ****'
                />
              </div>
            </div>

            <div className='flex flex-col md:flex-row items-center gap-5 m-2'>
              <div className='w-full'>
                <label
                  htmlFor='validThru'
                  className='text-gray-600 mb-2 block font-bold'
                >
                  Geçerlilik Tarihi
                </label>
                <input
                  required
                  type='text'
                  name='validThru'
                  id='validThru'
                  // value={cart.firstname}
                  // onChange={handleChange}
                  className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
                  placeholder='**/**'
                />
              </div>
              <div className='w-full'>
                <label
                  htmlFor='ccv'
                  className='text-gray-600 mb-2 block font-bold'
                >
                  Güvenlik Numarası
                </label>
                <input
                  required
                  type='text'
                  name='ccv'
                  id='ccv'
                  // value={cart.firstname}
                  // onChange={handleChange}
                  className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
                  placeholder='***'
                />
              </div>
            </div>
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
                            className='w-32 h-12 sm:w-48 sm:h-12'
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
                          {paymentMethod.bank_name}
                        </h4>
                        <div className='my-2'>
                          <span className='text-lg text-gray-500'>TR</span>
                          <span className='text-2xl font-bold text-gray-700'>
                            {' '}
                            {formatIBAN(paymentMethod.iban)}
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
