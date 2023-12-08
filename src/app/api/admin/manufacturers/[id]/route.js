import { _API_URL_ADMIN } from '@/config/apiConfig';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function PUT(request, { params }) {
  const { id } = params;

  const data = await request.json();

  const nextCookies = cookies();

  // let headers = new Headers();

  // headers.append('Cookie', `default=${nextCookies.get('default').value}`);
  // headers.append('Cookie', `PHPSESSID=${nextCookies.get('PHPSESSID').value}`);
  // headers.append('Cookie', `language=${nextCookies.get('language').value}`);
  // headers.append('Cookie', `currency=${nextCookies.get('currency').value}`);

  // console.log('requestOptions: ', requestOptions);

  try {
    const response = await fetch({
      method: 'PUT',
      //   mode: 'no-cors',
      url: `${_API_URL_ADMIN}/manufacturers/${id}`,

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

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

export async function DELETE(request, { params }) {
  const { id } = params;

  const nextCookies = cookies();

  try {
    const response = await axios({
      method: 'DELETE',
      mode: 'no-cors',
      url: `${_API_URL_ADMIN}/manufacturers/${id}`,

      headers: {
        'Content-Type': 'application/json',
      },
    });

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
    console.log('ERRRROROROORR: ', error);
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
