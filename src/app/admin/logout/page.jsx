import React from 'react';
import { adminLogout } from '@/services/account';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { LogoutAction } from '@/app/actions/logout';

async function Logout() {
  const nextCookies = cookies();
  const response = await adminLogout(nextCookies);
  redirect('/admin/login');

  return <div>Logout</div>;
}

export default Logout;
