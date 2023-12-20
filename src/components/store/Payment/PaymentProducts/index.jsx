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
          <div
            key={index}
            className=' border my-2 border-gray-200 p-5 gap-5 md:items-center justify-between'
          >
            <div className='f grid grid-cols-2'>
              <div className='sm:max-w-[150px]'>
                <Image
                  className='w-24 h-24 rounded-full object-cover'
                  src={
                    product?.thumb ||
                    'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
                  }
                  alt={product.name}
                  width={54}
                  height={54}
                />
              </div>
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
                  ₺{product.total.toFixed(2)}
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
