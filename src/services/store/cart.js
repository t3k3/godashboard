import { API_URL_STORE, _BASE_URL } from '@/config/apiConfig';

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

const postCartService = async (data) => {
  console.log('POST CART SERVİCE: ', data);

  var requestOptions = {
    method: 'POST',
    body: JSON.stringify(data),
    redirect: 'follow',
  };
  fetch(`${_BASE_URL}/api/cart`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
};

const getCart = async (cookies) => {
  return getCartService('checkout/cart', cookies);
};

const addToCart = async (data) => {
  return postCartService(data);
};

export { getCartService, getCart, addToCart };
