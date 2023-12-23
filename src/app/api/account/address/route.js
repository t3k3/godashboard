import { _API_URL_STORE } from '@/config/apiConfig';

import { cookies } from 'next/headers';

export async function POST(request) {
  // console.log('PUT ISTEK GELDİ');

  // console.log('request PROP: ', request);
  const data = await request.json();
  console.log('DATA5566: ', data);
  const nextCookies = cookies();

  const response = await fetch(`${_API_URL_STORE}/account/addresses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `CART_ID=${nextCookies.get('CART_ID').value}; SESSION_ID=${
        nextCookies.get('SESSION_ID').value
      }`,
    },
    body: JSON.stringify(data),
  });

  // console.log('response.status: ', response.status);
  // console.log('response 6546: ', response);
  // console.log('response  data 6546: ', response.data);
  // console.log('response.status: ', response.data);
  // console.log('response: ', response);

  if (response.status === 201) {
    const res = await response.json();
    return new Response(
      JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        data: res,
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

export async function GET(request) {
  console.log('GET ADDRESS ISTEK GELDİ');

  // console.log('request PROP: ', request);

  const nextCookies = cookies();

  // console.log('nextCookies 345345: ', nextCookies);

  const response = await fetch(`${_API_URL_STORE}/account/addresses`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `CART_ID=${nextCookies.get('CART_ID').value}; SESSION_ID=${
        nextCookies.get('SESSION_ID').value
      }`,
    },
  });
  // console.log('response.status 43223: ', response.status);
  if (response.status === 200) {
    const res = await response.json();
    // console.log('res 234234: ', res);
    return new Response(
      JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        data: res,
      })
    );
  }
}
