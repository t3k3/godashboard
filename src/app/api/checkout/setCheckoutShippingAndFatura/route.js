import { API_URL_STORE } from '@/config/apiConfig';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function POST(request) {
  // console.log('PUT ISTEK GELDİ');

  // console.log('request PROP: ', request);
  const data = await request.json();
  console.log('DATA5566: ', data);
  const nextCookies = cookies();

  let formdata = new FormData();

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

  // Fatura adresiyle teslimat adresi farklı
  if (data.sameAddresses === 0) {
    formdata.append('payment_company', data.payment_company);
    formdata.append('payment_vkn', data.payment_vkn);
    formdata.append('payment_vd', data.payment_vd);
    formdata.append('payment_country_id', data.payment_country_id);
    formdata.append('payment_city', data.payment_city);
    formdata.append('payment_zone_id', data.payment_zone_id);
    formdata.append('payment_address_1', data.payment_address_1);
    formdata.append('payment_postcode', data.payment_postcode);
    formdata.append('payment_telephone', data.payment_telephone);
  }

  // Fatura adresiyle teslimat adresi aynı
  if (data.sameAddresses === 1) {
    formdata.append(
      'payment_company',
      data.shipping_firstname + ' ' + data.shipping_lastname
    );
    formdata.append('payment_vkn', data.shipping_tckn);
    formdata.append('payment_country_id', data.shipping_country_id);
    formdata.append('payment_city', data.shipping_city);
    formdata.append('payment_zone_id', data.shipping_zone_id);
    formdata.append('payment_address_1', data.shipping_address_1);
    formdata.append('payment_postcode', data.shipping_postcode);
    formdata.append('payment_telephone', data.shipping_telephone);
  }

  formdata.append('comment', data.comment);

  // try {
  const response = await axios({
    cache: 'no-store',
    method: 'POST',
    mode: 'no-cors',

    url: `${API_URL_STORE}/checkout/checkout/save`,
    // url: `${API_URL_STORE}/checkout/checkout/confirm`,

    headers: {
      'Content-Type': 'multipart/form-data',
      Cookie: `default=${nextCookies.get('default').value}; PHPSESSID=${
        nextCookies.get('PHPSESSID').value
      }; language=${nextCookies.get('language').value}; currency=${
        nextCookies.get('currency').value
      }`,
    },
    data: formdata,
  });

  console.log('response.status421334: ', response.status);
  // console.log('response.status: ', response.data);
  // console.log('response: ', response);

  if (response.status === 200) {
    return new Response(
      JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        data: response.data,
      })
    );
  }

  //TODO: response.status 201 olmalı
  //   if (response.status === 200) {
  //     return new Response(
  //       JSON.stringify({
  //         status: response.status,
  //         statusText: response.statusText,
  //         data: response.data,
  //       })
  //     );
  //   }
  // } catch (error) {
  //   return new Response(
  //     JSON.stringify({
  //       status: error.response.status,
  //       statusText: error.response.statusText,
  //       data: error.response.data,
  //     })
  //   );
  // }

  // console.log('RES: ', res);
}
