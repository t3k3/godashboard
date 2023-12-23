import React, { useEffect } from 'react';
import AddClientShippingAddressModal from './AddClientShippingAddressModal';
import AddClientPaymentAddressModal from './AddClientPaymentAddressModal';
import EditClientShippingAddressModal from './EditClientShippingAddressModal';
import EditClientPaymentAddressModal from './EditClientPaymentAddressModal';

import { useState } from 'react';
import { saveOrderAddressesForMember } from '@/services/store/checkout';
import { getCustomerAddresses } from '@/services/store/account';

function ClientAddresses(props) {
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(false);

  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [paymentAddresses, setPaymentAddresses] = useState([]);

  // console.log('selectedShippingAddress: ', selectedShippingAddress);
  // console.log('selectedPaymentMethod: ', selectedPaymentMethod);

  const [addClientShippingAddressModal, setAddClientShippingAddressModal] =
    useState(false);
  const [editClientShippingAddressModal, setEditClientShippingAddressModal] =
    useState(false);

  const [addClientPaymentAddressModal, setAddClientPaymentAddressModal] =
    useState(false);

  const [editClientPaymentAddressModal, setEditClientPaymentAddressModal] =
    useState(false);

  useEffect(() => {
    const getAddressesMethod = async () => {
      const response = await getCustomerAddresses();
      // console.log('Address data: ', response);

      if (response && response.data && response.data.length > 0) {
        const shippingAddressesTemp = response.data.filter(
          (address) => address.type === 1
        );
        setShippingAddresses(shippingAddressesTemp);

        const paymentAddressesTemp = response.data.filter(
          (address) => address.type === 2
        );
        setPaymentAddresses(paymentAddressesTemp);
      }
    };

    getAddressesMethod();
  }, []);

  console.log('shippingAddresses: ', shippingAddresses);
  console.log('paymentAddresses: ', paymentAddresses);

  const handleChange = async (address, addressType) => {
    if (addressType === 'shipping_address') {
      props.setOrder((prevOrder) => ({
        ...prevOrder,
        firstname: address.firstname,
        lastname: address.lastname,
        phone: address.phone,
        tckn: address.tckn,
        email: address.email,
        shipping_address: address.shipping_address,
        shipping_country: address.shipping_country,
        shipping_city: address.shipping_city,
        shipping_ilce: address.shipping_ilce,
        shipping_mahalle: address.shipping_mahalle,
        shipping_postcode: address.shipping_postcode,
      }));

      setSelectedShippingAddress(address);
    }

    if (addressType === 'payment_address') {
      props.setOrder((prevOrder) => ({
        ...prevOrder,
        company: address.company,
        vkn: address.vkn,
        vd: address.vd,
        payment_address: address.payment_address,
        payment_country: address.payment_country,
        payment_city: address.payment_city,
        payment_ilce: address.payment_ilce,
        payment_mahalle: address.payment_mahalle,
      }));

      setSelectedPaymentMethod(address);
    }

    console.log('VALUE: ', address);
    console.log('addressType: ', addressType);
  };

  const handleEditShipping = (address) => {
    console.log('ADDRESS Shipping: ', address);
    setSelectedShippingAddress(address);
    setEditClientShippingAddressModal(true);
  };

  const handleEditPayment = (address) => {
    console.log('ADDRESS Payment: ', address);
    setSelectedPaymentMethod(address);
    setEditClientPaymentAddressModal(true);
  };

  return (
    <div className='space-y-8'>
      {/* ADD SHIPPING ADDRESS ADD MODAL */}
      {addClientShippingAddressModal ? (
        <AddClientShippingAddressModal
          closeModal={setAddClientShippingAddressModal}
        />
      ) : null}

      {/* EDİT SHIPPING ADDRESS MODAL */}
      {editClientShippingAddressModal ? (
        <EditClientShippingAddressModal
          address={selectedShippingAddress}
          closeModal={setEditClientShippingAddressModal}
        />
      ) : null}

      {/* ADD PAYMENT ADDRESS ADD MODAL */}
      {addClientPaymentAddressModal ? (
        <AddClientPaymentAddressModal
          setPaymentAddresses={setPaymentAddresses}
          closeModal={setAddClientPaymentAddressModal}
        />
      ) : null}

      {editClientPaymentAddressModal ? (
        <EditClientPaymentAddressModal
          address={selectedPaymentMethod}
          closeModal={setEditClientPaymentAddressModal}
        />
      ) : null}

      <div className='w-full px-4 space-y-2 bg-gray-50'>
        <h2 className='border mb-2 font-roboto text-red-600 text-center text-xl'>
          Teslimat Adresi
        </h2>
        {/* Payment Methods */}
        {shippingAddresses.length > 0 ? (
          shippingAddresses.map((address, index) => {
            return (
              <div
                key={index}
                className='items-center pl-4 border border-gray-200 rounded'
              >
                <div className='flex items-center pl-2'>
                  <input
                    id={`bordered-radio-shipping-${index}`}
                    type='radio'
                    // checked={selectedPaymentMethod === payment_method.code}
                    name='shipping-method'
                    className='w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 '
                    onChange={() =>
                      handleChange(shippingAddresses[index], 'shipping_address')
                    }
                  />
                  <label
                    htmlFor={`bordered-radio-shipping-${index}`}
                    className='w-full py-4 ml-4 text-sm font-medium text-gray-900 '
                  >
                    <div className='flex space-x-4 justify-between'>
                      <div className='mt-2'>
                        <h3 className='text-base font-semibold text-heading'>
                          {address.firstname + ' ' + address.lastname}
                        </h3>
                        <div className='text-sm'>{address.phone}</div>
                        <div className='text-sm'>
                          {address.shipping_address}
                        </div>
                        <div className='text-sm'>
                          {address.shipping_ilce + ' ' + address.shipping_city}
                        </div>
                      </div>

                      <div className='pr-4'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-6 h-6  cursor-pointer text-blue-500'
                          onClick={() => handleEditShipping(address)}
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                          />
                        </svg>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            );
          })
        ) : (
          <div className='items-center text-center h-10 mx-2 text-lg text-red-400'>
            KAYITLI ADRES BULUNAMADI
          </div>
        )}
        <div
          className='border-dashed text-center border-4 mx-2 h-20 cursor-pointer hover:bg-white'
          onClick={() => setAddClientShippingAddressModal(true)}
        >
          <h2 className='text-xl my-4 mx-12 text-gray-600'>
            Yeni Teslimat Adresi Ekle{' '}
            <span className='text-2xl text-gray-600'>+</span>
          </h2>
        </div>
      </div>

      <div className='w-full px-4 space-y-2 bg-gray-50'>
        <h2 className='border mb-2 font-roboto text-red-600 text-center text-xl'>
          Fatura Adresi
        </h2>
        {/* Payment Methods */}
        {paymentAddresses.length > 0 ? (
          paymentAddresses.map((address, index) => {
            return (
              <div
                key={index}
                className='items-center pl-4 border border-gray-200 rounded'
              >
                <div className='flex items-center pl-2'>
                  <input
                    id={`bordered-radio-payment-${index}`}
                    type='radio'
                    // checked={selectedPaymentMethod === payment_method.code}
                    name='payment-method'
                    className='w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 '
                    onChange={() =>
                      handleChange(paymentAddresses[index], 'payment_address')
                    }
                  />
                  <label
                    htmlFor={`bordered-radio-payment-${index}`}
                    className='w-full py-4 ml-4 text-sm font-medium text-gray-900 '
                  >
                    <div className='flex space-x-4 justify-between'>
                      <div className='mt-2'>
                        <h3 className='text-base font-semibold text-heading'>
                          {address.company}
                        </h3>
                        <div className='text-sm'>
                          {address.vkn + ' ' + address.vd}
                        </div>
                        <div className='text-sm'>{address.payment_address}</div>
                        <div className='text-sm'>
                          {address.payment_ilce + ' ' + address.payment_city}
                        </div>
                      </div>

                      <div className='pr-4'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-6 h-6  cursor-pointer text-blue-500'
                          onClick={() => handleEditPayment(address)}
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                          />
                        </svg>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            );
          })
        ) : (
          <div className='items-center text-center h-10 mx-2 text-lg text-red-400'>
            KAYITLI ADRES BULUNAMADI
          </div>
        )}
        <div
          className='border-dashed text-center border-4 mx-2 h-20 cursor-pointer hover:bg-white'
          onClick={() => setAddClientPaymentAddressModal(true)}
        >
          <h2 className='text-xl my-4 mx-12 text-gray-600'>
            Yeni Fatura Adresi Ekle{' '}
            <span className='text-2xl text-gray-600'>+</span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default ClientAddresses;
