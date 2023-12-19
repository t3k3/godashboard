import { BASE_URL, _BASE_URL } from '@/config/apiConfig';

const getCheckoutService = async (
  cookies = [],
  ShippingOptionID = 0,
  couponCode = ''
) => {
  let headers = new Headers();
  cookies.find((cookie) => {
    if (cookie.name === 'CART_ID') {
      headers.append('Cookie', `${cookie.name}=${cookie.value}`);
    }
  });

  try {
    const res = await fetch(
      `${_BASE_URL}/api/checkout?shipping=${ShippingOptionID}&coupon=${couponCode}`,
      {
        cache: 'no-store',
        headers: headers,
      }
    );

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

async function saveShippingMethodService(id) {
  var requestOptions = {
    cache: 'no-store',
    method: 'PATCH',
    body: JSON.stringify({ shipping_option_id: id }),
    redirect: 'follow',
  };

  try {
    const res = await fetch(
      `${_BASE_URL}/api/checkout/setCheckoutShippingMethod`,
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

async function createOrderService(data) {
  var requestOptions = {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify(data),
    // body: data,
    redirect: 'follow',
  };

  try {
    const res = await fetch(`${_BASE_URL}/api/order`, requestOptions);

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

const getCheckout = async (cookies, ShippingOptionID, couponCode) => {
  return getCheckoutService(cookies, ShippingOptionID, couponCode);
};

const getCheckoutFromClientSide = async () => {
  return getCheckoutFromClientSideService();
};

const saveShippingMethod = async (id) => {
  return saveShippingMethodService(id);
};

const saveOrderAddressesForMember = async (data) => {
  return saveOrderAddressesForMemberService(data);
};

const createOrder = async (data) => {
  return createOrderService(data);
};

export {
  getCheckoutService,
  getCheckout,
  getCheckoutFromClientSide,
  saveShippingMethod,
  saveOrderAddressesForMember,
  createOrder,
  confirm,
};
