import { _API_URL_ADMIN, _API_URL_STORE } from '@/config/apiConfig';

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

  console.log(
    '___________________________FAILURE_______________________________'
  );
  console.log('data:', data);
  console.log('md:', md);
  console.log('mdStatus:', mdStatus);
  console.log('orderId:', orderId);
  console.log('transactionAmount:', transactionAmount);
  console.log('islemGUID:', islemGUID);
  console.log('islemHash:', islemHash);
  console.log('bankResult:', bankResult);
  console.log(
    '___________________________FAILURE_______________________________'
  );

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

  console.log('saveBankResultToOrder: ', saveBankResultToOrder);

  // HTML içeriği oluşturun
  const htmlContent = `
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
                 // Tarayıcıda JavaScript ile yönlendirme yapma
                 console.log('LOG NUMBER: 44444444444444444444');
                 window.top.location.reload();
                 console.log('LOG NUMBER: 5555555555555555555');
                 setTimeout(function () {
                     console.log('LOG NUMBER: 6666666666666666666666');
                     window.top.location.reload();
                     console.log('LOG NUMBER: 7777777777777777777777');
                     window.location.href = "/payment/success?orderId=" + responseOrderId;
                 }, 3000); // 3 saniye sonra yönlendirme yapılır
 
             </script>
         </body>
         </html>
       `;

  // HTML içeriğini döndürün
  return new Response(htmlContent, {
    headers: { 'Content-Type': 'text/html' },
  });
}
