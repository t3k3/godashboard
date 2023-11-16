'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function CartCoupon() {
  const [couponCode, setCouponCode] = useState('');
  const [response, setResponse] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (couponCode == '') {
      return;
    }

    var requestOptions = {
      method: 'PUT',
      body: JSON.stringify({
        coupon: couponCode,
      }),
    };

    const response = await fetch(`/api/cart`, requestOptions);

    const res = await response.json();

    if (res.error) {
      setResponse(res.error);
    } else setResponse(res.success);

    router.refresh();
  };

  return (
    <>
      <div className='flex items-center mt-4'>
        <input
          type='text'
          name='coupon'
          className='focus:ring-0 border-r-0 flex-1 py-2 text-sm w-full border border-gray-200 rounded-l'
          placeholder='Kupon kodu...'
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button
          className='bg-primary text-white font-medium py-2 px-3 rounded-r uppercase'
          onClick={handleSubmit}
        >
          Uygula
        </button>
      </div>
      {response && <p className='mt-2 text-sm text-red-400'>{response}</p>}
    </>
  );
}

export default CartCoupon;
