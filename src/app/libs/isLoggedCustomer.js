import { _API_URL_STORE } from '@/config/apiConfig';
export async function isLoggedCustomer(nextCookies) {
  const headers = new Headers();

  // console.log('nextCookies 55556666: ', nextCookies);

  const sessionCookie = nextCookies.find(
    (cookie) => cookie.name === 'SESSION_ID'
  );

  if (!sessionCookie) {
    return false;
  }
  // if (!nextCookies.cookies.has('SESSION_ID')) {
  //   return false;
  // }
  // const sessionCookie = nextCookies.cookies.get('SESSION_ID');

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