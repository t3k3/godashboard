import React from 'react';
import Link from 'next/link';
import ProductWrapper from '../Home/ProductWrapper';
import ImageGallery from './ImageGallery';
import VariantSelector from './VariantSelector';
import CartButtons from '../Cart/CartButtons';

function ProductDetail({ product }) {
  return (
    <>
      <div className='container grid sm:grid-cols-2 gap-16'>
        {/* PRODUCT IMAGES */}
        <ImageGallery images={product.images} />
        {/* PRODUCT CONTENT */}
        <div>
          <h2 className='text-3xl font-medium uppercase mb-2'>
            {product.name}
          </h2>
          <div className='flex items-center mb-4 '>
            <div className='flex gap-1 text-sm text-yellow-400'>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='yellow'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                  />
                </svg>
              </span>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='yellow'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                  />
                </svg>
              </span>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='yellow'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                  />
                </svg>
              </span>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='yellow'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                  />
                </svg>
              </span>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                  />
                </svg>
              </span>
            </div>
            <div className='text-xs text-gray-500 ml-3'>
              (150 Değerlendirme)
            </div>
          </div>
          <div className='space-y-2'>
            <p className='text-gray-800 font-semibold space-x-2'>
              <span>Stok:</span>
              {product.quantity > 0 ? (
                <span className='text-green-600'>Stokta Var</span>
              ) : (
                <span className='text-red-600'>Stokta Yok</span>
              )}
            </p>
            <p className='space-x-2'>
              <span className='text-gray-800 font-semibold'>Marka:</span>
              <Link href={`/marka/${product.manufacturer}`}>
                <span className='text-red-600'>{product.manufacturer}</span>
              </Link>
            </p>
            <p className='space-x-2'>
              <span className='text-gray-800 font-semibold'>Kategori:</span>
              <span className='text-gray-600'>Koltuk</span>
            </p>
            <p className='space-x-2'>
              <span className='text-gray-800 font-semibold'>Ürün Kodu:</span>
              <span className='text-gray-600'>{product.model}</span>
            </p>
          </div>

          <div className='flex items-baseline mb-1 space-x-2 font-roboto mt-4'>
            {product.special ? (
              <>
                <p className='text-2xl text-primary font-semibold'>
                  {product.special}
                </p>
                <p className='text-base text-gray-400 line-through'>
                  {product.price}
                </p>
              </>
            ) : (
              <p className='text-2xl text-primary font-semibold'>
                {product.price}
              </p>
            )}
          </div>

          <p className='mt-4 text-gray-600 hidden'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat,
            adipisci repellendus, consequuntur sit.
          </p>

          <VariantSelector product={product} />

          <CartButtons product={product} />

          {/* SOCIAL SHARE */}
          <div className='flex gap-3 mt-4'>
            <Link
              href={'#'}
              className='text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z' />
              </svg>
            </Link>
            <Link
              href={'#'}
              className='text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z' />
              </svg>
            </Link>
            <Link
              href={'#'}
              className='text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path d='M14.829 6.302c-.738-.034-.96-.04-2.829-.04s-2.09.007-2.828.04c-1.899.087-2.783.986-2.87 2.87-.033.738-.041.959-.041 2.828s.008 2.09.041 2.829c.087 1.879.967 2.783 2.87 2.87.737.033.959.041 2.828.041 1.87 0 2.091-.007 2.829-.041 1.899-.086 2.782-.988 2.87-2.87.033-.738.04-.96.04-2.829s-.007-2.09-.04-2.828c-.088-1.883-.973-2.783-2.87-2.87zm-2.829 9.293c-1.985 0-3.595-1.609-3.595-3.595 0-1.985 1.61-3.594 3.595-3.594s3.595 1.609 3.595 3.594c0 1.985-1.61 3.595-3.595 3.595zm3.737-6.491c-.464 0-.84-.376-.84-.84 0-.464.376-.84.84-.84.464 0 .84.376.84.84 0 .463-.376.84-.84.84zm-1.404 2.896c0 1.289-1.045 2.333-2.333 2.333s-2.333-1.044-2.333-2.333c0-1.289 1.045-2.333 2.333-2.333s2.333 1.044 2.333 2.333zm-2.333-12c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.958 14.886c-.115 2.545-1.532 3.955-4.071 4.072-.747.034-.986.042-2.887.042s-2.139-.008-2.886-.042c-2.544-.117-3.955-1.529-4.072-4.072-.034-.746-.042-.985-.042-2.886 0-1.901.008-2.139.042-2.886.117-2.544 1.529-3.955 4.072-4.071.747-.035.985-.043 2.886-.043s2.14.008 2.887.043c2.545.117 3.957 1.532 4.071 4.071.034.747.042.985.042 2.886 0 1.901-.008 2.14-.042 2.886z' />
              </svg>
            </Link>
          </div>
          {/* SOCIAL SHARE END */}
        </div>
      </div>
      {/* PRODUCT DETAIL */}
      <div className='container pt-16 pb-16'>
        <h3 className='border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium'>
          Ürünün Detayları
        </h3>
        <div className=' sm:w-3/5 pt-6'>
          <div className='text-gray-600 space-y-3'>
            <p>{product?.description}</p>
          </div>
          {/* ATTIBUTE TABLE */}
          {product?.attribute_groups?.length > 0 && (
            <table className='table-auto border-collapse w-full text-left text-gray-600 text-sm mt-6'>
              <tbody>
                {product?.attribute_groups?.map((attribute) => {
                  return attribute.attribute.map((attr) => {
                    return (
                      <tr key={attr.attribute_id}>
                        <th className='py-2 px-4 border border-gray-300 w-40 font-medium'>
                          {attr.name}
                        </th>
                        <td className='py-2 px-4 border border-gray-300'>
                          {attr.text}
                        </td>
                      </tr>
                    );
                  });
                })}
              </tbody>
            </table>
          )}

          {/* TABLE END */}
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <ProductWrapper wrapperName={'Benzer ürünler'} />
    </>
  );
}

export default ProductDetail;
