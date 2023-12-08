import { _BASE_URL } from '@/config/apiConfig';

const getSettingsService = async (query = '') => {
  // const nextCookies = cookies();
  // console.log('token: ', nextCookies.get('token').value);

  let headers = new Headers();

  // headers.append('Cookie', `default=${nextCookies.get('default').value}`);

  // headers.append('Cookie', `PHPSESSID=${nextCookies.get('PHPSESSID').value}`);
  // headers.append('Cookie', `language=${nextCookies.get('language').value}`);
  // headers.append('Cookie', `currency=${nextCookies.get('currency').value}`);

  try {
    const res = await fetch(`${_BASE_URL}/api/admin/settings`, {
      cache: 'no-store',
      headers: headers,
    });
    return res.json();
  } catch (error) {
    throw new Error(error);
  }
};

const putSettingsService = async (data) => {
  const res = await fetch(`${_BASE_URL}/api/admin/settings`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    console.log('ERROR: settings.js service');
    throw new Error(error);
  }

  const resData = await res.json();

  return resData;
};

const getSettings = async () => {
  return getSettingsService();
};

const editSettings = async (data) => {
  return putSettingsService(data);
};

export { getSettingsService, getSettings, editSettings };
