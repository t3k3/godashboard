// http://demo.actsistem.com/api/v1/store/index.php?route=checkout/checkout
import { API_URL_STORE, BASE_URL } from '@/config/apiConfig';

const getCheckoutService = async (pathname, cookies = []) => {
  let headers = new Headers();
  cookies.map((cookie) => {
    return headers.append('Cookie', `${cookie.name}=${cookie.value}`);
  });

  try {
    const res = await fetch(`${API_URL_STORE}/${pathname}`, {
      cache: 'no-store',
      headers: headers,
    });

    if (res.status == 404) {
      return { status: 404 };
    }

    if (res.status == 500) {
      return { status: 500 };
    }

    const response = await res.json();

    return response;
  } catch (error) {
    console.log('ERROR');
    return new Error('CART DATA ÇEKİLEMEDİ');
  }
};

const getCheckoutFromClientSideService = async () => {
  var requestOptions = {
    cache: 'no-store',
    method: 'GET',
    redirect: 'follow',
  };

  try {
    const res = await fetch(
      `${BASE_URL}/api/checkout/getCheckoutFromClientSide`,
      requestOptions
    );

    const response = await res.json();

    // console.log('response: ', response);

    return response.cart;
  } catch (error) {
    throw new Error(error);
  }
};

async function saveShippingMethodService(cart) {
  var requestOptions = {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify(cart),
    redirect: 'follow',
  };

  try {
    const res = await fetch(
      `${BASE_URL}/api/checkout/setCheckoutShippingMethod`,
      requestOptions
    );

    const response = await res.json();

    return response;
  } catch (error) {
    throw new Error(error);
  }
}

async function saveOrderAddressesForMemberService(data) {
  var requestOptions = {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify(data),
    redirect: 'follow',
  };

  try {
    const res = await fetch(
      `${BASE_URL}/api/checkout/setShippingMethodForMember`,
      requestOptions
    );

    const response = await res.json();

    return response;
  } catch (error) {
    throw new Error(error);
  }
}

async function saveShippingAndFaturaService(data) {
  var requestOptions = {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify(data),
    // body: data,
    redirect: 'follow',
  };

  try {
    const res = await fetch(
      `${BASE_URL}/api/checkout/setCheckoutShippingAndFatura`,
      requestOptions
    );

    const response = await res.json();

    return response;
  } catch (error) {
    throw new Error(error);
  }
}

async function confirm(data) {
  var requestOptions = {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify(data),
    // body: data,
    redirect: 'follow',
  };

  try {
    const res = await fetch(`${BASE_URL}/api/payment/confirm`, requestOptions);

    const response = await res.json();

    return response;
  } catch (error) {
    throw new Error(error);
  }
}

const getCheckout = async (cookies) => {
  return getCheckoutService('checkout/checkout', cookies);
};

const getCheckoutFromClientSide = async () => {
  return getCheckoutFromClientSideService();
};

const saveShippingMethod = async (cart) => {
  return saveShippingMethodService(cart);
};

const saveOrderAddressesForMember = async (data) => {
  return saveOrderAddressesForMemberService(data);
};

const saveShippingAndFatura = async (data) => {
  return saveShippingAndFaturaService(data);
};

export {
  getCheckoutService,
  getCheckout,
  getCheckoutFromClientSide,
  saveShippingMethod,
  saveOrderAddressesForMember,
  saveShippingAndFatura,
  confirm,
};
