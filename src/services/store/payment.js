// http://demo.actsistem.com/api/v1/store/index.php?route=checkout/checkout
import { _BASE_URL } from '@/config/apiConfig';

const getPaymentService = async (cookies = [], orderID = 0) => {
  let headers = new Headers();
  cookies.find((cookie) => {
    if (cookie.name === 'CART_ID') {
      headers.append('Cookie', `${cookie.name}=${cookie.value}`);
    }
  });

  try {
    const res = await fetch(`${_BASE_URL}/api/order?orderid=${orderID}`, {
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
    return new Error('Payment DATA ÇEKİLEMEDİ');
  }
};

const confirmOrderEftService = async (
  cookies = [],
  orderID = 0,
  payment_method = null,
  payment_code = null
) => {
  if (payment_method != null && payment_code != null) {
    let headers = new Headers();
    cookies.find((cookie) => {
      if (cookie.name === 'CART_ID') {
        headers.append('Cookie', `${cookie.name}=${cookie.value}`);
      }
    });

    try {
      const res = await fetch(
        `${_BASE_URL}/api/payment/confirmEFT?orderid=${orderID}&payment_method=${payment_method}&payment_code=${payment_code}`,
        {
          cache: 'no-store',
          headers: headers,
          method: 'POST',
        }
      );

      const response = await res.json();

      return response;
    } catch (error) {
      console.log('ERROR');
      return new Error('Payment DATA ÇEKİLEMEDİ');
    }
  } else {
    return { status: 400, statusText: 'Ödeme metodu seçilmelidir.' };
  }
};

const getPayment = async (cookies, orderID) => {
  return getPaymentService(cookies, orderID);
};

const confirmOrderEft = async (
  cookies,
  orderID,
  payment_method,
  payment_code
) => {
  return confirmOrderEftService(cookies, orderID, payment_method, payment_code);
};

export { getPayment, confirmOrderEft };
