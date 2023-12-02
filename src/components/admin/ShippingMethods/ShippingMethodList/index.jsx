'use client';
import { useState } from 'react';
import ShippingMethodListItem from './ShippingMethodListItem';
import EditShippingMethodModal from './EditShippingMethodModal';

function ShippingMethodList(props) {
  const [shippingMethods, setShippingMethods] = useState(props.shippingMethods);
  const [editShippingMethodModal, setEditShippingMethodModal] = useState(false);
  const [shippingMethodData, setShippingMethodData] = useState(false);

  const handleShippingMethodEdit = (shippingMethod) => {
    //const manufacturer = await getSingleManufacturer(index);
    setShippingMethodData(shippingMethod);
    setEditShippingMethodModal(true);
  };

  return (
    <div className='flex-1 bg-white text-gray-600 rounded overflow-hidden shadow-lg border'>
      {/* ADD NEW MANUFACTURER MODAL */}
      {/* {addNewManufacturerModal ? (
        <AddNewManufacturerModal
          // product={product}
          // setProduct={setProduct}
          closeModal={setAddNewManufacturerModal}
        />
      ) : null} */}

      {/* EDİT MANUFACTURER MODAL */}
      {editShippingMethodModal ? (
        <EditShippingMethodModal
          // product={product}
          // setProduct={setProduct}
          shippingMethodData={shippingMethodData}
          setShippingMethodData={setShippingMethodData}
          closeModal={setShippingMethodData}
        />
      ) : null}

      <div className='mx-4 my-2'>
        <div className=' flex justify-between h-6  text-gray-600 font-medium'>
          <span className='px-2 text-sm font-semibold'>Kargo Yöntemleri</span>
        </div>

        <div className='relative overflow-x-auto shadow-md sm:rounded-lg py-2 px-4'>
          <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  KARGO
                </th>
                <th scope='col' className='px-6 py-3'>
                  LOGO
                </th>
                <th scope='col' className='px-6 py-3'>
                  ÜCRET
                </th>
                <th scope='col' className='px-6 py-3'>
                  ÜCRETSİZ KARGO LİMİTİ
                </th>
                <th scope='col' className='px-6 py-3'>
                  DURUM
                </th>

                <th scope='col' className='px-6 py-3'></th>
              </tr>
            </thead>
            <tbody>
              {shippingMethods &&
                shippingMethods.map((shippingMethod) => {
                  return (
                    <ShippingMethodListItem
                      key={shippingMethod.ID}
                      shippingMethod={shippingMethod}
                      handleShippingMethodEdit={handleShippingMethodEdit}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ShippingMethodList;
