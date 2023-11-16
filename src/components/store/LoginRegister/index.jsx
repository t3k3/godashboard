'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Tab } from '@headlessui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

function LoginRegister() {
  const pathname = usePathname();
  // console.log('pathname: ', pathname);

  const [registerAggrement, setRegisterAggrement] = useState(1);

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  const [registerFormData, setRegisterFormData] = useState({
    email: '',
    password: '',
    aggrement: 1,
  });

  const [errorLogin, setErrorLogin] = useState(false);
  const [errorRegister, setErrorRegister] = useState(false);

  const router = useRouter();

  const handleChangeLogin = (event) => {
    const { name, value } = event.target;
    setLoginFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleChangeRegister = (event) => {
    const { name, value } = event.target;
    setRegisterFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    var requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        email: loginFormData.email,
        password: loginFormData.password,
      }),
    };

    const response = await fetch(`/api/account/login`, requestOptions);

    const res = await response.json();

    if (res.status == 401) {
      setErrorLogin(res.error);
    }

    if (res.status == 200) {
      setErrorLogin(res.customer.name);
      router.refresh();
      // router.push('/');
    }

    console.log('RES LOGİN:', res);

    router.refresh();
  };

  const handleSubmitRegister = async (e) => {
    if (registerAggrement != 1) {
      setErrorRegister('Üyelik Koşullarını kabul etmelisiniz.');
      return;
    }
    e.preventDefault();

    var requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        email: registerFormData.email,
        password: registerFormData.password,
        agree: registerAggrement,
      }),
    };

    const response = await fetch(`/api/account/register`, requestOptions);

    const res = await response.json();

    if (res.status == 401) {
      if (res.error_warning != '') {
        setErrorRegister(res.error_warning);
      }
      if (res.error_email != '') {
        setErrorRegister(res.error_email);
      }
      if (res.error_password != '') {
        setErrorRegister(res.error_password);
      }
    }

    if (res.status == 201) {
      setErrorRegister('Başarılı!');
      router.refresh();
      // router.push('/');
    }
  };

  return (
    <div className='container py-16'>
      <div className='max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden'>
        <Tab.Group>
          <Tab.List className='flex space-x-1 rounded-xl p-1'>
            <Tab
              className={
                'w-full rounded-lg py-2.5 text-2xl bg-gray-100 font-medium leading-5 text-gray-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              }
            >
              Giriş Yap
            </Tab>
            <Tab
              className={
                'w-full rounded-lg py-2.5 text-2xl bg-gray-100 font-medium leading-5 text-primary ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              }
            >
              Üye Ol
            </Tab>
          </Tab.List>
          <Tab.Panels className='mt-2'>
            {/* LOGIN */}
            <Tab.Panel
              className={
                'rounded-xl bg-white p-3ring-white ring-opacity-60 ring-offset-2 '
              }
            >
              <h2 className='text-2xl uppercase font-medium mb-1'>Giriş Yap</h2>
              <p className='text-gray-600 mb-6 text-sm'>
                Kayıtlı üye iseniz giriş yapın
              </p>
              <form action='' method='post' onSubmit={handleSubmitLogin}>
                <div className='space-y-4'>
                  <div>
                    <label htmlFor='email' className='text-gray-600 mb-2 block'>
                      E-Posta Adresi
                    </label>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400'
                      placeholder='mail@example.com'
                      onChange={handleChangeLogin}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='password'
                      className='text-gray-600 mb-2 block'
                    >
                      Şifre
                    </label>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400'
                      placeholder='Şifre'
                      onChange={handleChangeLogin}
                    />
                  </div>
                </div>
                <div className='flex items-center justify-between mt-6'>
                  {/* <div className='flex items-center'>
                        <input
                          type='checkbox'
                          name='aggrement'
                          id='aggrement'
                          className='text-primary focus:ring-0 rounded-sm cursor-pointer'
                        />
                        <label
                          htmlFor='aggrement'
                          className='text-gray-600 ml-3 cursor-pointer'
                        >
                          Hatırla
                        </label>
                      </div> */}
                  <Link href={'#'} className='text-primary'>
                    Şifremi Unuttum
                  </Link>
                </div>
                <div className='mt-4'>
                  <button
                    type='submit'
                    className='block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium'
                    onClick={() => {
                      setErrorLogin(false);
                      handleSubmitLogin;
                    }}
                  >
                    Giriş Yap
                  </button>
                </div>
                {errorLogin && (
                  <p className='mt-2 text-sm text-red-400'>{errorLogin}</p>
                )}
              </form>

              {/* LOGIN WITH SOCIAL MEDIA */}
              <div className='mt-6 flex justify-center relative'>
                <div className='text-gray-600 uppercase px-3 bg-white z-10 relative'>
                  Sosyal hesap giriş
                </div>
                <div className='absolute left-0 top-3 w-full border-b-2 border-gray-200'></div>
              </div>

              <div className='flex flex-col sm:flex-row items-center gap-4 mt-6'>
                <button className='w-full focus:outline-none flex justify-center items-center gap-2 px-5 py-2 border-2 hover:bg-gray-50 text-gray-600 border-gray-100 rounded-md transition-colors duration-300 '>
                  <Image
                    src='/images/icons/google-logo.png'
                    alt={'google-icon'}
                    className='w-7'
                    width={60}
                    height={60}
                  />
                  <span>Google</span>
                </button>
                <button className='w-full focus:outline-none flex justify-center items-center gap-2 px-5 py-2 border-2 hover:bg-gray-50 text-gray-600 border-gray-100 rounded-md transition-colors duration-300 '>
                  <Image
                    src='/images/icons/facebook-new.png'
                    alt={'facebook-icon'}
                    className='w-7'
                    width={60}
                    height={60}
                  />
                  <span>Facebook</span>
                </button>
              </div>
            </Tab.Panel>
            {/* REGISTER */}
            <Tab.Panel
              className={
                'rounded-xl bg-white p-3ring-white ring-opacity-60 ring-offset-2 '
              }
            >
              <h2 className='text-2xl uppercase font-medium mb-1'>
                Yeni Üyelik
              </h2>
              <p className='text-gray-600 mb-6 text-sm'>
                Kayıtlı bir hesabınız yoksa üye olun
              </p>
              <form action='' method='post' onSubmit={handleSubmitRegister}>
                <div className='space-y-4'>
                  <div>
                    <label htmlFor='email' className='text-gray-600 mb-2 block'>
                      E-Posta Adresi
                    </label>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400'
                      placeholder='mail@example.com'
                      onChange={handleChangeRegister}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='password'
                      className='text-gray-600 mb-2 block'
                    >
                      Şifre
                    </label>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400'
                      placeholder='Şifre'
                      onChange={handleChangeRegister}
                    />
                  </div>
                </div>
                <div className='flex items-center justify-between mt-6'>
                  <div className='flex items-center'>
                    <input
                      type='checkbox'
                      name='aggrement'
                      id='aggrement'
                      checked={registerAggrement}
                      value={registerAggrement}
                      className='text-primary focus:ring-0 rounded-sm cursor-pointer'
                      onChange={() => {
                        registerAggrement == 0
                          ? setRegisterAggrement(1)
                          : setRegisterAggrement(0);
                      }}
                    />
                    <label
                      htmlFor='aggrement'
                      className='text-gray-600 ml-3 cursor-pointer'
                    >
                      <p>
                        Üye Ol’a basarak&nbsp;<b>Üyelik Koşulları</b>nı kabul
                        ediyorum.
                      </p>
                    </label>
                  </div>
                </div>
                <div className='mt-4'>
                  <button
                    type='submit'
                    className='block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium'
                    onClick={() => handleSubmitRegister}
                  >
                    Üye Ol
                  </button>
                </div>
                {errorRegister && (
                  <p className='mt-2 text-sm text-red-400'>{errorRegister}</p>
                )}
              </form>

              {/* LOGIN WITH SOCIAL MEDIA */}
              <div className='mt-6 flex justify-center relative'>
                <div className='text-gray-600 uppercase px-3 bg-white z-10 relative'>
                  Sosyal hesap giriş
                </div>
                <div className='absolute left-0 top-3 w-full border-b-2 border-gray-200'></div>
              </div>

              <div className='flex flex-col sm:flex-row items-center gap-4 mt-6'>
                <button className='w-full focus:outline-none flex justify-center items-center gap-2 px-5 py-2 border-2 hover:bg-gray-50 text-gray-600 border-gray-100 rounded-md transition-colors duration-300 '>
                  <Image
                    src='/images/icons/google-logo.png'
                    alt={'google-icon'}
                    className='w-7'
                    width={60}
                    height={60}
                  />
                  <span>Google</span>
                </button>
                <button className='w-full focus:outline-none flex justify-center items-center gap-2 px-5 py-2 border-2 hover:bg-gray-50 text-gray-600 border-gray-100 rounded-md transition-colors duration-300 '>
                  <Image
                    src='/images/icons/facebook-new.png'
                    alt={'facebook-icon'}
                    className='w-7'
                    width={60}
                    height={60}
                  />
                  <span>Facebook</span>
                </button>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        {pathname != '/uyelik' && (
          <div className='flex items-center justify-between mt-6'>
            <Link href={'/checkout?account=0'} className='text-primary'>
              Üye Olmadan Devam Et
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginRegister;
