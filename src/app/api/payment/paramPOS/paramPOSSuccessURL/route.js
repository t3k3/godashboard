import { _API_URL_STORE } from '@/config/apiConfig';
import { paramConfirmPayment } from '@/services/store/payment';
import crypto from 'crypto';
import xml2js from 'xml2js';

const basarisizHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ödeme Sonucu</title>
</head>
<body>
    <h1>Ödeme Başarısız</h1>
    <p>Ödemeniz başarısız. Lütfen bekleyin, yönlendiriliyorsunuz...</p>

    <script>
        window.top.location.href = "http://lesber.com:3000/payment?account=0&orderid=ORDERID&hello=basarisiz";
    </script>
</body>
</html>
`;

const basariliHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ödeme Sonucu</title>
</head>
<body>
    <h1>Ödeme Başarılı</h1>
    <p>Ödemeniz başarıyla tamamlandı. Lütfen bekleyin, yönlendiriliyorsunuz...</p>

    

    <script>
    
      window.top.location.reload();
      
    

        
    </script>
</body>
</html>
`;

function OrderIDinhtml(html, orderID) {
  let htmlContent = html.replaceAll('ORDERID', orderID);

  return htmlContent;
}

export async function POST(request) {
  const data = await request.text();

  // URLSearchParams ile parse edilmiş verileri al
  const params = new URLSearchParams(data);

  // Parametreleri ayrıştır
  const md = params.get('md');
  const mdStatus = params.get('mdStatus');
  const orderId = params.get('orderId');
  const transactionAmount = params.get('transactionAmount');
  const islemGUID = params.get('islemGUID');
  const islemHash = params.get('islemHash');
  const bankResult = params.get('bankResult');

  const resultJSON = {
    md: md,
    mdStatus: mdStatus,
    orderId: orderId,
    transactionAmount: transactionAmount,
    islemGUID: islemGUID,
    islemHash: islemHash,
    bankResult: bankResult,
  };

  const saveBankResultToOrder = await fetch(
    `${_API_URL_STORE}/orders/updateresult/${orderId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resultJSON),
    }
  );

  console.log('saveBankResultToOrder: ', saveBankResultToOrder.status);
  console.log('saveBankResultToOrder: ', saveBankResultToOrder.statusText);
  // Diğer parametreleri de benzer şekilde alabilirsiniz.

  //   console.log('__________________________________________________________');

  //   console.log('md:', md);
  //   console.log('mdStatus:', mdStatus);
  //   console.log('orderId:', orderId);
  //   console.log('transactionAmount:', transactionAmount);
  //   console.log('islemGUID:', islemGUID);
  //   console.log('islemHash:', islemHash);
  //   console.log('__________________________________________________________');

  if (mdStatus == 1 || mdStatus == 2 || mdStatus == 3 || mdStatus == 4) {
    const requestOptions = {
      method: 'POST',
    };

    const clientCodes = await fetch(
      `${_API_URL_STORE}/payments/`,
      requestOptions
    );

    const clientCodesResponse = await clientCodes.json();
    // console.log('clientCodesResponse: ', clientCodesResponse);

    const combinedParams =
      islemGUID + md + mdStatus + orderId + clientCodesResponse[0].guid;

    const sha1 = crypto.createHash('sha1');
    const utf8Bytes = Buffer.from(combinedParams, 'utf-8');
    sha1.update(utf8Bytes);

    const hash = sha1.digest('base64');

    console.log('hash1: ', hash);
    console.log('hash2: ', islemHash);

    if (hash == islemHash) {
      console.log('param istek gitti');
      const response = await paramConfirmPayment({
        md: md,
        islemGUID: islemGUID,
        orderId: orderId,
        // orderId: '91946',
      });
      //   console.log('response ____________________ response');
      //   console.log('response: ', response);
      //   console.log('response ____________________ response');

      // XML verisini ayrıştır

      let sonuc = null;
      let sonucAck = null;
      let dekontID = null;
      let siparisID = null;
      let bankHostMsg = null;
      let bankSonucKod = null;

      xml2js.parseString(response, (err, result) => {
        if (err) {
          console.error('XML ayrıştırma hatası:', err);
          return;
        }

        // Ayrıştırılmış veriyi kullanma örnekleri
        sonuc =
          result['soap:Envelope']['soap:Body'][0]['TP_WMD_PayResponse'][0][
            'TP_WMD_PayResult'
          ][0]['Sonuc'][0];
        sonucAck =
          result['soap:Envelope']['soap:Body'][0]['TP_WMD_PayResponse'][0][
            'TP_WMD_PayResult'
          ][0]['Sonuc_Ack'][0];
        dekontID =
          result['soap:Envelope']['soap:Body'][0]['TP_WMD_PayResponse'][0][
            'TP_WMD_PayResult'
          ][0]['Dekont_ID'][0];
        siparisID =
          result['soap:Envelope']['soap:Body'][0]['TP_WMD_PayResponse'][0][
            'TP_WMD_PayResult'
          ][0]['Siparis_ID'][0];
        bankHostMsg =
          result['soap:Envelope']['soap:Body'][0]['TP_WMD_PayResponse'][0][
            'TP_WMD_PayResult'
          ][0]['Bank_HostMsg'][0];
        bankSonucKod =
          result['soap:Envelope']['soap:Body'][0]['TP_WMD_PayResponse'][0][
            'TP_WMD_PayResult'
          ][0]['Bank_Sonuc_Kod'][0];

        // Ayrıştırılmış verileri kullanma
        console.log('Sonuc:', sonuc);
        console.log('Sonuc_Ack:', sonucAck);
        console.log('Dekont_ID:', dekontID);
        console.log('Siparis_ID:', siparisID);
        console.log('Bank_HostMsg:', bankHostMsg);
        console.log('Bank_Sonuc_Kod:', bankSonucKod);
        console.log('transactionAmount:', transactionAmount);
        console.log('param istek Bitti');
      });

      const resJSON = {
        md: md,
        mdStatus: mdStatus,
        orderId: orderId,
        transactionAmount: transactionAmount,
        islemGUID: islemGUID,
        islemHash: islemHash,
        bankResult: bankHostMsg,
      };

      const saveBankBResultToOrder = await fetch(
        `${_API_URL_STORE}/orders/updateresult/${orderId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(resJSON),
        }
      );

      console.log('saveBankBResultToOrder222: ', saveBankBResultToOrder.status);
      console.log(
        'saveBankBResultToOrder222: ',
        saveBankBResultToOrder.statusText
      );

      if (sonuc > 0 && dekontID > 0) {
        const setIsComplate = await fetch(
          `${_API_URL_STORE}/orders/confirmpayment`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              order_id: Number(orderId),
              // order_id: 90,
              dekont_id: Number(dekontID),
              transaction_amount: Number(transactionAmount.replace(/,/g, '.')),
            }),
          }
        );

        console.log('STATUS: ', setIsComplate.status);
        console.log('STATUS TEXT: ', setIsComplate.statusText);
        const responseOrderId = await setIsComplate.text();
        console.log('responseOrderId: ', responseOrderId);

        // HTML içeriğini döndür
        return new Response(OrderIDinhtml(basariliHTML, responseOrderId), {
          headers: { 'Content-Type': 'text/html' },
        });
      }

      // sonuc < 1 ve Dekont_id < 1 ise başarısız
      return new Response(OrderIDinhtml(basarisizHTML, orderId), {
        headers: { 'Content-Type': 'text/html' },
      });
    }
  }

  // mdStatus 1,2,3,4 değişse başarısız
  return new Response(OrderIDinhtml(basarisizHTML, orderId), {
    headers: { 'Content-Type': 'text/html' },
  });
}
