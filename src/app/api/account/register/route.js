import { _API_URL_ADMIN, _API_URL_STORE } from '@/config/apiConfig';
import getClientHeaders from '@/app/libs/getHeaders';

export async function POST(request) {
  const cookies = await getClientHeaders();
  // console.log('cookies: ', cookies);

  const data = await request.json();

  console.log('data: ', data);

  let headers = new Headers();
  cookies.find((cookie) => {
    if (cookie.name === 'CART_ID') {
      headers.append('Cookie', `${cookie.name}=${cookie.value}`);
    }
  });

  // console.log('formdata: ', formdata);

  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
    redirect: 'follow',
  };

  const response = await fetch(
    `${_API_URL_STORE}/account/register`,
    requestOptions
  );
  console.log('response.status 1111111111: ', response.status);
  if (response.status === 201) {
    const res = await response.json();
    if (res != '') {
      let response = new Response(
        JSON.stringify({
          status: 201,
          statusText: 'Register success',
        })
      );

      response.headers.set(
        'Set-Cookie',
        'SESSION_ID=' + res + '; path=/; HttpOnly'
      );

      return response;
    }
  }

  if (response.status === 409) {
    let response = new Response(
      JSON.stringify({
        status: 409,
        statusText: 'Kayit yapilamadi. Eposta adresi zaten kayitli.',
      })
    );

    return response;
  }
}
