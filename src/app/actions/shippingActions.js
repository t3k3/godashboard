'use server';
import { API_URL_STORE } from '@/config/apiConfig';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function saveShippingMethod(shipping_method) {
  const nextCookies = cookies();
  let data = new FormData();
  data.append('shipping_method', shipping_method);

  console.log(data);

  let config = {
    method: 'POST',
    maxBodyLength: Infinity,
    // url: 'http://demo.actsistem.com/api/v1/store/index.php?route=checkout/shipping_method/save',
    url: 'http://demo.actsistem.com/api/v1/store/index.php?route=checkout/checkout/setShipping',
    headers: {
      'Content-Type': 'multipart/form-data',
      Cookie: `PHPSESSID=${nextCookies.get('PHPSESSID').value}; currency=${
        nextCookies.get('currency').value
      }; default=default=${nextCookies.get('default').value}; language=${
        nextCookies.get('language').value
      }`,
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log('------------------shippingActions 4------------------');
      console.log(JSON.stringify(response.data));
      console.log('------------------shippingActions 4------------------');
    })
    .catch((error) => {
      console.log(error);
    });

  console.log('shipping_method: ', shipping_method);
  // console.log('GELDİ');

  // const nextCookies = cookies();

  let headers = new Headers();
  headers.append('Cookie', `default=${nextCookies.get('default').value}`);
  headers.append('Cookie', `PHPSESSID=${nextCookies.get('PHPSESSID').value}`);
  headers.append('Cookie', `language=${nextCookies.get('language').value}`);
  headers.append('Cookie', `currency=${nextCookies.get('currency').value}`);

  //   let formdata = new FormData();
  //   formdata.append('shipping_method', shipping_method);

  //   var requestOptions = {
  //     method: 'POST',
  //     headers: headers,

  //     body: formdata,
  //     redirect: 'follow',
  //   };

  //   const response = await fetch(
  //     `${API_URL_STORE}/checkout/shipping_method/save`,
  //     requestOptions
  //   );

  const response = await axios({
    method: 'POST',
    mode: 'no-cors',
    url: `${API_URL_STORE}/checkout/shipping_method/save`,

    headers: {
      'Content-Type': 'multipart/form-data',
      Cookie: `default=${nextCookies.get('default').value}; PHPSESSID=${
        nextCookies.get('PHPSESSID').value
      }; language=${nextCookies.get('language').value}; currency=${
        nextCookies.get('currency').value
      }`,
    },
    data: { shipping_method: 'flat' },
  });

  // console.log('response.status: ', response.status);
  //   const res = await response.text();
  //   console.log('RES: ', res);

  //   return res;

  // if (response.status == 401) {
  //   return new Response(
  //     JSON.stringify({
  //       status: 401,
  //       statusText: 'Unauthorized!',
  //       error: res.error_warning,
  //     })
  //   );
  // }

  // if (response.status === 200) {
  //   // console.log('set');

  //   return new Response(
  //     JSON.stringify({
  //       status: 200,
  //       statusText: 'login true',
  //       customerOrders: res,
  //     })
  //   );
  // }
}
