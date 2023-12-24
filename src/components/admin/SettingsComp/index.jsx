'use client';
import React, { useState } from 'react';
import axios from 'axios';
import cities from '/public/cities.json';
import Image from 'next/image';
import { editSettings } from '@/services/settings';

function SettingsComp(props) {
  const [settings, setSettings] = useState(props.settings);
  const [isUpdate, setIsUpdate] = useState(false);
  const [success, setSuccess] = useState(false);

  // const [logoImage, setLogoImage] = useState(props.settings?.logo);

  // const handleChange = (e) => {
  //   console.log('name: ', e.target.name);
  //   console.log('value: ', e.target.value);
  //   setProduct((prev) => {
  //     return {
  //       ...prev,
  //       product_description: {
  //         5: {
  //           ...prev.product_description[5],
  //           [e.target.name]: e.target.value,
  //         },
  //       },
  //       [e.target.name]: e.target.value,
  //     };
  //   });
  // };

  const handleChange = (e) => {
    setSettings((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    setSuccess(false);
    setIsUpdate(true);
    // Prevent the default submit and page reload
    e.preventDefault();

    // const response = await editProduct(product, product.urunId);
    const response = await editSettings(settings);

    if (response.status === 200) {
      setSettings(response.data);
      setSuccess(true);
    }
    setIsUpdate(false);
  };

  const onFileChange = (e, config_image) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const images = Array.from(e.target.files);

    handleFileUpload(images, e.target.name, config_image);
  };

  const handleFileUpload = (newFiles, name, config_image) => {
    //setIsLoading(true);
    const formData = new FormData();
    newFiles.forEach((file, index) => {
      formData.append(`file[${index}]`, file);
      //formData.append(`file[]`, file);
    });

    // console.log('formData:', formData);
    // Handle validations
    axios({
      method: 'post',
      mode: 'no-cors',
      url: `http://demo.actsistem.com/api/v1/admin/index.php?route=catalog/product/uploader`,
      //url: `http://demo.actsistem.com/upload.php?directory=react_resim`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((response) => {
        console.log(response);
        setImage(response.data[0], name, config_image);
        //setIsLoading(false);
        // Handle response
      })
      .catch((error) => {
        console.error(error);
        //setIsLoading(false);
        // Handle error
      });
  };

  const setImage = (imageURL, name, config_image) => {
    setSettings((prev) => ({
      ...prev,
      [name]: imageURL.thumb,
      [config_image]: imageURL.image,
    }));
  };

  //   useEffect(() => {
  //     async function getOrderProductsHandle() {
  //       const orderProducts = await getOrderProducts(product.urunId);
  //       setOrderProductState(orderProducts);
  //     }
  //     getOrderProductsHandle();
  //   }, [product]);

  // useEffect(() => {
  //   // This effect will run after each state update

  //   console.log('Product has been updated:', product);
  // }, [product]);

  // TODO: TITLE
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   document.title = product?.product_description[5]?.name;
  // });

  return (
    <div className=''>
      {/* PRODUCT DATA EDIT MODAL */}
      {/* {productDataEditModal ? (
        <ProductDataEditModal
          product={product}
          setProduct={setProduct}
          closeModal={setProductDataEditModal}
        />
      ) : null} */}

      {/* Top Nav */}
      <div className='flex items-center justify-between py-2'>
        <div className='sm:flex sm:items-center mx-4'>
          <h2 className='text-lg font-medium text-gray-900'>Ayarlar</h2>
          <div className='sm:ml-6 flex items-center sm:mt-0 mt-1'>
            <h1 className='text-lg font-medium text-gray-900'>#AYAR1</h1>
          </div>
        </div>

        <div className='ml-8 flex-shrink-0 flex items-center'>
          <button className='ml-4 pl-2 pr-2 mr-1 py-1 rounded-md flex items-center text-sm font-medium border '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-4 h-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z'
              />
            </svg>
          </button>
          <button className='ml-1 pl-2 pr-2 mr-4 py-1 rounded-md flex items-center text-sm font-medium border '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-4 h-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
              />
            </svg>
          </button>
        </div>
      </div>

      <form
        action=''
        method='post'
        onSubmit={handleSubmit}
        className='w-full mt-4 '
      >
        <div className='bg-gray-100'>
          <div className='flex border-b-2 border-dashed border-border-base py-5 sm:py-8 ml-4 font-semibold text-lg  pl-4 pr-8'>
            {/* Left */}
            Genel Ayarlar
          </div>

          {/* Store Images */}
          <div className='flex border-b-2 border-dashed border-border-base py-5 sm:py-8 pl-4 pr-8'>
            {/* Left */}
            <div className='w-1/3 '>
              <div className='relative overflow-x-auto px-4'>
                <div className='flex justify-between  pt-8'>
                  <h4 className='text-base font-semibold text-body-dark text-gray-600 mb-2'>
                    Mağaza Resimleri
                  </h4>
                </div>
                <p className='text-sm text-gray-500'>
                  Mağaza logo ve resimlerinizi düzenleyin
                </p>
              </div>
            </div>

            {/* Right */}
            <div className='w-2/3 '>
              <div className='mx-2 my-2 bg-white text-gray-600 rounded-lg overflow-hidden shadow-lg'>
                <div className=' border-r py-6 border-l text-sm px-8'>
                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Mağaza Logosu
                    </label>
                    <div className='flex'>
                      <Image
                        src={`/${settings?.logo}`}
                        alt='logo'
                        width={100}
                        height={100}
                        className='border'
                      ></Image>
                      <input
                        type='file'
                        name='logo'
                        multiple={false}
                        className=''
                        onChange={(e) => onFileChange(e, 'config_logo')}
                      />
                    </div>
                  </div>
                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Favicon
                    </label>
                    <div className='flex'>
                      <Image
                        src={`/${settings?.icon}`}
                        alt='favicon'
                        width={100}
                        height={100}
                        className='border'
                      ></Image>
                      <input
                        type='file'
                        name='icon'
                        multiple={false}
                        className=''
                        onChange={(e) => onFileChange(e, 'config_icon')}
                      />
                    </div>
                  </div>

                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Sayfa Üstü Banner
                    </label>
                    <div className='flex'>
                      <Image
                        src={`/${settings?.header_banner}`}
                        alt='header_banner'
                        width={100}
                        height={100}
                        className='border'
                      ></Image>
                      <input
                        type='file'
                        name='headerbanner'
                        multiple={false}
                        className=''
                        onChange={(e) => onFileChange(e, 'config_headerbanner')}
                      />
                    </div>
                    <input
                      value={settings?.config_header_banner_link || ''}
                      className='appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-500'
                      name='config_headerbannerlink'
                      type='text'
                      placeholder='Sayfa Üstü Banner Linki'
                      onChange={handleChange}
                    />
                  </div>
                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Alt Blok Afiş
                    </label>
                    <div className='flex'>
                      <Image
                        src={`/${settings?.footer_banner}`}
                        alt='footer_banner'
                        width={100}
                        height={100}
                        className='border'
                      ></Image>
                      <input
                        type='file'
                        name='footerbanner'
                        multiple={false}
                        className=''
                        onChange={(e) => onFileChange(e, 'config_footerbanner')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Store Info */}
          <div className='flex border-b-2 border-dashed border-border-base py-5 sm:py-8 pl-4 pr-8'>
            {/* Left */}
            <div className='w-1/3 '>
              <div className='relative overflow-x-auto px-4'>
                <div className='flex justify-between  pt-8'>
                  <h4 className='text-base font-semibold text-body-dark text-gray-600 mb-2'>
                    Mağaza Ayarları
                  </h4>
                </div>
                <p className='text-sm text-gray-500'>
                  Genel mağaza ayarlarınızı buradan düzenleyin
                </p>
              </div>
            </div>

            {/* Right */}
            <div className='w-2/3 '>
              <div className='mx-2 my-2 bg-white text-gray-600 rounded-lg overflow-hidden shadow-lg'>
                <div className=' border-r py-6 border-l text-sm px-8'>
                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Mağaza Adı
                    </label>
                    <input
                      value={settings?.config_name || ''}
                      className='appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-500'
                      name='config_name'
                      type='text'
                      placeholder='Mağaza Adı'
                      onChange={handleChange}
                    />
                  </div>
                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Mağaza Sahibi
                    </label>
                    <input
                      value={settings?.config_owner || ''}
                      className='appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-500'
                      name='config_owner'
                      type='text'
                      placeholder='Mağaza Sahibi'
                      onChange={handleChange}
                    />
                  </div>

                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Adres
                    </label>
                    <input
                      value={settings?.config_address || ''}
                      className='appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-500'
                      name='config_address'
                      type='text'
                      placeholder='Adres'
                      onChange={handleChange}
                    />
                  </div>
                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      E-Mail
                    </label>
                    <input
                      value={settings?.config_email || ''}
                      className='appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-500'
                      name='config_email'
                      type='text'
                      placeholder='E-Mail'
                      onChange={handleChange}
                    />
                  </div>

                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Telefon
                    </label>
                    <input
                      value={settings?.config_telephone || ''}
                      className='appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-500'
                      name='config_telephone'
                      type='text'
                      placeholder='Telefon'
                      onChange={handleChange}
                    />
                  </div>

                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Gsm
                    </label>
                    <input
                      value={settings?.config_mobile || ''}
                      className='appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-500'
                      name='config_mobile'
                      type='text'
                      placeholder='GSM'
                      onChange={handleChange}
                    />
                  </div>

                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Fax
                    </label>
                    <input
                      value={settings?.config_fax || ''}
                      className='appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-500'
                      name='config_fax'
                      type='text'
                      placeholder='FAX'
                      onChange={handleChange}
                    />
                  </div>

                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Çalışma Saatleri
                    </label>
                    <input
                      value={settings?.config_open || ''}
                      className='appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-500'
                      name='config_open'
                      type='text'
                      placeholder='Çalışma Saatleri'
                      onChange={handleChange}
                    />
                  </div>
                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Açıklama
                    </label>
                    <input
                      value={settings?.config_comment || ''}
                      className='appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-500'
                      name='config_comment'
                      type='text'
                      placeholder='Açıklama'
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className='flex border-b-2 border-dashed border-border-base py-5 sm:py-8 pl-4 pr-8'>
            {/* Left */}
            <div className='w-1/3 '>
              <div className='relative overflow-x-auto px-4'>
                <div className='flex justify-between  pt-8'>
                  <h4 className='text-base font-semibold text-body-dark text-gray-600 mb-2'>
                    SEO
                  </h4>
                </div>
                <p className='text-sm text-gray-500'>
                  Seo ayarlarını buradan düzenleyin
                </p>
              </div>
            </div>

            {/* Right */}
            <div className='w-2/3 '>
              <div className='mx-2 my-2 bg-white text-gray-600 rounded-lg overflow-hidden shadow-lg'>
                <div className=' border-r py-6 border-l text-sm px-8'>
                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Meta Başlığı
                    </label>

                    <input
                      value={settings?.config_meta_title || ''}
                      className='appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-500'
                      name='config_meta_title'
                      type='text'
                      placeholder='Meta Başlığı'
                      onChange={handleChange}
                    />
                  </div>
                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Meta Açıklaması
                    </label>
                    <textarea
                      value={settings?.config_meta_description || ''}
                      className='appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-500'
                      rows={4}
                      name='config_meta_description'
                      type='text'
                      placeholder='Meta Açıklaması'
                      onChange={handleChange}
                    />
                  </div>

                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Meta Kelimeleri
                    </label>
                    <input
                      value={settings?.config_meta_keyword || ''}
                      className='appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-500'
                      name='config_meta_keyword'
                      type='text'
                      placeholder='Meta Kelimeleri'
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LOCALİZATİONS */}
          <div className='flex border-b-2 border-dashed border-border-base py-5 sm:py-8 pl-4 pr-8'>
            {/* Left */}
            <div className='w-1/3 '>
              <div className='relative overflow-x-auto px-4'>
                <div className='flex justify-between  pt-8'>
                  <h4 className='text-base font-semibold text-body-dark text-gray-600 mb-2'>
                    Yerelleştirme
                  </h4>
                </div>
                <p className='text-sm text-gray-500'>
                  Mağazanın bölgesel ayarlarını düzenleyin
                </p>
              </div>
            </div>

            {/* Right */}
            <div className='w-2/3 '>
              <div className='mx-2 my-2 bg-white text-gray-600 rounded-lg overflow-hidden shadow-lg'>
                <div className=' border-r py-6 border-l text-sm px-8'>
                  <div className='mb-4'>
                    {/* <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Ülke
                    </label>
                    
                    <input
                      value={settings?.config_country_id || ''}
                      className='appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-500'
                      name='config_country_id'
                      type='text'
                      placeholder='Ülke'
                      onChange={handleChange}
                    /> */}

                    <label
                      htmlFor='config_country_id'
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2 '
                    >
                      Ülke Seçiniz
                    </label>
                    <select
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 '
                      name='config_country_id'
                      id='config_country_id'
                      disabled
                    >
                      {/* {settings?.config_country_id ? (
                        <option value={settings?.config_country_id}>
                          {
                            settings?.countries.find(
                              (country) =>
                                country.country_id ===
                                settings?.config_country_id
                            ).name
                          }
                        </option>
                      ) : (
                        <option selected>Seçiniz</option>
                      )} */}
                      <option value={'215'}>Türkiye</option>

                      {/* {settings?.countries?.map((country) => {
                        return (
                          <option
                            key={country.country_id}
                            value={country.country_id}
                          >
                            {country.name}
                          </option>
                        );
                      })} */}
                    </select>
                  </div>

                  <label
                    htmlFor='config_zone_id'
                    className='block tracking-wide text-gray-700 text-sm font-bold mb-2 '
                  >
                    Şehir Seçiniz
                  </label>
                  <select
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 '
                    name='config_zone_id'
                    id='config_zone_id'
                    value={settings?.config_zone_id}
                    onChange={handleChange}
                  >
                    {/* {settings?.config_zone_id ? (
                      <option value={settings?.config_zone_id}>
                        {cities.zone.find(
                          (city) => city.zone_id == settings?.config_zone_id
                        ).name || ''}
                      </option>
                    ) : (
                      <option selected>Seçiniz</option>
                    )} */}

                    {cities?.zone.map((city) => {
                      return (
                        <option
                          key={city.zone_id}
                          value={city.zone_id}
                          // selected={
                          //   settings?.config_zone_id == city.zone_id
                          //     ? true
                          //     : false
                          // }
                        >
                          {city.name}
                        </option>
                      );
                    })}
                  </select>

                  <div className='my-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Para Birimi
                    </label>
                    {/* {settings?.currencies[settings?.config_currency]?.name} */}
                    <input
                      value={settings?.config_currency || ''}
                      className='appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-500'
                      name='config_currency'
                      type='text'
                      placeholder='Para Birimi'
                      disabled
                      onChange={handleChange}
                    />
                  </div>

                  <div className='mb-4 hidden'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Mağaza Dili
                    </label>
                    <input
                      value={settings?.config_language || ''}
                      className='appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-500'
                      name='config_language'
                      type='text'
                      placeholder='Mağaza Dili'
                      disabled
                      onChange={handleChange}
                    />
                  </div>

                  <div className='mb-4 hidden'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Yönetim Dili
                    </label>
                    <input
                      value={settings?.config_admin_language || ''}
                      className='appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-500'
                      name='config_admin_language'
                      type='text'
                      placeholder='Yönetim Dili'
                      disabled
                      onChange={handleChange}
                    />
                  </div>

                  <div className='mb-4 hidden'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Uzunluk Birimi
                    </label>
                    {/* <input
                      value={
                        settings?.length_classes.find(
                          (length_class) =>
                            length_class.length_class_id ===
                            settings?.config_length_class_id
                        ).title || ''
                      }
                      className='appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-500'
                      name='config_length_class_id'
                      type='text'
                      placeholder='Uzunluk Birimi'
                      onChange={handleChange}
                    /> */}
                  </div>
                  <div className='mb-4 hidden'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Ağırlık Birimi
                    </label>

                    {/* <input
                      value={
                        settings?.weight_classes.find(
                          (weight_class) =>
                            weight_class.weight_class_id ===
                            settings?.config_weight_class_id
                        ).title || ''
                      }
                      className='appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-500'
                      name='config_weight_class_id'
                      type='text'
                      placeholder='Ağırlık Birimi'
                      onChange={handleChange}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PRODUCT */}
          <div className='flex border-b-2 border-dashed border-border-base py-5 sm:py-8 pl-4 pr-8'>
            {/* Left */}
            <div className='w-1/3 '>
              <div className='relative overflow-x-auto px-4'>
                <div className='flex justify-between  pt-8'>
                  <h4 className='text-base font-semibold text-body-dark text-gray-600 mb-2'>
                    Ürün
                  </h4>
                </div>
                <p className='text-sm text-gray-500'>
                  Ürün satış ayarlarını düzenleyin
                </p>
              </div>
            </div>

            {/* Right */}
            <div className='w-2/3 '>
              <div className='mx-2 my-2 bg-white text-gray-600 rounded-lg overflow-hidden shadow-lg'>
                <div className=' border-r py-6 border-l text-sm px-8'>
                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Ürün Fiyatları Misafirlerden Gizlensin Mi?
                    </label>

                    {/* <input
                      value={settings?.config_country_id || ''}
                      className='appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-500'
                      name='config_country_id'
                      type='text'
                      placeholder='Ülke'
                      onChange={handleChange}
                    /> */}

                    <select
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 '
                      name='config_customer_price'
                      id='config_customer_price'
                      value={settings?.config_customer_price}
                      onChange={handleChange}
                    >
                      <option value={0}>Hayır</option>
                      <option value={1}>Evet</option>
                    </select>
                  </div>
                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Stok Adedi Gösterilsin Mi?
                    </label>

                    <select
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 '
                      name='config_stock_display'
                      id='config_stock_display'
                      value={settings?.config_stock_display}
                      onChange={handleChange}
                    >
                      <option value={0}>Hayır</option>
                      <option value={1}>Evet</option>
                    </select>
                  </div>
                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Stok Uyarısı Gösterilsin Mi?
                    </label>

                    <select
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 '
                      name='config_stock_warning'
                      id='config_stock_warning'
                      value={settings?.config_stock_warning}
                      onChange={handleChange}
                    >
                      <option value={0}>Hayır</option>
                      <option value={1}>Evet</option>
                    </select>
                  </div>

                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Negatif Stok İle Satış Yapılsın Mi?
                    </label>
                    <select
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 '
                      name='config_stock_checkout'
                      id='config_stock_checkout'
                      value={settings?.config_stock_checkout}
                      onChange={handleChange}
                    >
                      <option value={0}>Hayır</option>
                      <option value={1}>Evet</option>
                    </select>
                  </div>

                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Kayıtlı Kullanıcılar Yorum Yapabilsin Mi?
                    </label>
                    <select
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 '
                      name='config_review_status'
                      id='config_review_status'
                      value={settings?.config_review_status}
                      onChange={handleChange}
                    >
                      <option value={0}>Hayır</option>
                      <option value={1}>Evet</option>
                    </select>
                  </div>
                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Misafirler Yorum Yapabilsin Mi?
                    </label>
                    <select
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 '
                      name='config_review_guest'
                      id='config_review_guest'
                      value={settings?.config_review_guest}
                      onChange={handleChange}
                    >
                      <option value={0}>Hayır</option>
                      <option value={1}>Evet</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STATUS */}
          <div className='flex border-b-2 border-dashed border-border-base py-5 sm:py-8 pl-4 pr-8'>
            {/* Left */}
            <div className='w-1/3 '>
              <div className='relative overflow-x-auto px-4'>
                <div className='flex justify-between  pt-8'>
                  <h4 className='text-base font-semibold text-body-dark text-gray-600 mb-2'>
                    Sipariş Durumları ve Sözleşmeler
                  </h4>
                </div>
                <p className='text-sm text-gray-500'>
                  Ürün Hareketlerinin Durumlarını ve Sözleşmeleri Düzenleyin
                </p>
              </div>
            </div>

            {/* Right */}
            <div className='w-2/3 '>
              <div className='mx-2 my-2 bg-white text-gray-600 rounded-lg overflow-hidden shadow-lg'>
                <div className=' border-r py-6 border-l text-sm px-8'>
                  {/* <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Varsayılan Yeni Sipariş Durumu
                    </label>

                    <select
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 '
                      name='config_order_status_id'
                      id='config_order_status_id'
                      value={settings?.config_order_status_id}
                      onChange={handleChange}
                    >
                      {props.statuses?.map((order_status) => {
                        return (
                          <option key={order_status.ID} value={order_status.ID}>
                            {order_status.name}
                          </option>
                        );
                      })}
                    </select>
                  </div> */}
                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Ürün İade Durumu
                    </label>

                    <select
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 '
                      name='config_return_status_id'
                      id='config_return_status_id'
                      value={settings?.config_terms_of_purchase_policy}
                      onChange={handleChange}
                    >
                      {props.statuses?.map((order_status) => {
                        return (
                          <option key={order_status.ID} value={order_status.ID}>
                            {order_status.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Satın Alma Koşulları
                    </label>

                    <textarea
                      value={settings?.config_terms_of_purchase_policy || ''}
                      name='config_terms_of_purchase_policy'
                      placeholder='Satınalma Sözleşmeniz...'
                      className='appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-500'
                      type='text'
                      onChange={handleChange}
                      rows='4'
                    ></textarea>
                  </div>

                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      İade Koşulları
                    </label>

                    <textarea
                      value={settings?.config_terms_of_return_policy || ''}
                      className='appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-500'
                      name='config_terms_of_return_policy'
                      type='text'
                      placeholder='İade Sözleşmeniz...'
                      onChange={handleChange}
                      rows='4'
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SOCIAL MEDIA */}
          <div className='flex border-b-2 border-dashed border-border-base py-5 sm:py-8 pl-4 pr-8'>
            {/* Left */}
            <div className='w-1/3 '>
              <div className='relative overflow-x-auto px-4'>
                <div className='flex justify-between  pt-8'>
                  <h4 className='text-base font-semibold text-body-dark text-gray-600 mb-2'>
                    Sosyal Medya Hesapları
                  </h4>
                </div>
                <p className='text-sm text-gray-500'>
                  Sosyal Medya Hesaplarınızı Düzenleyin
                </p>
              </div>
            </div>

            {/* Right */}
            <div className='w-2/3 '>
              <div className='mx-2 my-2 bg-white text-gray-600 rounded-lg overflow-hidden shadow-lg'>
                <div className=' border-r py-6 border-l text-sm px-8'>
                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Facebook
                    </label>

                    <input
                      value={settings?.config_facebook || ''}
                      className='appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-500'
                      name='config_facebook'
                      type='text'
                      placeholder='Facebook Linki'
                      onChange={handleChange}
                    />
                  </div>
                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Twitter
                    </label>

                    <input
                      value={settings?.config_twitter || ''}
                      className='appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-500'
                      name='config_twitter'
                      type='text'
                      placeholder='Twitter Linki'
                      onChange={handleChange}
                    />
                  </div>
                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      İnstagram
                    </label>

                    <input
                      value={settings?.config_instagram || ''}
                      className='appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-500'
                      name='config_instagram'
                      type='text'
                      placeholder='İnstagram Linki'
                      onChange={handleChange}
                    />
                  </div>

                  <div className='mb-4'>
                    <label
                      className='block tracking-wide text-gray-700 text-sm font-bold mb-2'
                      htmlFor='grid-first-name'
                    >
                      Youtube
                    </label>
                    <input
                      value={settings?.config_youtube || ''}
                      className='appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-green-500'
                      name='config_youtube'
                      type='text'
                      placeholder='Youtube Linki'
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SUBMIT */}

        <div className='bg-gray-100 px-4   sm:flex sm:flex-row-reverse sm:px-6 border-b-2 border-dashed border-border-base py-5 sm:py-8  font-semibold text-lg  pl-4 pr-8'>
          <button
            type='submit'
            disabled={isUpdate}
            className={`inline-flex w-full justify-center rounded-md px-5 py-3 mr-4 text-md font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto ${
              isUpdate ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-500'
            } `}
          >
            Ayarları Kaydet
            {isUpdate && (
              <div role='status'>
                <svg
                  aria-hidden='true'
                  className='w-5 h-5 mx-2 text-gray-200 animate-spin fill-blue-600'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentFill'
                  />
                </svg>
                <span className='sr-only'>Loading...</span>
              </div>
            )}
          </button>
          {success && (
            <div
              className='flex p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 '
              role='alert'
            >
              <svg
                aria-hidden='true'
                className='flex-shrink-0 inline w-5 h-5 mr-3'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                  clipRule='evenodd'
                ></path>
              </svg>
              <span className='sr-only'>Info</span>
              <div>
                <span className='font-medium'>Başarılı!</span> Değişikler
                başarılı bir şekilde kaydedildi.
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default SettingsComp;
