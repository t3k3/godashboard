import { _API_URL_STORE } from '@/config/apiConfig';

export async function POST(request) {
  const { data } = await request.json();
  // console.log('data: ', data);
  //   console.log('Selam ben api routetan geliyorum');
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'text/xml');
  myHeaders.append('Cookie', 'cookiesession1=678A3E257E2DA40476F41A5BD6BB1B49');

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
    redirect: 'follow',
  };

  const response = await fetch(
    'https://test-dmz.param.com.tr/turkpos.ws/service_turkpos_test.asmx',
    requestOptions
  );
  //   console.log('response param test service: ', response);

  if (response.status === 200) {
    const res = await response.text();
    return new Response(res);
  }
}
