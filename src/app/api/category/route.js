import { API_URL_ADMIN, _API_URL_STORE } from '@/config/apiConfig';

export async function GET(req, res) {
  const categoryKeyword = req.nextUrl.searchParams.get('keyword');

  const response = await fetch(
    `${_API_URL_STORE}/categories/${categoryKeyword}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    }
  );
  console.log('response.status !== 200', response.status);

  if (response.status !== 200) {
    return new Response(
      JSON.stringify({
        status: 404,
        error: 'Not Found',
      })
    );
  }

  const result = await response.json();
  return new Response(
    JSON.stringify({
      status: 200,
      products: result,
    })
  );
}
