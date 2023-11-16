import { API_URL_ADMIN } from '@/config/apiConfig';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function POST(request, { params }) {
  console.log('UPLAODER API POST ISTEK GELDİ');
  const { id } = params;

  const nextCookies = cookies();

  let formData = await request.formData();

  try {
    const response = await axios({
      method: 'POST',
      mode: 'no-cors',
      url: `${API_URL_ADMIN}/catalog/product/uploader&directory=${id}&token=${
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
      data: formData,
    });

    console.log('RESPONSE: ', response.status);

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
