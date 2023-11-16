import { API_URL_STORE } from '@/config/apiConfig';
export async function isLoggedStore(nextCookies) {
  let headers = new Headers();

  headers.append('Cookie', `default=${nextCookies.get('default').value}`);
  headers.append('Cookie', `PHPSESSID=${nextCookies.get('PHPSESSID').value}`);
  headers.append('Cookie', `language=${nextCookies.get('language').value}`);
  headers.append('Cookie', `currency=${nextCookies.get('currency').value}`);

  try {
    const res = await fetch(`${API_URL_STORE}/common/header`, {
      cache: 'no-store',
      headers: headers,
    });

    const { logged } = await res.json();

    let isLoggedx = false;

    if (logged !== null) {
      isLoggedx = true;
    }

    return isLoggedx;
  } catch (error) {
    return error;
  }
}

export default isLoggedStore;
