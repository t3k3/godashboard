import { API_URL_ADMIN } from '@/config/apiConfig';
import { cookies } from 'next/headers';

const getSettingsService = async (pathname, query = '') => {
  const nextCookies = cookies();
  // console.log('token: ', nextCookies.get('token').value);

  let headers = new Headers();

  headers.append('Cookie', `default=${nextCookies.get('default').value}`);

  headers.append('Cookie', `PHPSESSID=${nextCookies.get('PHPSESSID').value}`);
  headers.append('Cookie', `language=${nextCookies.get('language').value}`);
  headers.append('Cookie', `currency=${nextCookies.get('currency').value}`);

  try {
    const res = await fetch(
      `${API_URL_ADMIN}/${pathname}&token=${nextCookies.get('token').value}`,
      {
        cache: 'no-store',
        headers: headers,
      }
    );
    return res.json();
  } catch (error) {
    throw new Error(error);
  }
};

const getSettings = async () => {
  return getSettingsService(`setting/setting`);
};

export { getSettingsService, getSettings };
