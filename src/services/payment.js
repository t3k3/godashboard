import { BASE_URL, _BASE_URL } from '@/config/apiConfig';

const getPaymentMethodsService = async () => {
  // let headers = new Headers();
  // headers.append('Cookie', `default=${nextCookies.get('default').value}`);
  // headers.append('Cookie', `PHPSESSID=${nextCookies.get('PHPSESSID').value}`);
  // headers.append('Cookie', `language=${nextCookies.get('language').value}`);
  // headers.append('Cookie', `currency=${nextCookies.get('currency').value}`);
  // headers.append('Cookie', `token=${nextCookies.get('token').value}`);

  var requestOptions = {
    cache: 'no-store',
    method: 'GET',
    // headers: headers,
    redirect: 'follow',
  };

  try {
    const res = await fetch(`${_BASE_URL}/api/payment`, requestOptions);

    const response = await res.json();

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

async function savePaymentMethodService(payment_method) {
  var requestOptions = {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify({ payment_method: payment_method }),
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

const getSinglePaymentMethod = async (name) => {
  return getPaymentService(`extension/payment/${name}`);
};

const getPaymentMethods = async (nextCookies) => {
  return getPaymentMethodsService(nextCookies);
};

const savePaymentMethod = async () => {
  return savePaymentMethodService();
};

export {
  savePaymentMethodService,
  getSinglePaymentMethod,
  getPaymentMethods,
  savePaymentMethod,
};
