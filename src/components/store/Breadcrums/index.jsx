import React from 'react';
import Link from 'next/link';

function Breadcrums({ breadcrumbs }) {
  return (
    <div className='container py-4 flex items-center gap-3'>
      {breadcrumbs?.map((breadcrumb, index) => {
        return (
          <>
            {index == 0 ? (
              <Link
                href={breadcrumb?.href}
                className='text-primary text-base flex space-x-2'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                  />
                </svg>

                <p className='text-primary text-base font-medium'>
                  {breadcrumb?.text}
                </p>
              </Link>
            ) : index > 0 ? (
              <>
                <span key={breadcrumb?.text} className='text-sm text-gray-400'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M8.25 4.5l7.5 7.5-7.5 7.5'
                    />
                  </svg>
                </span>
                {index !== breadcrumbs?.length - 1 ? (
                  <Link href={`/kategori${breadcrumb.href}`} className=''>
                    <p className='text-primary text-base font-medium'>
                      {breadcrumb?.text}
                    </p>
                  </Link>
                ) : (
                  <>
                    <p className='text-base font-medium'>{breadcrumb.text}</p>
                  </>
                )}
              </>
            ) : null}
          </>
        );
      })}
    </div>
  );
}

export default Breadcrums;
