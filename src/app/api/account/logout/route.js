import { API_URL_STORE } from '@/config/apiConfig';
import getClientHeaders from '@/app/libs/getHeaders';

export async function POST(request) {
  const cookies = await getClientHeaders();

  let headers = new Headers();
  cookies.map((cookie) => {
    return headers.append('Cookie', `${cookie.name}=${cookie.value}`);
  });

  var requestOptions = {
    method: 'POST',
    headers: headers,
    redirect: 'follow',
  };

  const response = await fetch(
    `${API_URL_STORE}account/logout`,
    requestOptions
  );

  //   console.log('response FROM ROUTEJS: ', response);

  const res = await response.json();

  return new Response(
    JSON.stringify({
      status: 200,
      logout: res.logout,
    })
  );

  // return new Response(
  //   JSON.stringify({
  //     status: 200,
  //     logout: res.logout,
  //   }),
  //   {
  //     headers: {
  //       'Set-Cookie': 'PHPSESSID=deleted; path=/;',
  //     },
  //   }
  // );
}
