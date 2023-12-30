// POSProductItem bileşeni
import Image from 'next/image';

function POSProductItem({ product, posAddToCart }) {
  console.log('product: 22222: ', product);

  return (
    <div
      role='button'
      className='relative select-none cursor-pointer transition-shadow overflow-hidden rounded-2xl bg-white shadow hover:shadow-lg text-gray-800'
      onClick={() => posAddToCart(product)}
    >
      <Image
        src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
        alt={product.name}
        width={250}
        height={250}
      />

      <div className='absolute top-0 right-0 px-2 py-1 bg-red-400 border-2 text-white text-xs font-semibold rounded-2xl'>
        {product.quantity}
      </div>

      {product.etiketler?.map((etiket, index) => (
        <div
          key={index}
          className='absolute top-0 left-0 px-2 py-1 bg-blue-400 border-2 text-white text-xs font-semibold rounded-2xl'
          style={{ top: `${index * 24}px` }} // Her etiket için top değerini artır
        >
          {etiket}
        </div>
      ))}

      <div className='flex pb-3 px-3 text-sm '>
        <p className='flex-grow truncate mr-1'>{product.name}</p>
        <p className='nowrap font-semibold'>
          ₺
          {product.price.toLocaleString('tr-TR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
    </div>
  );
}

export default POSProductItem;
