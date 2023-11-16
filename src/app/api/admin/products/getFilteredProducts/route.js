import { API_URL_ADMIN } from '@/config/apiConfig';

//get filtered product
export async function GET(request) {
  const url = new URL(request.url);

  const searchParams = url.searchParams;

  const filterName = searchParams.get('name');
  const filterValue = searchParams.get('value');

  const cookiesHeader = request.headers.get('cookie');

  const cookiesObject = {};
  if (cookiesHeader) {
    const cookiesArray = cookiesHeader.split('; ');

    cookiesArray.forEach((cookie) => {
      const [key, value] = cookie.split('=');
      cookiesObject[key] = value;
    });

    // console.log('Cookies: ', cookiesObject);
  } else {
    console.log('No cookies found');
  }
  // console.log('request: ', request.cookies);

  // const { id } = params;

  let headers = new Headers();
  headers.append('Cookie', `default=${cookiesObject.default}`);
  headers.append('Cookie', `PHPSESSID=${cookiesObject.PHPSESSID}`);
  headers.append('Cookie', `language=${cookiesObject.language}`);
  headers.append('Cookie', `currency=${cookiesObject.currency}`);

  var requestOptions = {
    method: 'GET',

    headers: headers,
    redirect: 'follow',
  };

  const response = await fetch(
    `${API_URL_ADMIN}/catalog/product&sort=pd.name&order=DESC&${filterName}=${filterValue}&token=${cookiesObject.token}`,
    requestOptions
  );

  const res = await response.json();

  // console.log('RES: ', res);

  if (response.status == 401) {
    return new Response(
      JSON.stringify({
        status: 401,
        statusText: 'Unauthorized!',
        error: res.error_warning,
      })
    );
  }
  //TODO: RESPONSE.STATUS 201 olamlı.
  if (response.status === 200) {
    // console.log('set');

    return new Response(
      JSON.stringify({
        status: 200,
        products: res,
      })
    );
  }
}
