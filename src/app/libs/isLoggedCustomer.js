import { API_URL_STORE, _API_URL_STORE } from '@/config/apiConfig';
export async function isLoggedCustomer(nextCookies) {
  // let headers = new Headers();

  // cookies.find((cookie) => {
  //   if (cookie.name === 'SESSION_ID') {
  //     headers.append('Cookie', `${cookie.name}=${cookie.value}`);
  //   }
  // });

  const headers = new Headers();

  const sessionCookie = nextCookies.find(
    (cookie) => cookie.name === 'SESSION_ID'
  );

  if (!sessionCookie) {
    return false;
  }

  headers.append('Cookie', `${sessionCookie.name}=${sessionCookie.value}`);

  try {
    const res = await fetch(`${_API_URL_STORE}/account/isloggedcustomer`, {
      cache: 'no-store',
      headers: headers,
    });

    const val = await res.json();

    return val;
  } catch (error) {
    return error;
  }
}

export default isLoggedCustomer;
