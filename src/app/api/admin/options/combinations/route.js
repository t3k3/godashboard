import { _API_URL_ADMIN } from '@/config/apiConfig';
import { cookies } from 'next/headers';
import axios from 'axios';

//get all categories
export async function PUT(request) {
  const data = await request.json();

  // console.log('DATA123: ', data);

  const nextCookies = cookies();

  // let headers = new Headers();

  // headers.append('Cookie', `default=${nextCookies.get('default').value}`);
  // headers.append('Cookie', `PHPSESSID=${nextCookies.get('PHPSESSID').value}`);
  // headers.append('Cookie', `language=${nextCookies.get('language').value}`);
  // headers.append('Cookie', `currency=${nextCookies.get('currency').value}`);

  // console.log('requestOptions: ', requestOptions);

  try {
    const response = await axios({
      method: 'POST',
      mode: 'no-cors',
      url: `${_API_URL_ADMIN}/products/option/combination`,

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
}
