'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';

export const createUrl = (pathname, params) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

function hasOptionValueId(optionValueName, option) {
  // console.log('optionValueName: ', optionValueName);
  // console.log('option: ', option);

  // product_option_values dizisindeki optionValueName'leri alalım
  const optionValueNames = option.product_option_values.map(
    (optionValue) => optionValue.name
  );
  // console.log('optionValueNames: ', optionValueNames);

  // optionValueName, optionValueNames dizisinde bulunuyorsa true, yoksa false döndürelim
  return optionValueNames.includes(optionValueName);
}

function VariantSelector({ product }) {
  console.log('PRODUCT 000111: ', product);
  const options = product.product_options;
  const variants = product.product_combinations;

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.product_option_values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations = variants.map((variant) => ({
    id: variant.ID,
    availableForSale: variant.quantity > 0 && variant.status,
    options: variant.options.reduce(
      (acc, option) => ({
        ...acc,
        [option.name]: option.value,
      }),
      {}
    ),
  }));

  return options.map((option) => (
    <dl className='mb-8 mt-4' key={option.optionId}>
      <dt className='mb-4 text-sm uppercase tracking-wide'>{option.name}</dt>
      <dd className='flex flex-wrap gap-3'>
        {option.product_option_values.map((value) => {
          const optionNameLowerCase = option.name;

          // Base option params on current params so we can preserve any other param state in the url.
          const optionSearchParams = new URLSearchParams(
            searchParams.toString()
          );

          // Update the option params using the current option to reflect how the url *would* change,
          // if the option was clicked.
          optionSearchParams.set(optionNameLowerCase, value.name);
          const optionUrl = createUrl(pathname, optionSearchParams);

          // In order to determine if an option is available for sale, we need to:
          //
          // 1. Filter out all other param state
          // 2. Filter out invalid options
          // 3. Check if the option combination is available for sale
          //
          // This is the "magic" that will cross check possible variant combinations and preemptively
          // disable combinations that are not available. For example, if the color gray is only available in size medium,
          // then all other sizes should be disabled.

          const filtered = Array.from(optionSearchParams.entries()).filter(
            ([key, value]) =>
              options.find(
                (option) =>
                  option.name == key && hasOptionValueId(value, option)
                //   option.product_option_value.includes(value)
              )
          );

          const isAvailableForSale = combinations.some((combination) =>
            filtered.every(
              ([key, value]) =>
                combination.options[key] === value &&
                combination.availableForSale
            )
          );

          // The option is active if it's in the url params.
          const isActive = searchParams.get(optionNameLowerCase) === value.name;

          // You can't disable a link, so we need to render something that isn't clickable.
          const DynamicTag = isAvailableForSale ? Link : 'p';
          const dynamicProps = {
            ...(isAvailableForSale && { scroll: false }),
          };

          return (
            <DynamicTag
              key={value.optionValueId}
              aria-disabled={!isAvailableForSale}
              href={optionUrl}
              title={`${option.name} ${value.name}${
                !isAvailableForSale ? ' (Stokta Yok)' : ''
              }`}
              className={clsx(
                'flex min-w-[48px] items-center justify-center rounded border bg-white px-4 py-4 text-lg ',
                {
                  'cursor-default ring-2 ring-blue-600': isActive,
                  'ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600 ':
                    !isActive && isAvailableForSale,
                  'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform ':
                    !isAvailableForSale,
                }
              )}
              {...dynamicProps}
            >
              {value.name}
            </DynamicTag>
          );
        })}
      </dd>
      {/* x temizle seçilenleri temizler*/}
      <Link
        href={`/urun/${product.keyword}`}
        scroll={false}
        className='text-sm font-light'
      >
        x temizle
      </Link>
    </dl>
  ));
}

export default VariantSelector;
