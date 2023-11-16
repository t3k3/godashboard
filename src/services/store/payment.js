// http://demo.actsistem.com/api/v1/store/index.php?route=checkout/checkout
import { API_URL_STORE, BASE_URL } from '@/config/apiConfig';

const getPaymentService = async (pathname, cookies = []) => {
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

    return res.json();
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

async function savePaymentMethodService(cart) {
  var requestOptions = {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify(cart),
    redirect: 'follow',
  };

  try {
    const res = await fetch(
      `${BASE_URL}/api/payment/setPaymentMethod`,
      requestOptions
    );

    const response = await res.json();

    return response;
  } catch (error) {
    throw new Error(error);
  }
}

async function saveShippingAndFaturaService(data) {
  // var jsonString = JSON.stringify(data, replacer);

  // function replacer(key, value) {
  //   if (typeof value === 'boolean') {
  //     return String(value);
  //   }
  //   return value;
  // }

  // console.log(
  //   '------------------------------------------------------------------------'
  // );
  // console.log('DATA12345: ', data);

  // console.log(
  //   '------------------------------------------------------------------------'
  // );
  // var temp = {};
  // data.map((key, value) => {
  //   temp[key] = String.value;
  // });

  // console.log(
  //   '------------------------------------------------------------------------'
  // );
  // console.log('DATA12345: ', [data]);

  // console.log(
  //   '------------------------------------------------------------------------'
  // );

  var requestOptions = {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify(data),
    // body: data,
    redirect: 'follow',
  };

  // console.log('requestOptions: ', requestOptions);

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

const getCheckout = async (cookies) => {
  return getCheckoutService('checkout/checkout', cookies);
};

const getCheckoutFromClientSide = async () => {
  return getCheckoutFromClientSideService();
};

const savePaymentMethod = async (cart) => {
  return savePaymentMethodService(cart);
};

const saveShippingAndFatura = async (data) => {
  return saveShippingAndFaturaService(data);
};

export {
  getCheckout,
  getCheckoutFromClientSide,
  savePaymentMethod,
  saveShippingAndFatura,
};
