import { useState, useEffect, useCallback } from 'react';
import { RadioGroup } from '@headlessui/react';

export default function SelectShipping({
  shipping_options,
  haldeShippingSelect,
}) {
  const [selected, setSelected] = useState(shipping_options[0]);

  useEffect(() => {
    haldeShippingSelect(selected);
  }, [selected]);

  return (
    <div className='w-full px-4 py-2'>
      <div className='mx-auto w-full max-w-md'>
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className='sr-only'>Server size</RadioGroup.Label>
          <div className='space-y-2'>
            {shipping_options.map((plan, index) => {
              return (
                <RadioGroup.Option
                  key={index}
                  value={plan}
                  className={({ active, checked }) =>
                    `${
                      active
                        ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                        : ''
                    }
                  ${
                    checked ? 'bg-sky-800 bg-opacity-75 text-white' : 'bg-white'
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className='flex w-full items-center justify-between'>
                        <div className='flex items-center'>
                          <div className='text-lg'>
                            <RadioGroup.Label
                              as='p'
                              className={`font-medium  ${
                                checked ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {plan.name}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as='span'
                              className={`inline ${
                                checked ? 'text-sky-100' : 'text-gray-500'
                              }`}
                            >
                              <span>{plan.estimated_time}</span>{' '}
                              <span aria-hidden='true'>&middot;</span>{' '}
                              <span className=' text-lg font-semibold'>
                                {`+ ${plan.price} TL`}
                              </span>
                            </RadioGroup.Description>
                          </div>
                        </div>
                        {checked && (
                          <div className='shrink-0 text-white'>
                            <CheckIcon className='h-6 w-6' />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              );
            })}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg viewBox='0 0 24 24' fill='none' {...props}>
      <circle cx={12} cy={12} r={12} fill='#fff' opacity='0.2' />
      <path
        d='M7 13l3 3 7-7'
        stroke='#fff'
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
