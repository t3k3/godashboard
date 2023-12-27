import { API_URL_STORE, _API_URL_STORE, _BASE_URL } from '@/config/apiConfig';

const getCartService = async (cookies = []) => {
  let headers = new Headers();
  cookies.map((cookie) => {
    return headers.append('Cookie', `${cookie.name}=${cookie.value}`);
  });

  try {
    const res = await fetch(`${_BASE_URL}/api/cart`, {
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
  // console.log('POST CART SERVİCEtfdgsdf: ', data);

  var requestOptions = {
    method: 'POST',
    body: JSON.stringify(data),
    redirect: 'follow',
  };
  const response = await fetch(`${_BASE_URL}/api/cart`, requestOptions);

  console.log('RESPONSE  11113345345: ', response.status);

  const res = await response.json();

  return res;
};

const editCartService = async (data) => {
  console.log('POST CART SERVİCEtfdgsdf: ', data);

  var requestOptions = {
    method: 'PATCH',
    body: JSON.stringify(data),
    redirect: 'follow',
  };
  const response = fetch(`${_BASE_URL}/api/cart`, requestOptions);

  console.log('RESPONSE1345345: ', response);
};

const deleteCartService = async (id) => {
  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow',
  };
  const response = await fetch(`/api/cart?cart_item_id=${id}`, requestOptions);

  console.log('RESPONSE2345345: ', response);

  return response;
};

const getCart = async (cookies) => {
  return getCartService(cookies);
};

const addToCart = async (data) => {
  return postCartService(data);
};

const editCart = async (data) => {
  return editCartService(data);
};

const deleteCart = async (id) => {
  return deleteCartService(id);
};

export { getCartService, getCart, addToCart, editCart, deleteCart };
