'use client';
import { useState } from 'react';
import CartSlider from '../../Cart/CartSlider';
import { getCart } from '@/services/store/cart';
import { useRouter, usePathname } from 'next/navigation';

function BasketMenuIcon({ headerData }) {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const pathName = usePathname();
  const router = useRouter();

  const handleChange = async () => {
    if (pathName.startsWith('/checkout')) {
      router.push('/sepet');
      setOpen(false);
      return;
    }

    if (pathName.startsWith('/payment')) {
      router.push('/sepet');
      setOpen(false);
      return;
    }

    if (pathName.startsWith('/uyelik')) {
      router.push('/sepet');
      setOpen(false);
      return;
    }

    if (pathName.startsWith('/sepet')) {
      setOpen(false);
      return;
    }

    const response = await getCart();
    setCart(response.cart);

    setOpen(true);
  };

  return (
    <>
      <CartSlider cart={cart} open={open} setOpen={setOpen} />
      <div
        className='text-center text-gray-700 hover:text-primary transition relative cursor-pointer'
        onClick={handleChange}
      >
        <div className='text-2xl'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-10 h-10'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
            />
          </svg>
        </div>
        <div className='text-xs leading-3'>Sepet</div>

        <span className='absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs'>
          {headerData?.header_cart_items_count}
        </span>
      </div>
    </>
  );
}

export default BasketMenuIcon;
