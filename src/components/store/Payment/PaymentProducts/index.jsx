import Image from 'next/image';
import Link from 'next/link';

function PaymentProducts({ products }) {
  return (
    <>
      <h2 className='border mb-2 font-roboto text-red-600 text-center text-xl'>
        ÜRÜNLER
      </h2>

      {products?.map((product, index) => {
        return (
          // console.log('product 6666: ', product),
          <div
            key={index}
            className=' border my-2 border-gray-200 p-5 gap-5 md:items-center justify-between'
          >
            <div className='f grid grid-cols-2'>
              {/* PRODUCT IMAGE SECTION */}
              {/* <div className='relative h-24 w-24 flex-shrink-0 overflow-visible rounded-md border border-gray-200'>
                  <div className='absolute top-0 right-0 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full transform -translate-y-2 translate-x-2'>
                    {product.quantity}
                  </div>
                  <Image
                    src={
                      `/${product.thumb}` ||
                      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg'
                    }
                    alt={'product.imageAlt'}
                    width={96}
                    height={96}
                    className='h-full w-full object-center'
                  />
                </div> */}

              <div className='max-w-sm'>
                {/* <Link href={`/urun${product.href}`}> */}
                <p className='text-md block mb-2 font-medium uppercase text-gray-800'>
                  {product.name}
                </p>
                {/* </Link> */}
                {JSON.parse(product.option).map((opt) => {
                  return (
                    <div key={opt.name} className='flex space-x-2 '>
                      <p className='text-xs '>{opt.name}:</p>
                      <p key={opt} className='text-xs font-bold text-gray-900'>
                        {opt.value}
                      </p>
                    </div>
                  );
                })}
                <p className='text-xs'>Adet: {product.quantity}</p>
                <p className='text-md font-medium text-primary'>
                  ₺
                  {product.total.toLocaleString('tr-TR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default PaymentProducts;
