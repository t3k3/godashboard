// http://demo.actsistem.com/api/v1/store/index.php?route=checkout/checkout
import { API_URL_STORE, BASE_URL, _BASE_URL } from '@/config/apiConfig';

async function saveNewAddressService(data) {
  console.log('DATA1: ', data);
  var requestOptions = {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify(data),
    // body: data,
    redirect: 'follow',
  };

  try {
    const res = await fetch(`${_BASE_URL}/api/account/address`, requestOptions);

    const response = await res.json();

    return response;
  } catch (error) {
    throw new Error(error);
  }
}

async function editAddressService(data) {
  console.log('DATA1: ', data);
  var requestOptions = {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify(data),
    // body: data,
    redirect: 'follow',
  };

  try {
    const res = await fetch(
      `${BASE_URL}/api/account/address/${data.address_id}`,
      requestOptions
    );

    const response = await res.json();

    return response;
  } catch (error) {
    throw new Error(error);
  }
}

async function getCustomerAddressService() {
  var requestOptions = {
    cache: 'no-store',
    method: 'GET',
    // body: JSON.stringify(data),
    redirect: 'follow',
  };

  try {
    const res = await fetch(`${_BASE_URL}/api/account/address`, requestOptions);

    const response = await res.json();

    // console.log('response 342234: ', response);

    return response;
  } catch (error) {
    throw new Error(error);
  }
}

async function loginService(data) {
  console.log('DATA1: ', data);
  var requestOptions = {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify(data),
    // body: data,
    redirect: 'follow',
  };

  try {
    const res = await fetch(`${_BASE_URL}/api/account/login`, requestOptions);

    const response = await res.json();

    return response;
  } catch (error) {
    throw new Error(error);
  }
}

async function registerService(data) {
  var requestOptions = {
    cache: 'no-store',
    method: 'POST',
    body: JSON.stringify(data),
    redirect: 'follow',
  };

  try {
    const response = await fetch(
      `${_BASE_URL}/api/account/register`,
      requestOptions
    );

    return response;
  } catch (error) {
    throw new Error(error);
  }
}

const saveNewAddress = async (data) => {
  return saveNewAddressService(data);
};

const editAddress = async (data) => {
  return editAddressService(data);
};
const getCustomerAddresses = async () => {
  return getCustomerAddressService();
};

const register = async (data) => {
  return registerService(data);
};

const login = async (data) => {
  return loginService(data);
};

export { saveNewAddress, editAddress, getCustomerAddresses, register, login };
