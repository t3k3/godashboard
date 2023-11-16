import { API_URL_STORE } from '@/config/apiConfig';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function POST(request) {
  // console.log('PUT ISTEK GELDİ');

  // console.log('request PROP: ', request);
  const data = await request.json();
  console.log('DATA99: ', data);
  const nextCookies = cookies();

  let formdata = new FormData();

  formdata.append('payment_method', data.payment_method);

  // formdata.append('comment', data.comment);

  // try {
  const response = await axios({
    cache: 'no-store',
    method: 'POST',
    mode: 'no-cors',

    // url: `${API_URL_STORE}/checkout/checkout/save`,
    url: `${API_URL_STORE}/checkout/confirm`,

    headers: {
      'Content-Type': 'multipart/form-data',
      Cookie: `default=${nextCookies.get('default').value}; PHPSESSID=${
        nextCookies.get('PHPSESSID').value
      }; language=${nextCookies.get('language').value}; currency=${
        nextCookies.get('currency').value
      }`,
    },
    data: formdata,
  });

  console.log('response.status: ', response.status);
  // console.log('response.status: ', response.data);
  // console.log('response: ', response);

  if (response.status === 200) {
    return new Response(
      JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        data: response.data,
      })
    );
  }

  //TODO: response.status 201 olmalı
  //   if (response.status === 200) {
  //     return new Response(
  //       JSON.stringify({
  //         status: response.status,
  //         statusText: response.statusText,
  //         data: response.data,
  //       })
  //     );
  //   }
  // } catch (error) {
  //   return new Response(
  //     JSON.stringify({
  //       status: error.response.status,
  //       statusText: error.response.statusText,
  //       data: error.response.data,
  //     })
  //   );
  // }

  // console.log('RES: ', res);
}

// export async function POST(request) {
//   console.log('GELDİİİ:');
//   const cookies = await getClientHeaders();

//   const data = await request.json();

//   console.log('DATAAA: ', data);

//   // let formdata = new FormData();

//   // data.map((opt) => {
//   //   // return console.log('----------------- ' + opt.name + ' -----------------');
//   //   return formdata.append(opt.name, opt.value);
//   // });

//   let headers = new Headers();
//   cookies.map((cookie) => {
//     return headers.append('Cookie', `${cookie.name}=${cookie.value}`);
//   });

//   headers.append('Content-Type', `multipart/form-data`);

//   const url = `${API_URL_STORE}/checkout/checkout/saveShippingAndPaymentToSession`;
//   // const url = `${API_URL_STORE}/checkout/checkout/validate`;
//   const response = await axios.post(url, data, { headers });

//   console.log('RESPONSE : ', response);
//   console.log('RESPONSE STATUS: ', response.status);
//   console.log('RESPONSE DATA : ', response.data);
//   console.log('response: ', response.data);

//   if (response.status == 200) {
//     return new Response(
//       JSON.stringify({
//         status: response.status,
//         statusText: response.statusText,
//         data: response.data,
//       })
//     );
//   } else {
//   }
//   // return new Response(
//   //   JSON.stringify({
//   //     status: response.status,
//   //     statusText: response.statusText,
//   //     data: response.data,
//   //   })
//   // );

//   // var requestOptions = {
//   //   method: 'POST',
//   //   headers: headers,
//   //   body: formdata,
//   //   redirect: 'follow',
//   // };

//   // const response = await fetch(
//   //   `${API_URL_STORE}/checkout/checkout/saveShippingAndPaymentToSession`,
//   //   requestOptions
//   // );

//   // console.log('RESPONSE 6677: ', response);

//   // // const res = await response.json();
//   // const res = await response.text();
//   // console.log('RES 6677: ', res);

//   // if (res.error) {
//   //   return new Response(
//   //     JSON.stringify({
//   //       status: 404,
//   //       error: res.error,
//   //     })
//   //   );
//   // }

//   // return new Response(
//   //   JSON.stringify({
//   //     status: 200,
//   //     cart: res,
//   //   })
//   // );
// }
