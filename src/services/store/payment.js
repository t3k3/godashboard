// http://demo.actsistem.com/api/v1/store/index.php?route=checkout/checkout
import { _BASE_URL } from '@/config/apiConfig';

const getPaymentService = async (cookies = [], orderID = 0) => {
  let headers = new Headers();
  cookies.find((cookie) => {
    if (cookie.name === 'CART_ID') {
      headers.append('Cookie', `${cookie.name}=${cookie.value}`);
    }
  });

  try {
    const res = await fetch(`${_BASE_URL}/api/order?orderid=${orderID}`, {
      cache: 'no-store',
      headers: headers,
    });

    if (res.status == 404) {
      return { status: 404 };
    }

    if (res.status == 500) {
      return { status: 500 };
    }

    return res.json();
  } catch (error) {
    console.log('ERROR');
    return new Error('Payment DATA ÇEKİLEMEDİ');
  }
};

const paramPOSService = async (data) => {
  const res = await fetch(`${_BASE_URL}/api/payment/paramPOS`, {
    cache: 'no-store',
    body: JSON.stringify({ data: data }),

    method: 'POST',
  });

  const response = await res.text();

  return response;
};

const confirmOrderEftService = async (
  cookies = [],
  orderID = 0,
  payment_method = null,
  payment_code = null
) => {
  if (payment_method != null && payment_code != null) {
    let headers = new Headers();
    cookies.find((cookie) => {
      if (cookie.name === 'CART_ID') {
        headers.append('Cookie', `${cookie.name}=${cookie.value}`);
      }
    });

    try {
      const res = await fetch(
        `${_BASE_URL}/api/payment/confirmEFT?orderid=${orderID}&payment_method=${payment_method}&payment_code=${payment_code}`,
        {
          cache: 'no-store',
          headers: headers,
          method: 'POST',
        }
      );

      const response = await res.json();

      return response;
    } catch (error) {
      console.log('ERROR');
      return new Error('Payment DATA ÇEKİLEMEDİ');
    }
  } else {
    return { status: 400, statusText: 'Ödeme metodu seçilmelidir.' };
  }
};

const getPayment = async (cookies, orderID) => {
  return getPaymentService(cookies, orderID);
};

const paramGetBinData = async (BIN) => {
  var raw = `<?xml version="1.0" encoding="utf-8"?> <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body>
  <BIN_SanalPos xmlns="https://turkpos.com.tr/">
  <G>
  <CLIENT_CODE>10738</CLIENT_CODE>
  <CLIENT_USERNAME>Test</CLIENT_USERNAME>
  <CLIENT_PASSWORD>Test</CLIENT_PASSWORD>
  </G>
  <BIN>${BIN}</BIN>
  </BIN_SanalPos>
  </soap:Body>
  </soap:Envelope>`;
  return paramPOSService(raw);
};

const paramGetRates = async () => {
  var raw = `<?xml version="1.0" encoding="utf-8"?>\r\n<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\r\n    <soap:Body>\r\n        <TP_Ozel_Oran_Liste xmlns="https://turkpos.com.tr/">\r\n            <G>\r\n                <CLIENT_CODE>10738</CLIENT_CODE>\r\n                <CLIENT_USERNAME>Test</CLIENT_USERNAME>\r\n                <CLIENT_PASSWORD>Test</CLIENT_PASSWORD>\r\n            </G>\r\n            <GUID>0c13d406-873b-403b-9c09-a5766840d98c</GUID>\r\n        </TP_Ozel_Oran_Liste>\r\n    </soap:Body>\r\n</soap:Envelope>`;
  return paramPOSService(raw);
};

const paramCalculateHash = async (data) => {
  var raw = `<?xml version="1.0" encoding="utf-8"?> <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body>
  <SHA2B64 xmlns="https://turkpos.com.tr/">
  <Data>${data}</Data>
  </SHA2B64>
  </soap:Body>
  </soap:Envelope>`;
  const response = await paramPOSService(raw);

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(response, 'text/xml');

  const sha2b64Result =
    xmlDoc.getElementsByTagName('SHA2B64Result')[0].textContent;

  return sha2b64Result;
};

