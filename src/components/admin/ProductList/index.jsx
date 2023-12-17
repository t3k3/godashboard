'use client';
import { useState } from 'react';
import ProductListItem from './ProductListItem';
import AddNewProductModal from './AddNewProductModal';
import { deleteProduct, getFilteredProducts } from '@/services/product';

function ProductList(props) {
  var totalProducts = 20;

  const [products, setProducts] = useState(props.products);
  const [addNewProductModal, setAddNewProductModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState({
    name: 'Ürün Adı',
    filter: 'name',
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

    const response = await getFilteredProducts(filterObject);

    if (response.status === 200) {
      setProducts(response?.products);
      setSelectedProducts([]);
    } else {
      console.log('Error! Filtre uygulanamadı.');
    }
  };

  const categories = [
    { name: 'Ürün Adı', filter: 'name' },
    { name: 'Ürün Kodu', filter: 'code' },
    // { name: 'Ürün Fiyatı', filter: 'price' },
    // { name: 'Ürün Adedi', filter: 'quantity' },
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
      const allProductIds = products.map((product) => product.ID);
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

      {products.length === 0 ? (
        'Ürün Bulunamadı'
      ) : (
        <>
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
                      key={product.ID}
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
        </>
      )}
    </div>
  );
}

export default ProductList;
