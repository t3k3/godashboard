import { API_URL_STORE } from '@/config/apiConfig';
import getClientHeaders from '@/app/libs/getHeaders';

export async function POST(request) {
  // console.log('POST ISTEK GELDİ');
  const cookies = await getClientHeaders();
  // console.log('cookies: ', cookies);

  const data = await request.json();

  console.log('data: ', data);

  let headers = new Headers();
  cookies.map((cookie) => {
    return headers.append('Cookie', `${cookie.name}=${cookie.value}`);
  });
  // headers.append('Content-Type', 'multipart/form-data');

  let formdata = new FormData();
  formdata.append('email', data.email);
  formdata.append('password', data.password);

  // console.log('formdata: ', formdata);

  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: formdata,
    redirect: 'follow',
  };

  const response = await fetch(`${API_URL_STORE}account/login`, requestOptions);

  //   console.log('response FROM ROUTEJS: ', response);

  const res = await response.json();

  if (res.error_warning) {
    return new Response(
      JSON.stringify({
        status: 401,
        statusText: 'Unauthorized!',
        error: res.error_warning,
      })
    );
  }

  if (res.customer) {
    return new Response(
      JSON.stringify({
        status: 200,
        statusText: 'Login true',
        customer: res.customer,
      })
    );
  }
}
