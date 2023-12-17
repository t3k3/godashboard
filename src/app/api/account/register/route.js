import { _API_URL_ADMIN } from '@/config/apiConfig';
// import getClientHeaders from '@/app/libs/getHeaders';

export async function POST(request) {
  const data = await request.json();

  // const nextCookies = cookies();

  // let headers = new Headers();

  // headers.append('Cookie', `default=${nextCookies.get('default').value}`);
  // headers.append('Cookie', `PHPSESSID=${nextCookies.get('PHPSESSID').value}`);
  // headers.append('Cookie', `language=${nextCookies.get('language').value}`);
  // headers.append('Cookie', `currency=${nextCookies.get('currency').value}`);

  // console.log('requestOptions: ', requestOptions);

  try {
    const response = await fetch({
      method: 'POST',
      //   mode: 'no-cors',
      url: `${_API_URL_ADMIN}/customers`,

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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
}
