import { _API_URL_STORE } from '@/config/apiConfig';

//Get Banks
export async function GET() {
  //   let headers = new Headers();
  //   cookies.find((cookie) => {
  //     if (cookie.name === 'CART_ID') {
  //       headers.append('Cookie', `${cookie.name}=${cookie.value}`);
  //     }
  //   });

  var requestOptions = {
    cache: 'no-store',
    method: 'GET',
    // headers: headers,
    redirect: 'follow',
  };

  const response = await fetch(`${_API_URL_STORE}/banks`, requestOptions);

  const res = await response.json();

  if (res.error) {
    return new Response(
      JSON.stringify({
        status: 404,
        error: res.error,
      })
    );
  }

  return new Response(
    JSON.stringify({
      status: 200,
      banks: res,
    })
  );
}
