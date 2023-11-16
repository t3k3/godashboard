import React from 'react';

import Cookies from 'universal-cookie';

const fromServer = async () => {
  // const cookies = require('next/headers').cookies;
  // const cookieList = cookies();
  // console.log(cookieList.get('default'));
};

export function useAuth() {
  const [auth, setAuth] = React.useState(null);

  const getCookiesFromClientSide = async () => {
    const cookies = new Cookies();
    const token = cookies.get('default') ?? null;
    setAuth(token);
    console.log('TOKEN: ', token);
  };

  React.useEffect(() => {
    getCookiesFromClientSide();
  }, []);

  return auth;
}

useAuth.fromServer = fromServer;
