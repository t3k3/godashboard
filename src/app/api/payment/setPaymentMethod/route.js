import { API_URL_STORE } from '@/config/apiConfig';
import getClientHeaders from '@/app/libs/getHeaders';

export async function POST(request) {
  console.log('GEL BABA');
  const cookies = await getClientHeaders();

  const data = await request.json();

  console.log('GEL BABA data: ', data);

  let formdata = new FormData();

  formdata.append('payment_method', data.payment_method);

  formdata.append('agree', '1');

  formdata.append('shipping_firstname', data.shipping_firstname);
  formdata.append('shipping_lastname', data.shipping_lastname);
  formdata.append('shipping_tckn', data.shipping_tckn);
  formdata.append('shipping_country_id', data.shipping_country_id);
  formdata.append('shipping_city', data.shipping_city);
  formdata.append('shipping_zone_id', data.shipping_zone_id);
  formdata.append('shipping_address_1', data.shipping_address_1);
  formdata.append('shipping_postcode', data.shipping_postcode);
  formdata.append('email', data.email);
  formdata.append('shipping_telephone', data.shipping_telephone);

  formdata.append('payment_type', '0'); //0 = Bireysel 1 = Kurumsal

  formdata.append('payment_company', data.payment_company);
  formdata.append('payment_vkn', data.payment_vkn);
  formdata.append('payment_vd', data.payment_vd);
  formdata.append('payment_country_id', data.payment_country_id);
  formdata.append('payment_city', data.payment_city);
  formdata.append('payment_zone_id', data.payment_zone_id);
  formdata.append('payment_address_1', data.payment_address_1);
  formdata.append('payment_postcode', data.payment_postcode);
  formdata.append('payment_telephone', data.payment_telephone);

  formdata.append('comment', data.comment);

  let headers = new Headers();
  cookies.map((cookie) => {
    return headers.append('Cookie', `${cookie.name}=${cookie.value}`);
  });

  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: formdata,
    redirect: 'follow',
  };

  const response = await fetch(
    `${API_URL_STORE}/checkout/checkout/save`,
    requestOptions
  );

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
      cart: res,
    })
  );
}
