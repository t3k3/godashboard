import { API_URL_ADMIN } from '@/config/apiConfig';
import axios from 'axios';
import { cookies } from 'next/headers';

//get product order history
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
    `${API_URL_ADMIN}/catalog/product/OrderProducts&product_id=${id}&token=${cookiesObject.token}`,
    requestOptions
  );

  const res = await response.json();

  // console.log('RES: ', res);

  if (response.status == 401) {
    return new Response(
      JSON.stringify({
        status: 401,
        statusText: 'Unauthorized!',
        error: res.error_warning,
      })
    );
  }
  //TODO: RESPONSE.STATUS 201 olamlı.
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
  // console.log('PUT ISTEK GELDİ orderHistory');
  const { id } = params;
  console.log('PUT ISTEK id', id);

  const data = await request.json();

  // const data = { notify: 'false', order_status_id: '13' };

  console.log('data: ', data);

  const nextCookies = cookies();

  try {
    const response = await axios({
      method: 'POST',
      mode: 'no-cors',
      url: `${API_URL_ADMIN}/sale/order/addHistory&order_id=${id}&token=${
        nextCookies.get('token').value
      }`,

      headers: {
        'Content-Type': 'multipart/form-data',
        // 'Content-Type': 'application/json',
        Cookie: `default=${nextCookies.get('default').value}; PHPSESSID=${
          nextCookies.get('PHPSESSID').value
        }; language=${nextCookies.get('language').value}; currency=${
          nextCookies.get('currency').value
        }`,
      },
      data: data,
    });

    //TODO: RESPONSE.STATUS 201 olmalı.
    if (response && response.status === 200) {
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
    console.log('response.error: ', error);
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
