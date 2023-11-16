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

  if (data.address_type == 0) {
    formdata.append('firstname', data.firstname);
    formdata.append('lastname', data.lastname);
    formdata.append('address_1', data.address_1);
    formdata.append('postcode', data.postcode);
    formdata.append('city', data.city);
    formdata.append('zone_id', data.zone_id);
    formdata.append('country_id', data.country_id);
    formdata.append('email', data.email);
    formdata.append('telephone', data.telephone);
    formdata.append('tckn', data.tckn);
    formdata.append('address_type', data.address_type);
  }

  if (data.address_type == 1) {
    formdata.append('address_1', data.address_1);
    formdata.append('postcode', data.postcode);
    formdata.append('city', data.city);
    formdata.append('zone_id', data.zone_id);
    formdata.append('country_id', data.country_id);
    formdata.append('vkn', data.vkn);
    formdata.append('vd', data.vd);
    formdata.append('company', data.company);
    formdata.append('address_type', data.address_type);
  }

  //   try {
  const response = await axios({
    cache: 'no-store',
    method: 'POST',
    mode: 'no-cors',

    url: `${API_URL_STORE}/account/address/add`,
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

  console.log('response.status: ', response.status);
  console.log('response 6546: ', response);
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
