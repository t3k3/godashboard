import { API_URL_ADMIN, _API_URL_ADMIN } from '@/config/apiConfig';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function POST(request) {
  console.log('POST ISTEK GELDİ');

  const data = await request.json();

  console.log('data4233234: ', data);

  const nextCookies = cookies();

  try {
    const response = await axios({
      method: 'POST',
      mode: 'no-cors',
      url: `${_API_URL_ADMIN}/options/create`,

      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    });

    if (response.status === 201) {
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
