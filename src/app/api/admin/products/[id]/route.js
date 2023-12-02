import { API_URL_ADMIN, _API_URL_ADMIN } from '@/config/apiConfig';
import { cookies } from 'next/headers';
import axios from 'axios';

//get single product
export async function GET(request, { params }) {
  const { id } = params;
  console.log('id324234: ', id);
  const nextCookies = cookies();

  let headers = new Headers();
  // headers.append('Cookie', `default=${nextCookies.get('default').value}`);
  // headers.append('Cookie', `PHPSESSID=${nextCookies.get('PHPSESSID').value}`);
  // headers.append('Cookie', `language=${nextCookies.get('language').value}`);
  // headers.append('Cookie', `currency=${nextCookies.get('currency').value}`);

  var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow',
  };

  const response = await fetch(
    `${_API_URL_ADMIN}/products/${id}`,
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
        product: res,
      })
    );
  }
}

export async function PUT(request, { params }) {
  console.log('PUT ISTEK GELDİ');
  console.log('params12312323: ', params);
  const { id } = params;

  const data = await request.json();

  console.log('data4233234: ', data);

  const nextCookies = cookies();

  try {
    const response = await axios({
      method: 'PUT',
      mode: 'no-cors',
      url: `${_API_URL_ADMIN}/products/${id}`,

      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    });

    console.log('response.status: ', response.status);

    //TODO: response.status 201 olmalı
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
