import { API_URL_ADMIN, _API_URL_ADMIN } from '@/config/apiConfig';
import { cookies } from 'next/headers';
import axios from 'axios';

//get all categories
// export async function GET(request, { params }) {
//   const { name } = params;

//   const nextCookies = cookies();

//   let headers = new Headers();
//   headers.append('Cookie', `default=${nextCookies.get('default').value}`);
//   headers.append('Cookie', `PHPSESSID=${nextCookies.get('PHPSESSID').value}`);
//   headers.append('Cookie', `language=${nextCookies.get('language').value}`);
//   headers.append('Cookie', `currency=${nextCookies.get('currency').value}`);

//   var requestOptions = {
//     method: 'GET',
//     headers: headers,
//     redirect: 'follow',
//   };

//   const response = await fetch(
//     `${API_URL_ADMIN}/extension/shipping/${name}&token=${
//       nextCookies.get('token').value
//     }`,
//     requestOptions
//   );

//   const res = await response.json();

//   if (response.status == 401) {
//     return new Response(
//       JSON.stringify({
//         status: 401,
//         statusText: 'Unauthorized!',
//         error: res.error_warning,
//       })
//     );
//   }

//   if (response.status === 200) {
//     // console.log('set');

//     return new Response(
//       JSON.stringify({
//         status: 200,
//         shipping: res,
//       })
//     );
//   }
// }

export async function GET(request, { params }) {
  const { id } = params;

  const nextCookies = cookies();

  let headers = new Headers();

  var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  };

  const response = await fetch(
    `${_API_URL_ADMIN}/shippings/${id}`,
    requestOptions
  );

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
        shipping: res,
      })
    );
  }
}

export async function PUT(request, { params }) {
  const { name } = params;
  console.log('PUT ISTEK GELDİ');

  const data = await request.json();

  const nextCookies = cookies();

  try {
    const response = await axios({
      method: 'POST',
      mode: 'no-cors',
      url: `${API_URL_ADMIN}/extension/shipping/${name}&token=${
        nextCookies.get('token').value
      }`,

      headers: {
        'Content-Type': 'multipart/form-data',
        Cookie: `default=${nextCookies.get('default').value}; PHPSESSID=${
          nextCookies.get('PHPSESSID').value
        }; language=${nextCookies.get('language').value}; currency=${
          nextCookies.get('currency').value
        }`,
      },
      data: data,
    });

    // console.log('response.status: ', response);

    // TODO: response.status 201 olmalı
    if (response.status === 200) {
      return new Response(
        JSON.stringify({
          status: response.status,
          statusText: response.statusText,
          data: response.data,
        })
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
      })
    );
  }

  // console.log('RES: ', res);
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
