import React from 'react';

function GuestAddresses({
  cart,
  handleChange,
  sameAddresses,
  setSameAddresses,
  cities,
  ilceler,
}) {
  return (
    <form id='' className='space-y-5'>
      <div className='bg-gray-100'>
        <h2 className='border mb-2 font-roboto text-red-600 text-center text-xl'>
          Teslimat Adresi
        </h2>

        <div className='flex flex-col md:flex-row items-center gap-5 m-2'>
          <div className='w-full'>
            <label
              htmlFor='shipping_firstname'
              className='text-gray-600 mb-2 block'
            >
              İsim
            </label>
            <input
              required
              type='text'
              name='shipping_firstname'
              id='shipping_firstname'
              value={cart.shipping_firstname}
              onChange={handleChange}
              className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
              placeholder='İsim'
            />
          </div>
          <div className='w-full'>
            <label
              htmlFor='shipping_lastname'
              className='text-gray-600 mb-2 block'
            >
              Soyisim
            </label>
            <input
              required
              type='text'
              name='shipping_lastname'
              id='shipping_lastname'
              value={cart.shipping_lastname}
              onChange={handleChange}
              className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
              placeholder='Soyisim'
            />
          </div>
          <div className='w-full'>
            <label htmlFor='shipping_tckn' className='text-gray-600 mb-2 block'>
              TC Kimlik No
            </label>
            <input
              required
              type='text'
              name='shipping_tckn'
              id='shipping_tckn'
              value={cart.shipping_tckn}
              onChange={handleChange}
              className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
              placeholder='TC Kimlik No'
            />
          </div>
        </div>
        <div className='flex flex-col md:flex-row items-center gap-5 m-2'>
          <div className='w-full'>
            <label htmlFor='email' className='text-gray-600 mb-2 block'>
              E-Posta Adresi
            </label>
            <input
              required
              type='email'
              name='email'
              id='email'
              value={cart.email}
              onChange={handleChange}
              className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
              placeholder='example@mail.com'
            />
          </div>
          <div className='w-full'>
            <label
              htmlFor='shipping_telephone'
              className='text-gray-600 mb-2 block'
            >
              Telefon
            </label>
            <input
              required
              type='text'
              name='shipping_telephone'
              id='shipping_telephone'
              value={cart.shipping_telephone}
              onChange={handleChange}
              className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
              placeholder='5xx-xxx-xx-xx'
            />
          </div>
        </div>
        <div className='w-full'>
          <label
            htmlFor='shipping_address_1'
            className='text-gray-600 mb-2 block'
          >
            Adres
          </label>
          <textarea
            required
            type='text'
            name='shipping_address_1'
            id='shipping_address_1'
            value={cart.shipping_address_1}
            onChange={handleChange}
            rows='2'
            className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
            placeholder='Açık adres giriniz...'
          />
        </div>
        <div className='flex flex-col md:flex-row items-center gap-5 m-2'>
          <div className='w-full'>
            <label
              htmlFor='shipping_country_id'
              className='text-gray-600 mb-2 block'
            >
              Ülke
            </label>
            <select
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 '
              name='shipping_country_id'
              id='shipping_country_id'
              value={cart.shipping_country_id}
              // disabled
              onChange={handleChange}
            >
              <option value={215}>{'Türkiye'}</option>
              <option value={216}>{'Amerika'}</option>
            </select>
            {/* <input
            required
            type='text'
            name='country_id'
            id='country_id'
            value={cart.country_id}
            onChange={handleChange}
            className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
            placeholder='Türkiye'
          /> */}
          </div>
          <div className='w-full'>
            <label
              htmlFor='shipping_zone_id'
              className='text-gray-600 mb-2 block'
            >
              Şehir
            </label>
            <select
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 '
              name='shipping_zone_id'
              id='shipping_zone_id'
              value={cart.shipping_zone_id}
              onChange={handleChange}
            >
              {cities.zone.map((city) => {
                return (
                  <option key={city.zone_id} value={city.zone_id}>
                    {city.name}
                  </option>
                );
              })}
            </select>
            {/* <input
            required
            type='text'
            name='city'
            id='city'
            value={cart.city}
            onChange={handleChange}
            className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
            placeholder='İstanbul'
          /> */}
          </div>

          <div className='w-full'>
            <label htmlFor='shipping_city' className='text-gray-600 mb-2 block'>
              İlçe
            </label>
            <select
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 '
              name='shipping_city'
              id='shipping_city'
              value={cart.shipping_city}
              onChange={handleChange}
            >
              {ilceler.map((ilce) => {
                return (
                  <option key={ilce.name} value={ilce.name}>
                    {ilce.name}
                  </option>
                );
              })}
            </select>
            {/* <input
            required
            type='text'
            name='city'
            id='city'
            value={cart.city}
            onChange={handleChange}
            className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
            placeholder='İstanbul'
          /> */}
          </div>

          <div className='w-full'>
            <label
              htmlFor='shipping_postcode'
              className='text-gray-600 mb-2 block'
            >
              Posta Kodu
            </label>
            <input
              type='text'
              name='shipping_postcode'
              id='shipping_postcode'
              value={cart.shipping_postcode}
              onChange={handleChange}
              className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
              placeholder='34656'
            />
          </div>
        </div>
      </div>

      <div className='flex items-center justify-between mt-6'>
        <div className='flex items-center'>
          <input
            type='checkbox'
            name='sameAddresses'
            id='sameAddresses'
            checked={sameAddresses}
            value={sameAddresses}
            className='text-primary focus:ring-0 rounded-sm cursor-pointer'
            onChange={() => {
              sameAddresses == 0 ? setSameAddresses(1) : setSameAddresses(0);
            }}
          />
          <label
            htmlFor='sameAddresses'
            className='text-gray-600 ml-3 cursor-pointer'
          >
            <p>Teslimat adresim fatura adresimle aynı</p>
          </label>
        </div>
      </div>
      {!sameAddresses && (
        <div className='bg-gray-100'>
          <h2 className='border mb-2 font-roboto text-red-600 text-center text-xl'>
            Fatura Adresi
          </h2>

          <div className='flex flex-col md:flex-row items-center gap-5 m-2'>
            <div className='w-full'>
              <label
                htmlFor='payment_company'
                className='text-gray-600 mb-2 block'
              >
                İsim / Ünvan
              </label>
              <input
                required
                type='text'
                name='payment_company'
                id='payment_company'
                value={cart.payment_company}
                onChange={handleChange}
                className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
                placeholder='İsim / Ünvan'
              />
            </div>
          </div>
          <div className='flex flex-col md:flex-row items-center gap-5 m-2'>
            <div className='w-full'>
              <label htmlFor='payment_vkn' className='text-gray-600 mb-2 block'>
                Vergi No / TC Kimlik No
              </label>
              <input
                required
                type='text'
                name='payment_vkn'
                id='payment_vkn'
                value={cart.payment_vkn}
                onChange={handleChange}
                className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
                placeholder='1111111111'
              />
            </div>
            <div className='w-full'>
              <label htmlFor='payment_vd' className='text-gray-600 mb-2 block'>
                Vergi Dairesi
              </label>
              <input
                type='text'
                name='payment_vd'
                id='payment_vd'
                value={cart.payment_vd}
                onChange={handleChange}
                className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
                placeholder='Vergi Dairesi'
              />
            </div>
          </div>
          <div className='w-full'>
            <label
              htmlFor='payment_address_1'
              className='text-gray-600 mb-2 block'
            >
              Adres
            </label>
            <textarea
              required
              type='text'
              name='payment_address_1'
              id='payment_address_1'
              rows='2'
              value={cart.payment_address_1}
              onChange={handleChange}
              className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
              placeholder='Açık adres giriniz...'
            />
          </div>
          <div className='flex flex-col md:flex-row items-center gap-5 m-2'>
            <div className='w-full'>
              <label
                htmlFor='payment_country_id'
                className='text-gray-600 mb-2 block'
              >
                Ülke
              </label>
              <select
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 '
                name='payment_country_id'
                id='payment_country_id'
                value={'Türkiye'}
                disabled
                // onChange={handleChange}
              >
                <option key={215} value={215}>
                  {'Türkiye'}
                </option>
              </select>
              {/* <input
            required
            type='text'
            name='country_id'
            id='country_id'
            value={cart.country_id}
            onChange={handleChange}
            className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
            placeholder='Türkiye'
          /> */}
            </div>
            <div className='w-full'>
              <label
                htmlFor='payment_zone_id'
                className='text-gray-600 mb-2 block'
              >
                Şehir
              </label>
              <select
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 '
                name='payment_zone_id'
                id='payment_zone_id'
                value={cart.payment_zone_id}
                onChange={handleChange}
              >
                {cities.zone.map((city) => {
                  return (
                    <option key={city.zone_id} value={city.zone_id}>
                      {city.name}
                    </option>
                  );
                })}
              </select>
              {/* <input
            required
            type='text'
            name='city'
            id='city'
            value={cart.city}
            onChange={handleChange}
            className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
            placeholder='İstanbul'
          /> */}
            </div>

            <div className='w-full'>
              <label htmlFor='city' className='text-gray-600 mb-2 block'>
                İlçe
              </label>
              <select
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 '
                name='city'
                id='city'
                value={cart.city}
                onChange={handleChange}
              >
                {ilceler.map((ilce) => {
                  return (
                    <option key={ilce.name} value={ilce.name}>
                      {ilce.name}
                    </option>
                  );
                })}
              </select>
              {/* <input
            required
            type='text'
            name='city'
            id='city'
            value={cart.city}
            onChange={handleChange}
            className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
            placeholder='İstanbul'
          /> */}
            </div>

            <div className='w-full'>
              <label
                htmlFor='payment_postcode'
                className='text-gray-600 mb-2 block'
              >
                Posta Kodu
              </label>
              <input
                type='text'
                name='payment_postcode'
                id='payment_postcode'
                value={cart.shipping_postcode}
                onChange={handleChange}
                className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
                placeholder='34656'
              />
            </div>
          </div>
        </div>
      )}

      <div className='w-full'>
        <label htmlFor='comment' className='text-gray-600 mb-2 block'>
          <h2 className='border mb-2 font-roboto text-red-600 text-center text-xl'>
            Sipariş Notu
          </h2>
        </label>
        <textarea
          type='text'
          name='comment'
          id='comment'
          rows='2'
          value={cart.comment}
          onChange={handleChange}
          className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
          placeholder={'Siparişinizle ilgili not girebilirsiniz.'}
        />
      </div>
    </form>
  );
}

export default GuestAddresses;
