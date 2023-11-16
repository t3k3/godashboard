import { API_URL_ADMIN } from '@/config/apiConfig';
import { cookies } from 'next/headers';
import axios from 'axios';

//get all categories
export async function PUT(request) {
  const data = await request.json();

  console.log('DATA123: ', data);

  const nextCookies = cookies();

  console.log('nextCookies.get(token).value: ', nextCookies.get('token').value);

  // let headers = new Headers();

  // headers.append('Cookie', `default=${nextCookies.get('default').value}`);
  // headers.append('Cookie', `PHPSESSID=${nextCookies.get('PHPSESSID').value}`);
  // headers.append('Cookie', `language=${nextCookies.get('language').value}`);
  // headers.append('Cookie', `currency=${nextCookies.get('currency').value}`);

  // var requestOptions = {
  //   method: 'POST',
  //   headers: headers,
  //   data: data,
  //   redirect: 'follow',
  // };

  // console.log('requestOptions: ', requestOptions);

  const response = await axios({
    method: 'POST',
    mode: 'no-cors',
    url: `${API_URL_ADMIN}/catalog/combination/optionRender&token=${
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

  // const response = await fetch(
  //   `${API_URL_ADMIN}/catalog/combination/optionRender&token=${
  //     nextCookies.get('token').value
  //   }`,
  //   requestOptions
  // );

  console.log('response.status: ', response.data);
  // const res = await response.json();
  // console.log('res: ', res);

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
        // statusText: 'login true',
        data: response.data,
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
