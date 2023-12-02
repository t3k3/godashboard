'use client';
import React, { useState } from 'react';
import { UpdateProductAttributes } from '@/services/product';

function ProductAttributeEditModal({ product, setProduct, closeModal }) {
  const [attributes, setAttributes] = useState([...product.attributes]);
  const [newAttributes, setNewAttributes] = useState([]);
  const [deletedAttributeIds, setDeletedAttributeIds] = useState([]); // Silinen özellik ID'lerini saklamak için state eklendi
  const [isUpdate, setIsUpdate] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAttributeChange = (index, key, value) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index] = { ...updatedAttributes[index], [key]: value };
    setAttributes(updatedAttributes);
  };

  const handleAddNewAttribute = () => {
    setNewAttributes([...newAttributes, { name: '', value: '' }]);
  };

  const handleNewAttributeChange = (index, key, value) => {
    const updatedNewAttributes = [...newAttributes];
    updatedNewAttributes[index] = {
      ...updatedNewAttributes[index],
      [key]: value,
    };
    setNewAttributes(updatedNewAttributes);
  };

  // Özellik silme fonksiyonu
  const handleDeleteAttribute = (index) => {
    const attribute = attributes[index];
    const updatedAttributes = attributes.filter((_, i) => i !== index);
    setAttributes(updatedAttributes);
    if (attribute.ID) {
      setDeletedAttributeIds([...deletedAttributeIds, attribute.ID]); // Silinen özellik ID'lerini sakla
    }
  };

  // Yeni eklenen özellikleri silme fonksiyonu
  const handleDeleteNewAttribute = (index) => {
    const updatedNewAttributes = newAttributes.filter((_, i) => i !== index);
    setNewAttributes(updatedNewAttributes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setIsUpdate(true);

    // Mevcut, yeni ve silinen özelliklerin listelerini oluştur
    const updatedAttributes = attributes
      .filter((attr) => attr.ID) // Yalnızca ID'si olanları al, yeni eklenenlerin ID'si olmayacak
      .map((attr) => ({
        ID: attr.ID,
        Name: attr.name,
        Value: attr.value,
      }));

    // API'ye gönderilecek nesneyi oluştur
    const payload = {
      productID: product.ID,
      updatedAttributes,
      newAttributes: newAttributes.map((attr) => ({
        Name: attr.name,
        Value: attr.value,
      })),
      deletedAttributeIds,
    };

    console.log('Gönderilecek payload:', payload);

    const response = await UpdateProductAttributes(payload);

    console.log('RESPONSE123: ', response);
    if (response.status === 200) {
      setSuccess(true);
      // Burada ürünün yeni durumunu güncelleyebilirsiniz
      setProduct((prevProduct) => {
        // Mevcut ürün nesnesinin kopyasını oluştur
        const updatedProduct = { ...prevProduct };

        // Güncellenmiş özellikleri kopyaya ata
        updatedProduct.attributes = response.data;

        // Yeni kopyayı dönerek state'i güncelle
        return updatedProduct;
      });
      closeModal(false);
    }

    setIsUpdate(false);
  };

  return (
    <div className='fixed inset-0 z-10 overflow-y-auto'>
      <div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
        <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
          <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
        </div>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>

        <div
          className='inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-headline'
        >
          <form
            className='px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4'
            onSubmit={handleSubmit}
          >
            <div className='sm:flex sm:items-start'>
              <div className='w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                <h3
                  className='text-lg font-medium leading-6 text-gray-900'
                  id='modal-headline'
                >
                  Özellik Düzenle
                </h3>
                <div className='mt-2'>
                  {attributes.map((attribute, index) => (
                    <div
                      key={`attribute-${index}`}
                      className='flex items-center space-x-3'
                    >
                      <input
                        type='text'
                        className='flex-1 p-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        value={attribute.name}
                        placeholder='Özellik Adı'
                        onChange={(e) =>
                          handleAttributeChange(index, 'name', e.target.value)
                        }
                      />
                      <input
                        type='text'
                        className='flex-1 p-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        value={attribute.value}
                        placeholder='Özellik Değeri'
                        onChange={(e) =>
                          handleAttributeChange(index, 'value', e.target.value)
                        }
                      />
                      <button
                        type='button'
                        className='px-4 py-2 text-sm text-red-600 bg-red-200 border border-transparent rounded-md hover:bg-red-300 focus:outline-none focus:border-red-700 focus:ring-red active:bg-red-700 transition ease-in-out duration-150'
                        onClick={() => handleDeleteAttribute(index)}
                      >
                        Sil
                      </button>
                    </div>
                  ))}
                  {newAttributes.map((attribute, index) => (
                    <div
                      key={`new-attribute-${index}`}
                      className='flex items-center space-x-3'
                    >
                      <input
                        type='text'
                        className='flex-1 p-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        value={attribute.name}
                        placeholder='Yeni Özellik Adı'
                        onChange={(e) =>
                          handleNewAttributeChange(
                            index,
                            'name',
                            e.target.value
                          )
                        }
                      />
                      <input
                        type='text'
                        className='flex-1 p-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        value={attribute.value}
                        placeholder='Yeni Özellik Değeri'
                        onChange={(e) =>
                          handleNewAttributeChange(
                            index,
                            'value',
                            e.target.value
                          )
                        }
                      />
                      <button
                        type='button'
                        className='px-4 py-2 text-sm text-red-600 bg-red-200 border border-transparent rounded-md hover:bg-red-300 focus:outline-none focus:border-red-700 focus:ring-red active:bg-red-700 transition ease-in-out duration-150'
                        onClick={() => handleDeleteNewAttribute(index)}
                      >
                        Sil
                      </button>
                    </div>
                  ))}
                  <button
                    type='button'
                    className='px-4 py-2 mt-4 text-sm text-green-600 bg-green-200 border border-transparent rounded-md hover:bg-green-300 focus:outline-none focus:border-green-700 focus:ring-green active:bg-green-700 transition ease-in-out duration-150'
                    onClick={handleAddNewAttribute}
                  >
                    Yeni Özellik Ekle
                  </button>
                </div>
              </div>
            </div>
            <div className='px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
              <button
                type='submit'
                className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto ${
                  isUpdate ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-500'
                } `}
                disabled={isUpdate}
              >
                Güncelle
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
              <button
                type='button'
                className='inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 sm:mt-0 sm:w-auto sm:text-sm'
                onClick={() => closeModal()}
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductAttributeEditModal;
