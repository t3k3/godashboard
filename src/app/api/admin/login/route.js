import getClientHeaders from '@/app/libs/getHeaders';
import { API_URL_ADMIN } from '@/config/apiConfig';

export async function POST(request) {
  console.log('ADMİN LOGİN ROUTE');

  const cookies = await getClientHeaders();

  const data = await request.json();

  // console.log('data: ', data);

  let headers = new Headers();
  cookies.map((cookie) => {
    return headers.append('Cookie', `${cookie.name}=${cookie.value}`);
  });

  let formdata = new FormData();
  formdata.append('username', data.username);
  formdata.append('password', data.password);

  // console.log('formdata: ', formdata);

  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: formdata,
    redirect: 'follow',
  };

  const response = await fetch(`${API_URL_ADMIN}common/login`, requestOptions);

  console.log('response.status: ', response.status);
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

    // return new Response(
    // JSON.stringify({
    //   status: 200,
    //   statusText: 'login true',
    //   token: res.token,
    // })
    // );
    return new Response(
      JSON.stringify({
        status: 200,
        statusText: 'login true',
      }),
      {
        headers: {
          'Set-Cookie': `token=${res.token}; Path=/; SameSite=Strict`,
        },
      }
    );
  }
}
