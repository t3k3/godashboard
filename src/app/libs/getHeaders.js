import { cookies } from 'next/headers';

async function getClientHeaders() {
  const nextCookies = cookies(); // Get cookies object

  //   const token = nextCookies.get('default'); // Find cookie
  const token = nextCookies.getAll(); // Find cookie

  return token;
}

export default getClientHeaders;
