import { API_URL_ADMIN } from '@/config/apiConfig';

import axios from 'axios';

//get all categories
export async function GET(request, { params }) {
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
  // console.log('request: ', request.cookies);

  const { id } = params;

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
    `${API_URL_ADMIN}/customer/customer/orders&customer_id==${id}&token=${cookiesObject.token}`,
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
        orders: res,
      })
    );
  }
}

export async function PUT(request, { params }) {
  // console.log('PUT ISTEK GELDİ');
  const { id } = params;

  const data = await request.json();

  const nextCookies = cookies();

  try {
    const response = await axios({
      method: 'POST',
      mode: 'no-cors',
      url: `${API_URL_ADMIN}/customer/customer/edit&customer_id=${id}&token=${
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

    if (response.status === 201) {
      // console.log('response.status: ', response.status);
      return new Response(
        JSON.stringify({
          status: response.status,
          statusText: response.statusText,
          data: response.data,
        })
      );
    }
  } catch (error) {
    // console.log('response.status: ', error.response.status);
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
