// http://demo.actsistem.com/api/v1/store/index.php?route=checkout/checkout
import { API_URL_STORE, BASE_URL } from '@/config/apiConfig';

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
    const res = await fetch(`${BASE_URL}/api/account/address`, requestOptions);

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

const saveNewAddress = async (data) => {
  return saveNewAddressService(data);
};

const editAddress = async (data) => {
  return editAddressService(data);
};

export { saveNewAddress, editAddress };
