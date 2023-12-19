import React from 'react';

function GuestAddresses({
  order,
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
            <label htmlFor='firstname' className='text-gray-600 mb-2 block'>
              İsim
            </label>
            <input
              required
              type='text'
              name='firstname'
              id='firstname'
              value={order.firstname}
              onChange={handleChange}
              className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
              placeholder='İsim'
            />
          </div>
          <div className='w-full'>
            <label htmlFor='lastname' className='text-gray-600 mb-2 block'>
              Soyisim
            </label>
            <input
              required
              type='text'
              name='lastname'
              id='lastname'
              value={order.lastname}
              onChange={handleChange}
              className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
              placeholder='Soyisim'
            />
          </div>
          <div className='w-full'>
            <label htmlFor='tckn' className='text-gray-600 mb-2 block'>
              TC Kimlik No
            </label>
            <input
              required
              type='text'
              name='tckn'
              id='tckn'
              value={order.tckn}
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
              value={order.email}
              onChange={handleChange}
              className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
              placeholder='example@mail.com'
            />
          </div>
          <div className='w-full'>
            <label htmlFor='phone' className='text-gray-600 mb-2 block'>
              Telefon
            </label>
            <input
              required
              type='text'
              name='phone'
              id='phone'
              value={order.phone}
              onChange={handleChange}
              className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
              placeholder='5xx-xxx-xx-xx'
            />
          </div>
        </div>
        <div className='w-full'>
          <label
            htmlFor='shipping_address'
            className='text-gray-600 mb-2 block'
          >
            Adres
          </label>
          <textarea
            required
            type='text'
            name='shipping_address'
            id='shipping_address'
            value={order.shipping_address}
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
              value={order.shipping_country_id}
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
            value={order.country_id}
            onChange={handleChange}
            className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
            placeholder='Türkiye'
          /> */}
          </div>
          <div className='w-full'>
            <label htmlFor='shipping_city' className='text-gray-600 mb-2 block'>
              Şehir
            </label>
            <select
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 '
              name='shipping_city'
              id='shipping_city'
              value={order.shipping_city}
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
            value={order.city}
            onChange={handleChange}
            className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
            placeholder='İstanbul'
          /> */}
          </div>

          <div className='w-full'>
            <label htmlFor='shipping_ilce' className='text-gray-600 mb-2 block'>
              İlçe
            </label>
            <select
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 '
              name='shipping_ilce'
              id='shipping_ilce'
              value={order.shipping_ilce}
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
            value={order.city}
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
              value={order.shipping_postcode}
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
              <label htmlFor='company' className='text-gray-600 mb-2 block'>
                İsim / Ünvan
              </label>
              <input
                required
                type='text'
                name='company'
                id='company'
                value={order.company}
                onChange={handleChange}
                className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
                placeholder='İsim / Ünvan'
              />
            </div>
          </div>
          <div className='flex flex-col md:flex-row items-center gap-5 m-2'>
            <div className='w-full'>
              <label htmlFor='vkn' className='text-gray-600 mb-2 block'>
                Vergi No / TC Kimlik No
              </label>
              <input
                required
                type='text'
                name='vkn'
                id='vkn'
                value={order.vkn}
                onChange={handleChange}
                className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
                placeholder='1111111111'
              />
            </div>
            <div className='w-full'>
              <label htmlFor='vd' className='text-gray-600 mb-2 block'>
                Vergi Dairesi
              </label>
              <input
                type='text'
                name='vd'
                id='vd'
                value={order.vd}
                onChange={handleChange}
                className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
                placeholder='Vergi Dairesi'
              />
            </div>
          </div>
          <div className='w-full'>
            <label
              htmlFor='payment_address'
              className='text-gray-600 mb-2 block'
            >
              Adres
            </label>
            <textarea
              required
              type='text'
              name='payment_address'
              id='payment_address'
              rows='2'
              value={order.payment_address}
              onChange={handleChange}
              className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
              placeholder='Açık adres giriniz...'
            />
          </div>
          <div className='flex flex-col md:flex-row items-center gap-5 m-2'>
            <div className='w-full'>
              <label
                htmlFor='payment_country'
                className='text-gray-600 mb-2 block'
              >
                Ülke
              </label>
              <select
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 '
                name='payment_country'
                id='payment_country'
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
            value={order.country_id}
            onChange={handleChange}
            className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
            placeholder='Türkiye'
          /> */}
            </div>
            <div className='w-full'>
              <label
                htmlFor='payment_city'
                className='text-gray-600 mb-2 block'
              >
                Şehir
              </label>
              <select
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 '
                name='payment_city'
                id='payment_city'
                value={order.payment_city}
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
            value={order.city}
            onChange={handleChange}
            className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
            placeholder='İstanbul'
          /> */}
            </div>

            <div className='w-full'>
              <label
                htmlFor='payment_ilce'
                className='text-gray-600 mb-2 block'
              >
                İlçe
              </label>
              <select
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 '
                name='payment_ilce'
                id='payment_ilce'
                value={order.payment_ilce}
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
            value={order.city}
            onChange={handleChange}
            className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
            placeholder='İstanbul'
          /> */}
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
          value={order.comment}
          onChange={handleChange}
          className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-gray-500 placeholder-gray-400'
          placeholder={'Siparişinizle ilgili not girebilirsiniz.'}
        />
      </div>
    </form>
  );
}

export default GuestAddresses;