const paramSendOrderData = async (data) => {
  // data.orderID = '91946';

  const guid = '0c13d406-873b-403b-9c09-a5766840d98c';

  const stringForHash = `10738${guid}${data.installment}${data.total}${data.feeTotal}${data.orderID}`;

  const hash = await paramCalculateHash(stringForHash);

  data.card_number = data.card_number.replace(/\s/g, '');

  var raw = `<?xml version="1.0" encoding="utf-8"?> <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body>
  <TP_WMD_UCD xmlns="https://turkpos.com.tr/">
  <G>
  <CLIENT_CODE>10738</CLIENT_CODE>
  <CLIENT_USERNAME>Test</CLIENT_USERNAME>
  <CLIENT_PASSWORD>Test</CLIENT_PASSWORD>
  </G>
  <GUID>${guid.toString()}</GUID>
  <KK_Sahibi>${data.card_holder.toString()}</KK_Sahibi>
  <KK_No>${data.card_number.toString()}</KK_No>
  <KK_SK_Ay>${data.card_ay.toString()}</KK_SK_Ay>
  <KK_SK_Yil>${data.card_yil.toString()}</KK_SK_Yil>
  <KK_CVC>${data.card_ccv.toString()}</KK_CVC>
  <KK_Sahibi_GSM>${data.gsm.toString()}</KK_Sahibi_GSM>
  <Hata_URL>http://lesber.com:3000/api/payment/paramPOS/paramPOSFailureURL</Hata_URL>
  <Basarili_URL>http://lesber.com:3000/api/payment/paramPOS/paramPOSSuccessURL</Basarili_URL>
  <Siparis_ID>${data.orderID.toString()}</Siparis_ID>
  <Siparis_Aciklama>a</Siparis_Aciklama>
  <Taksit>${Number(data.installment)}</Taksit>
  <Islem_Tutar>${data.total.toString()}</Islem_Tutar>
  <Toplam_Tutar>${data.feeTotal.toString()}</Toplam_Tutar>
  <Islem_Hash>${hash.toString()}</Islem_Hash>
  <Islem_Guvenlik_Tip>3D</Islem_Guvenlik_Tip>
  <Islem_ID></Islem_ID>
  <IPAdr>127.0.0.1</IPAdr>
  <Ref_URL></Ref_URL>
  <Data1></Data1>
  <Data2></Data2>
  <Data3></Data3>
  <Data4></Data4>
  <Data5></Data5>
  </TP_WMD_UCD>
  </soap:Body>
  </soap:Envelope>`;

  const response = await paramPOSService(raw);
  console.log('response 1234: ', response);
  return response;
};

const paramConfirmPayment = async (data) => {
  var raw = `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <TP_WMD_Pay xmlns="https://turkpos.com.tr/">
        <G>
          <CLIENT_CODE>10738</CLIENT_CODE>
          <CLIENT_USERNAME>Test</CLIENT_USERNAME>
          <CLIENT_PASSWORD>Test</CLIENT_PASSWORD>
        </G>
        <GUID>0c13d406-873b-403b-9c09-a5766840d98c</GUID>
        <UCD_MD>${data.md}</UCD_MD>
        <Islem_GUID>${data.islemGUID}</Islem_GUID>
        <Siparis_ID>${data.orderId}</Siparis_ID>
      </TP_WMD_Pay>
    </soap:Body>
  </soap:Envelope>`;
  const response = await paramPOSService(raw);
  // console.log('response 1234: ', response);
  return response;
};

const confirmOrderEft = async (
  cookies,
  orderID,
  payment_method,
  payment_code
) => {
  return confirmOrderEftService(cookies, orderID, payment_method, payment_code);
};

export {
  getPayment,
  confirmOrderEft,
  paramGetRates,
  paramGetBinData,
  paramSendOrderData,
  paramConfirmPayment,
};
