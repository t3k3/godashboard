import { API_URL_STORE } from '@/config/apiConfig';
async function isLogged(request) {
  let headers = new Headers();

  headers.append('Cookie', `default=${request.cookies.get('default').value}`);
  headers.append(
    'Cookie',
    `PHPSESSID=${request.cookies.get('PHPSESSID').value}`
  );
  headers.append('Cookie', `language=${request.cookies.get('language').value}`);
  headers.append('Cookie', `currency=${request.cookies.get('currency').value}`);
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

export default isLogged;
