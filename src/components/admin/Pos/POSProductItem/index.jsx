// POSProductItem bileşeni
function POSProductItem({ product, posAddToCart }) {
  return (
    <div
      role='button'
      className='select-none cursor-pointer transition-shadow overflow-hidden rounded-2xl bg-white shadow hover:shadow-lg text-gray-800'
      onClick={() => posAddToCart(product)}
    >
      <img
        src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
        alt={product.name}
      />
      <div className='flex pb-3 px-3 text-sm -mt-3'>
        <p className='flex-grow truncate mr-1'>{product.name}</p>
        <p className='nowrap font-semibold'>{product.price}</p>
      </div>
    </div>
  );
}

export default POSProductItem;
