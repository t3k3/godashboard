import axios from 'axios';
import { API_URL_ADMIN } from '@/config/apiConfig';

export async function GET(req, res) {
  const response = await fetch(`${API_URL_ADMIN}catalog/category`, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  return response;
}

export async function POST(request) {
  console.log('POST ISTEK GELDİ');
  const data = await request.json();

  try {
    const url = `${API_URL_ADMIN}catalog/category/add`;
    const headers = { 'Content-Type': 'multipart/form-data' };
    const response = await axios.post(url, data, { headers });

    return new Response(
      JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        data: response.data,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
      })
    );
  }

  // console.log('RES: ', res);
}
