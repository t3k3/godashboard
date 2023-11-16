import { API_URL_ADMIN } from '@/config/apiConfig';
import { cookies } from 'next/headers';

//get all categories
export async function GET(request) {
  const nextCookies = cookies();

  let headers = new Headers();
  headers.append('Cookie', `default=${nextCookies.get('default').value}`);
  headers.append('Cookie', `PHPSESSID=${nextCookies.get('PHPSESSID').value}`);
  headers.append('Cookie', `language=${nextCookies.get('language').value}`);
  headers.append('Cookie', `currency=${nextCookies.get('currency').value}`);

  var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  };

  const response = await fetch(
    `${API_URL_ADMIN}/sale/order&token=${nextCookies.get('token').value}`,
    requestOptions
  );

  // console.log('response.status: ', response.status);
  const res = await response.json();

  if (response.status == 401) {
    return new Response(
      JSON.stringify({
        status: 401,
        statusText: 'Unauthorized!',
        error: res.error_warning,
      })
    );
  }

  if (response.status === 200) {
    // console.log('set');

    return new Response(
      JSON.stringify({
        status: 200,
        statusText: 'login true',
        orders: res.orders,
      })
    );
  }
}

// export async function POST(request) {
//   console.log('POST ISTEK GELDİ');
//   const data = await request.json();

//   try {
//     const url = `${API_URL_ADMIN}catalog/category/add`;
//     const headers = { 'Content-Type': 'multipart/form-data' };
//     const response = await axios.post(url, data, { headers });

//     return new Response(
//       JSON.stringify({
//         status: response.status,
//         statusText: response.statusText,
//         data: response.data,
//       })
//     );
//   } catch (error) {
//     return new Response(
//       JSON.stringify({
//         status: error.response.status,
//         statusText: error.response.statusText,
//         data: error.response.data,
//       })
//     );
//   }

//   // console.log('RES: ', res);
// }
