async function isAdmin(request) {
  let headers = new Headers();

  headers.append('Cookie', `default=${request.cookies.get('default').value}`);

  headers.append(
    'Cookie',
    `PHPSESSID=${request.cookies.get('PHPSESSID').value}`
  );
  headers.append('Cookie', `language=${request.cookies.get('language').value}`);
  headers.append('Cookie', `currency=${request.cookies.get('currency').value}`);
  //   try {
  const res = await fetch(
    `http://demo.actsistem.com/api/v1/admin/index.php?route=common/login&token=${
      request.cookies.get('token').value
    }`,
    {
      cache: 'no-store',
      headers: headers,
    }
  );

  //   console.log('res.status: ', res.status);

  //   const isAdmin = await res.json();

  //   console.log('isAdmin: ', isAdmin);

  let isAdminx = false;

  if (res.status == 200) {
    isAdminx = true;
  }

  return isAdminx;
  //   } catch (error) {
  //     return error;
  //   }
}

export default isAdmin;
