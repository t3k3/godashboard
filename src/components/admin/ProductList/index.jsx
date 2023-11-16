'use client';
import { useState } from 'react';
import axios from 'axios';
import ProductListItem from './ProductListItem';
import AddNewProductModal from './AddNewProductModal';
import { deleteProduct, getFilteredProducts } from '@/services/product';

function ProductList(props, { totalProducts }) {
  const [products, setProducts] = useState(props.products);
  const [addNewProductModal, setAddNewProductModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState({
    name: 'Ürün Adı',
    filter: 'filter_name',
  });

  const [searchInput, setSearchInput] = useState('');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Burada arama yapılacak işlemleri gerçekleştirebilirsiniz

    let filterObject = { name: selectedCategory.filter, value: searchInput };

    console.log('filterObject:', filterObject);

    const response = await getFilteredProducts(filterObject);
    console.log('RESPONSE from PruductList: ', response);

    if (response.status === 200) {
      setProducts(response?.products?.products);
      setSelectedProducts([]);
    } else {
      console.log('Error! Filtre uygulanamdı.');
    }
  };

  const categories = [
    { name: 'Ürün Adı', filter: 'filter_name' },
    { name: 'Ürün Kodu', filter: 'filter_model' },
    { name: 'Ürün Fiyatı', filter: 'filter_price' },
    { name: 'Ürün Adedi', filter: 'filter_quantity' },
  ];

  const handleCheckboxChange = (product_id) => {
    setSelectedProducts((prev) => {
      // Eğer ürün zaten listede varsa, listeden çıkar
      if (prev.includes(product_id)) {
        return prev.filter((id) => id !== product_id);
      }
      // Eğer ürün listede yoksa, ekle
      return [...prev, product_id];
    });
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedProducts([]);
    } else {
      const allProductIds = products.map((product) => product.product_id);
      setSelectedProducts(allProductIds);
    }
    setSelectAll((prev) => !prev);
  };

  const handleDelete = async () => {
    const selected = { selected: [...selectedProducts] };

    // console.log('DELETE GÖNDERİLEN DATA: ', selected);

    const response = await deleteProduct(selected);

    if (response.status === 200) {
      setProducts(response?.data?.products);
      setSelectedProducts([]);
    } else {
      console.log('Error! Ürün silinemedi.');
    }
  };

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg py-2 px-4'>
      {/* ADD NEW PRODUCT MODAL */}
      {addNewProductModal ? (
        <AddNewProductModal
          // product={product}
          // setProduct={setProduct}
          closeModal={setAddNewProductModal}
        />
      ) : null}
      <div className='flex items-center py-4 bg-white '>
        <div>
          <span className='font-extralight mr-2'>
            {selectedProducts.length} Oğe seçildi
          </span>
          <button
            className={`inline-flex mr-4 items-center text-gray-500 bg-gray-200 border border-gray-300 focus:outline-none ${
              selectedProducts.length == 0
                ? ''
                : 'hover:bg-red-400 hover:text-white bg-white'
            }   focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5`}
            type='button'
            disabled={selectedProducts.length == 0 ? true : false}
            onClick={() => {
              selectedProducts?.length > 0 &&
                confirm(
                  selectedProducts?.length +
                    ' adet ürün silinecek. Bu İşlem Geri Alınamaz.'
                ) &&
                handleDelete();
            }}
          >
            Seçilenleri Sil
          </button>
        </div>

        {/* SEARCH FİELD */}

        <div className='relative flex'>
          <button
            id='dropdown-button'
            onClick={toggleDropdown}
            className='flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300'
            type='button'
          >
            {selectedCategory.name}{' '}
            <svg
              className={`w-2.5 h-2.5 ml-2.5 ${
                isDropdownOpen ? 'transform rotate-180' : ''
              }`}
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 10 6'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m1 1 4 4 4-4'
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div
              id='dropdown'
              className='absolute z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44'
              style={{ top: 'calc(100% + 0.5rem)', left: 0 }}
            >
              <ul
                className='py-2 text-sm text-gray-700'
                aria-labelledby='dropdown-button'
              >
                {categories.map((category) => (
                  <li key={category.filter}>
                    <button
                      onClick={() => handleCategorySelection(category)}
                      className={`block px-4 py-2 w-full text-left ${
                        selectedCategory.filter === category.filter
                          ? 'bg-gray-100 dark:bg-gray-600 dark:text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                      }`}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className='relative w-full'>
            <label
              htmlFor='search-dropdown'
              className='mb-2 text-sm font-medium text-gray-900 sr-only'
            >
              Ara
            </label>
            <form onSubmit={handleSubmit}>
              <input
                type='search'
                id='search-dropdown'
                className='block p-2.5 w-80 z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                placeholder='Ara...'
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              <button
                type='submit'
                className='absolute top-0 right-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
              >
                <svg
                  className='w-4 h-4'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
        {/* SEARCH FİELD */}

        <button
          type='button'
          className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-3 mb-2 ml-4 mt-2 '
          onClick={() => {
            setAddNewProductModal(true);
          }}
        >
          Yeni Ürün Ekle
        </button>
      </div>

      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 '>
          <tr>
            <th scope='col' className='p-4'>
              <div className='flex items-center'>
                <input
                  id='checkbox-all-search'
                  type='checkbox'
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
                <label htmlFor='checkbox-all-search' className='sr-only'>
                  checkbox
                </label>
              </div>
            </th>
            <th scope='col' className='px-6 py-3'>
              ID
            </th>
            <th scope='col' className='px-6 py-3'>
              ÜRÜN KODU
            </th>
            <th scope='col' className='px-6 py-3'>
              RESİM
            </th>
            <th scope='col' className='px-6 py-3'>
              ÜRÜN
            </th>
            <th scope='col' className='px-6 py-3'>
              EKLENME TARİHİ
            </th>
            <th scope='col' className='px-6 py-3'>
              STOK
            </th>
            <th scope='col' className='px-6 py-3'>
              FİYAT
            </th>
            <th scope='col' className='px-6 py-3'>
              SATIŞ
            </th>
            <th scope='col' className='px-6 py-3'></th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => {
              return (
                <ProductListItem
                  key={product.product_id}
                  product={product}
                  selectedProducts={selectedProducts}
                  handleCheckboxChange={handleCheckboxChange}
                />
              );
            })}
        </tbody>
      </table>
      {/* Pagination */}
      <nav
        className='flex items-center justify-between pt-4 mb-4 px-6'
        aria-label='Table navigation'
      >
        <span className='text-sm font-normal text-gray-500'>
          <span className='font-semibold text-gray-900 '> 1-20</span> arasi{' '}
          <span className='font-semibold text-gray-900 '>
            {' '}
            Toplam {totalProducts}
          </span>
        </span>
        <ul className='inline-flex items-center -space-x-px'>
          <li>
            <a
              href='#'
              className='block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 '
            >
              <span className='sr-only'>Onceki</span>
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </a>
          </li>
          <li>
            <a
              href='#'
              className='z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
            >
              1
            </a>
          </li>
          <li>
            <a
              href='#'
              className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
            >
              2
            </a>
          </li>
          <li>
            <a
              href='#'
              className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
            >
              3
            </a>
          </li>

          <li>
            <a
              href='#'
              className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
            >
              ...
            </a>
          </li>
          <li>
            <a
              href='#'
              className='px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
            >
              100
            </a>
          </li>
          <li>
            <a
              href='#'
              className='block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 '
            >
              <span className='sr-only'>Sonraki</span>
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </a>
          </li>
        </ul>
      </nav>
      {/* Edit user modal */}
      <div
        id='editUserModal'
        tabIndex='-1'
        aria-hidden='true'
        className='fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full'
      >
        <div className='relative w-full max-w-2xl max-h-full'>
          {/* <!-- Modal content --> */}
          <form action='#' className='relative bg-white rounded-lg shadow'>
            {/* <!-- Modal header --> */}
            <div className='flex items-start justify-between p-4 border-b rounded-t'>
              <h3 className='text-xl font-semibold text-gray-900 '>
                Edit user
              </h3>
              <button
                type='button'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center '
                data-modal-hide='editUserModal'
              >
                <svg
                  aria-hidden='true'
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </button>
            </div>
            {/* Modal body */}
            <div className='p-6 space-y-6'>
              <div className='grid grid-cols-6 gap-6'>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='first-name'
                    className='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    First Name
                  </label>
                  <input
                    type='text'
                    name='first-name'
                    id='first-name'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
                    placeholder='Bonnie'
                    required=''
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='last-name'
                    className='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    Last Name
                  </label>
                  <input
                    type='text'
                    name='last-name'
                    id='last-name'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
                    placeholder='Green'
                    required=''
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
                    placeholder='example@company.com'
                    required=''
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='phone-number'
                    className='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    Phone Number
                  </label>
                  <input
                    type='number'
                    name='phone-number'
                    id='phone-number'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
                    placeholder='e.g. +(12)3456 789'
                    required=''
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='department'
                    className='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    Department
                  </label>
                  <input
                    type='text'
                    name='department'
                    id='department'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
                    placeholder='Development'
                    required=''
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='company'
                    className='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    Company
                  </label>
                  <input
                    type='number'
                    name='company'
                    id='company'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
                    placeholder='123456'
                    required=''
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='current-password'
                    className='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    Current Password
                  </label>
                  <input
                    type='password'
                    name='current-password'
                    id='current-password'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
                    placeholder='••••••••'
                    required=''
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='new-password'
                    className='block mb-2 text-sm font-medium text-gray-900 '
                  >
                    New Password
                  </label>
                  <input
                    type='password'
                    name='new-password'
                    id='new-password'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 '
                    placeholder='••••••••'
                    required=''
                  />
                </div>
              </div>
            </div>
            {/* Modal footer */}
            <div className='flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b '>
              <button
                type='submit'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
              >
                Save all
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
