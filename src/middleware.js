import { NextResponse } from 'next/server';
import { getNewCookiesFromApiServer } from './services/init';

import isLogged from './app/libs/isLogged';
import isAdmin from './app/libs/isAdmin';

export async function middleware(request) {
  const response = NextResponse.next();

  if (!request.cookies.has('CART_ID')) {
    // const init = await getNewCookiesFromApiServer();
    console.log('INIT');

    // Veriyi düzgün bir JavaScript nesnesine dönüştürme işlemi
    // const parsedData = {};
    // init[0].split(', ').forEach((item) => {
    //   const [key, value] = item.split('=');
    //   parsedData[key] = value.split(';')[0];
    // });

    response.cookies.set({
      name: 'CART_ID',
      // value: parsedData.PHPSESSID,
      value: '12345',
      // httpOnly: true,
      secure: false,
      sameSite: 'strict',
    });
  }

  // if (request.nextUrl.pathname.startsWith('/hesap')) {
  //   const logged = await isLogged(request);
  //   console.log('LOGGED: ', logged);
  //   if (!logged) {
  //     return NextResponse.redirect(new URL('/uyelik', request.url));
  //   }
  //   return NextResponse.next();
  // }

  // if (request.nextUrl.pathname.startsWith('/uyelik')) {
  //   const logged = await isLogged(request);
  //   console.log('LOGGED: ', logged);
  //   if (logged) {
  //     return NextResponse.redirect(new URL('/hesap', request.url));
  //   }
  //   return NextResponse.next();
  // }

  // if (request.nextUrl.pathname.startsWith('/admin')) {
  //   //token varsa
  //   if (request.cookies.has('token')) {
  //     // sayfa /admin/login ise
  //     if (request.nextUrl.pathname.startsWith('/admin/login')) {
  //       // const admin = await isAdmin(request);
  //       const admin = true;
  //       //token gecerliyse /admin/login sayfasina sokmuyoruz
  //       if (admin) {
  //         return NextResponse.redirect(new URL('/admin', request.url));
  //       } else {
  //         return NextResponse.next();
  //       }
  //     }

  //     if (!request.nextUrl.pathname.startsWith('/admin/login')) {
  //       // const admin = await isAdmin(request);
  //       const admin = true;
  //       if (admin) {
  //         // console.log('gecerli 1');
  //         return NextResponse.next();
  //       } else {
  //         // console.log('gecersiz 1');
  //         return NextResponse.redirect(new URL('/admin/login', request.url));
  //       }
  //     }
  //   }

  //   // if (!request.nextUrl.pathname.startsWith('/admin/login')) {
  //   //   // console.log('!/admin/login 2');
  //   //   if (!request.cookies.get('token')) {
  //   //     // console.log('!/login 2');
  //   //     return NextResponse.redirect(new URL('/admin/login', request.url));
  //   //   } else {
  //   //     //token kontrol et
  //   //     const admin = await isAdmin(request);
  //   //     // console.log('admin: ', admin);
  //   //     if (admin) {
  //   //       //gecerliyse
  //   //       // dashboarda gonder
  //   //       if (request.nextUrl.pathname.startsWith('/admin/login')) {
  //   //         return NextResponse.redirect(new URL('/admin', request.url));
  //   //       }
  //   //       return NextResponse.next();
  //   //     } else {
  //   //       //gecerli degilse
  //   //       // admin/login e gonder
  //   //       return NextResponse.redirect(new URL('/admin/login', request.url));
  //   //     }
  //   //   }
  //   // }
  // }

  return response;
}
