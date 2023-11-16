'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// import { useAdminToken } from '@/contexts/AdminTokenContext';

function AdminLogin() {
  console.log('ADMİN LOGİN');
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  //   const token = useAdminToken();

  //   console.log('token: ', token.adminToken);

  //TODO: admin ve username bosalt
  const [adminLoginFormData, setAdminLoginFormData] = useState({
    username: 'admin',
    password: '414556/*/',
  });

  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    setIsPending(true);
    e.preventDefault();

    var requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        username: adminLoginFormData.username,
        password: adminLoginFormData.password,
      }),
    };

    const response = await fetch(`/api/admin/login`, requestOptions);

    const res = await response.json();

    if (res.status == 401) {
      //   console.log('401 geldi');
      setError(res.error);
      setIsPending(false);
    }

    if (res.status == 200) {
      //   console.log('200 geldi');
      //   token.setAdminToken(res.token);
      //   console.log('res.token: ', res.token);
      router.push('/admin');
      router.refresh();
      // setIsPending(false);
    }

    // console.log('RES LOGİN:', res);

    // router.refresh();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminLoginFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          {/* <img
            className='mx-auto h-10 w-auto'
            src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
            alt='Your Company'
          /> */}
          LOGO
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            LOGO
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form
            className='space-y-6'
            action=''
            method='post'
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor='username'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Kullanıcı Adı
              </label>
              <div className='mt-2'>
                <input
                  id='username'
                  name='username'
                  type='text'
                  value={'admin'}
                  required
                  className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Parola
                </label>
                <div className='text-sm'>
                  <a
                    href='#'
                    className='font-semibold text-indigo-600 hover:text-indigo-500'
                  ></a>
                </div>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='text'
                  value={'414556/*/'}
                  autoComplete='current-password'
                  required
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  onChange={handleChange}
                />
              </div>
            </div>
            {error && <p className='text-xl text-red-400'>{error}</p>}
            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Giriş Yap
              </button>
              {isPending && 'Giriş yapılıyor...'}
            </div>
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Üyeliğiniz yok mu?{' '}
            <a
              href='#'
              className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
            >
              14 Gün deneme üyeliğini başlat
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
