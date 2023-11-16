import { API_URL_ADMIN } from '@/config/apiConfig';

//get all categories
export async function GET(request) {
  const cookiesHeader = request.headers.get('cookie');

  const cookiesObject = {};
  if (cookiesHeader) {
    const cookiesArray = cookiesHeader.split('; ');

    cookiesArray.forEach((cookie) => {
      const [key, value] = cookie.split('=');
      cookiesObject[key] = value;
    });

    // console.log('Cookies: ', cookiesObject);
  } else {
    console.log('No cookies found');
  }

  let headers = new Headers();
  headers.append('Cookie', `default=${cookiesObject.default}`);
  headers.append('Cookie', `PHPSESSID=${cookiesObject.PHPSESSID}`);
  headers.append('Cookie', `language=${cookiesObject.language}`);
  headers.append('Cookie', `currency=${cookiesObject.currency}`);

  var requestOptions = {
    method: 'GET',

    headers: headers,
    redirect: 'follow',
  };

  const response = await fetch(
    `${API_URL_ADMIN}/catalog/category&token=${cookiesObject.token}`,
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
        categories: res.categories,
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
