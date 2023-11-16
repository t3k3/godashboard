import cities from '../../../../../../public/cities.json';

function CustomerAddressEditModalItem(props) {
  const handleChange = (e, id) => {
    props.setCustomer((prev) => {
      return {
        ...prev,
        addresses: {
          ...prev.addresses,
          [id]: { ...prev.addresses[id], [e.target.name]: e.target.value },
        },
      };
    });
  };

  return (
    <div
      key={props.address.address_id}
      className='border-4 border-dashed border-separate p-4 mb-4'
    >
      <h3 className='mb-4 text-xl font-bold'>Adres {props.id}</h3>
      <div className='flex flex-wrap -mx-3 mb-2'>
        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-city'
          >
            MÜŞTERİ ADI
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            name='firstname'
            type='text'
            value={props.address?.firstname || ''}
            onChange={(e) => {
              handleChange(e, props.id);
            }}
          />
        </div>

        <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-zip'
          >
            MÜŞTERİ SOYADI
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            name='lastname'
            type='text'
            value={props.address?.lastname || ''}
            onChange={(e) => {
              handleChange(e, props.id);
            }}
          />
        </div>
      </div>
      <div className='flex flex-wrap -mx-3 '>
        <div className='w-full px-3 mb-6 md:mb-0'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-first-name'
          >
            ADRES
          </label>
          <input
            value={props.address?.address_1 || ''}
            className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            name='address_1'
            type='text'
            onChange={(e) => {
              handleChange(e, props.id);
            }}
          />
        </div>
      </div>

      <div className='flex flex-wrap -mx-3 mb-2'>
        <div className='w-full md:w-1/4 px-3 mb-6 md:mb-0'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-zip'
          >
            ÜLKE
          </label>

          <div className='relative'>
            <select
              className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-state'
              name='country'
              value={props.address?.country}
              onChange={(e) => {
                handleChange(e, props.id);
              }}
              disabled
            >
              <option value={'215'}>Türkiye</option>
            </select>
            {/* <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div> */}
          </div>
        </div>

        <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-zip'
          >
            ŞEHİR
          </label>
          <div className='relative'>
            <select
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 '
              name='zone_id'
              id='zone_id'
              value={props.address.zone_id}
              onChange={(e) => {
                handleChange(e, props.id);
              }}
            >
              {cities.zone.map((city) => {
                return (
                  <option key={city.zone_id} value={city.zone_id}>
                    {city.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className='w-full md:w-1/4 px-3 mb-6 md:mb-0'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-zip'
          >
            İLÇE / SEMT
          </label>
          <div className='relative'>
            <input
              value={props.address?.city || ''}
              className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              name='city'
              type='text'
              onChange={(e) => {
                handleChange(e, props.id);
              }}
            />
          </div>
        </div>
        <div className='w-full md:w-1/4 px-3 mb-6 md:mb-0'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='grid-zip'
          >
            POSTA KODU
          </label>
          <div className='relative'>
            <input
              value={props.address?.postcode || ''}
              className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              name='postcode'
              type='text'
              onChange={(e) => {
                handleChange(e, props.id);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerAddressEditModalItem;
