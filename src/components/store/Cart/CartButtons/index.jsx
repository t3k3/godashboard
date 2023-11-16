import React from 'react';
import Link from 'next/link';

import AddCartButton from './AddCartButton';

function CartButtons({ product }) {
  return (
    <div>
      {/* CART BUTTON */}

      <AddCartButton product={product} />

      {/* CART BUTTON END */}
    </div>
  );
}

export default CartButtons;
