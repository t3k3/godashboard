import { API_URL_STORE } from '@/config/apiConfig';

const initService = async () => {
  try {
    const res = await fetch(`${API_URL_STORE}/common/init`, {
      cache: 'no-store',
      credentials: 'include',
    });
    return res.headers.getSetCookie();
  } catch (error) {
    throw new Error(error);
  }
};

const getNewCookiesFromApiServer = async () => {
  return initService();
};

export { initService, getNewCookiesFromApiServer };
