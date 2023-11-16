import { API_URL_STORE } from '@/config/apiConfig';

const getHomeService = async (pathname = '', cookies = []) => {
  if (cookies) {
    let headers = new Headers();
    cookies.map((cookie) => {
      return headers.append('Cookie', `${cookie.name}=${cookie.value}`);
    });

    try {
      const res = await fetch(`${API_URL_STORE}/${pathname}`, {
        cache: 'no-store',
        headers: headers,
      });

      const response = await res.json();

      return response;
    } catch (error) {
      console.log('Header data alınamadı');
      throw new Error(error);
    }
  }

  // try {
  //   const res = await fetch(`${API_URL_STORE}/${pathname}`, {
  //     cache: 'no-store',
  //   });

  //   return res.json();
  // } catch (error) {
  //   throw new Error(error);
  // }
};

// const getSingleAttribute = async (id) => {
//   return getAttributeService(`catalog/category/edit&category_id=${id}`);
// };

const getHeader = async (cookies) => {
  return getHomeService('common/header', cookies);
};
const getFooter = async () => {
  return getHomeService('common/footer');
};

export { getHomeService, getHeader, getFooter };
