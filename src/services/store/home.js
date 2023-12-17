import { API_URL_STORE, _BASE_URL } from '@/config/apiConfig';

const getHomeService = async (cookies = []) => {
  if (cookies) {
    let headers = new Headers();
    cookies.map((cookie) => {
      return headers.append('Cookie', `${cookie.name}=${cookie.value}`);
    });

    try {
      const res = await fetch(`${_BASE_URL}/api/home`, {
        cache: 'no-store',
        headers: headers,
      });

      const response = await res.json();

      return response.data;
    } catch (error) {
      console.log('Layout data alınamadı');
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

const getLayout = async (cookies) => {
  return getHomeService(cookies);
};

const getHeader = async (cookies) => {
  return getHomeService('common/header', cookies);
};
const getFooter = async () => {
  return getHomeService('common/footer');
};

export { getHomeService, getLayout, getHeader, getFooter };
