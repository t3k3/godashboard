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
  formdata.append('agree', data.agree);

  // console.log('formdata: ', formdata);

  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: formdata,
    redirect: 'follow',
  };

  const response = await fetch(
    `${API_URL_STORE}account/register`,
    requestOptions
  );

  //   console.log('response FROM ROUTEJS: ', response);

  const res = await response.json();

  if (res.hasOwnProperty('success')) {
    console.log('GELDİ');
    return new Response(
      JSON.stringify({
        status: 201,
        success: res.success,
      })
    );
  }

  if (res.hasOwnProperty('error_warning')) {
    console.log('GELDİ');
    return new Response(
      JSON.stringify({
        status: 401,
        error_warning: res.error_warning,
        error_email: res.error_email,
        error_password: res.error_password,
      })
    );
  }

  //   if (res.customer) {
  //     return new Response(
  //       JSON.stringify({
  //         status: 200,
  //         statusText: 'Login true',
  //         customer: res.customer,
  //       })
  //     );
  //   }
}
