import { API_URL_STORE } from '@/config/apiConfig';

const getCartService = async (pathname, cookies = []) => {
  let headers = new Headers();
  cookies.map((cookie) => {
    return headers.append('Cookie', `${cookie.name}=${cookie.value}`);
  });

  try {
    const res = await fetch(`${API_URL_STORE}/${pathname}`, {
      cache: 'no-store',
      headers: headers,
    });

    return res.json();
  } catch (error) {
    console.log('ERROR');
    return new Error('CART DATA ÇEKİLEMEDİ');
  }
};

const postCartService = async (product_id, quantity) => {
  console.log('POST CART SERVİCE');
  let myHeaders = new Headers();
  myHeaders.append(
    'Cookie',
    'PHPSESSID=f706faedd411f33cefdfedf49fbd6922; currency=TRY; default=522fa9e19f5f06730139eac92212cd76; language=tr-tr'
  );
  let formdata = new FormData();
  formdata.append('product_id', '7342');
  formdata.append('quantity', '2');
  console.log('formdata: ', formdata);
  console.log('myHeaders: ', myHeaders);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };
  fetch(
    'http://demo.actsistem.com/api/v1/store/index.php?route=checkout/cart/add',
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
  // ------------------------------------------------------------------------
  // const hdrs = await getCookies();
  // console.log('hdrs: ', hdrs);
  // var formdata = new FormData();
  // formdata.append('product_id', '7342');
  // formdata.append('quantity', '2');
  // let headers = new Headers();
  // headers.append('Cookie', `default=cc83ff01a2f38e6c9188670ff7471bd2`);
  // headers.append('Cookie', `PHPSESSID=0782bb361541082ce68bd603c14ceec6`);
  // // cookies.map((cookie) => {
  // //   return headers.append('Cookie', `${cookie.name}=${cookie.value}`);
  // // });
  // console.log('HEADERS: ', headers);
  // const res = await fetch(`${API_URL_STORE}/checkout/cart/add`, {
  //   method: 'POST',
  //   headers: headers,
  //   body: formdata,
  // });
  // if (!res.ok) {
  //   const error = await res.text();
  //   console.log('error');
  //   throw new Error(error);
  // }
  // console.log('RES: ', res.headers.getSetCookie());
  // const resData = await res.json();
  // console.log('RESPONSE: ', resData);
  // // return resData;
};

const getCart = async (cookies) => {
  return getCartService('checkout/cart', cookies);
};

const addToCart = async (product_id, quantity) => {
  return postCartService(product_id, quantity);
};

export { getCartService, getCart, addToCart };
