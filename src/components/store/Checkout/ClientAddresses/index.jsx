import React from 'react';
import AddClientShippingAddressModal from './AddClientShippingAddressModal';
import AddClientPaymentAddressModal from './AddClientPaymentAddressModal';
import EditClientShippingAddressModal from './EditClientShippingAddressModal';
import EditClientPaymentAddressModal from './EditClientPaymentAddressModal';

import { useState } from 'react';
import { saveOrderAddressesForMember } from '@/services/store/checkout';

function ClientAddresses({ addresses }) {
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(false);

  // console.log('selectedShippingMethod: ', selectedShippingMethod);
  // console.log('selectedPaymentMethod: ', selectedPaymentMethod);

  const [addClientShippingAddressModal, setAddClientShippingAddressModal] =
    useState(false);
  const [editClientShippingAddressModal, setEditClientShippingAddressModal] =
    useState(false);

  const [addClientPaymentAddressModal, setAddClientPaymentAddressModal] =
    useState(false);

  const [editClientPaymentAddressModal, setEditClientPaymentAddressModal] =
    useState(false);

  const shippingAddresses = addresses.filter(
    (address) => address.address_type == 0
  );

  const paymentAddresses = addresses.filter(
    (address) => address.address_type == 1
  );

  const handleChange = async (address, addressType) => {
    if (addressType == 'shipping_address') {
      setSelectedShippingMethod(address);
    }

    if (addressType == 'payment_address') {
      setSelectedPaymentMethod(address);
    }

    console.log('VALUE: ', address.address_id);
    console.log('addressType: ', addressType);

    const response = await saveOrderAddressesForMember({
      address_id: address.address_id,
      address_type: addressType,
    });

    if (response.status === 200) {
      console.log('SUCCESS: ', response.status);
    } else {
      console.log('FAİL: ', response.status);
    }
  };

  const handleEditShipping = (address) => {
    console.log('ADDRESS Shipping: ', address);
    setSelectedShippingMethod(address);
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
          address={selectedShippingMethod}
          closeModal={setEditClientShippingAddressModal}
        />
      ) : null}

      {/* ADD PAYMENT ADDRESS ADD MODAL */}
      {addClientPaymentAddressModal ? (
        <AddClientPaymentAddressModal
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
                        <div className='text-sm'>{address.telephone}</div>
                        <div className='text-sm'>{address.address_1}</div>
                        <div className='text-sm'>
                          {address.city + ' ' + address.zone}
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
                        <div className='text-sm'>{address.address_1}</div>
                        <div className='text-sm'>
                          {address.city + ' ' + address.zone}
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
