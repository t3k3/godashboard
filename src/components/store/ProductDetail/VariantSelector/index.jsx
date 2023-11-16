'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';

function toSeoUrl(text) {
  var trMap = {
    çÇ: 'c',
    ğĞ: 'g',
    şŞ: 's',
    üÜ: 'u',
    ıİ: 'i',
    öÖ: 'o',
  };
  for (var key in trMap) {
    text = text.replace(new RegExp('[' + key + ']', 'g'), trMap[key]);
  }
  return text
    .toString() // Convert to string
    .replace(/[^-a-zA-Z0-9\s]+/gi, '') // remove non-alphanumeric chars
    .replace(/\s/gi, '-') // convert spaces to dashes
    .replace(/[-]+/gi, '-') // trim repeated dashes
    .normalize('NFD') // Change diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove illegal characters
    .replace(/\s+/g, '-') // Change whitespace to dashes
    .toLowerCase() // Change to lowercase
    .replace(/&/g, '-and-') // Replace ampersand
    .replace(/[^a-z0-9\-]/g, '') // Remove anything that is not a letter, number or dash
    .replace(/-+/g, '-') // Remove duplicate dashes
    .replace(/^-*/, '') // Remove starting dashes
    .replace(/-*$/, ''); // Remove trailing dashes
}

export const createUrl = (pathname, params) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

function hasOptionValueId(optionValueId, option) {
  // product_option_value dizisindeki option_value_id'leri alalım
  const optionValueIds = option.product_option_value.map(
    (optionValue) => optionValue.option_value_id
  );

  // optionValueId, optionValueIds dizisinde bulunuyorsa true, yoksa false döndürelim
  return optionValueIds.includes(optionValueId);
}

function VariantSelector({ product }) {
  const options = product.options;
  const variants = product.variants;

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.product_option_value.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations = variants.map((variant) => ({
    id: variant.combination_id,
    availableForSale: variant.quantity,
    // Adds key / value pairs for each variant (ie. "color": "Black" and "size": 'M").
    ...variant.options.reduce(
      (accumulator, option) => ({
        ...accumulator,
        // [option.name.toLowerCase()]: option.value,
        [option.name]: option.value,
      }),
      {}
    ),
  }));

  console.log('combinations: ', combinations);

  return options.map((option) => (
    <dl className='mb-8 mt-4' key={option.option_id}>
      <dt className='mb-4 text-sm uppercase tracking-wide'>{option.name}</dt>
      <dd className='flex flex-wrap gap-3'>
        {option.product_option_value.map((value) => {
          const optionNameLowerCase = option.option_id;

          // Base option params on current params so we can preserve any other param state in the url.
          const optionSearchParams = new URLSearchParams(
            searchParams.toString()
          );

          // Update the option params using the current option to reflect how the url *would* change,
          // if the option was clicked.
          optionSearchParams.set(optionNameLowerCase, value.option_value_id);
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
                  option.option_id == key && hasOptionValueId(value, option)
                //   option.product_option_value.includes(value)
              )
          );

          const isAvailableForSale = combinations.find((combination) =>
            filtered.every(
              ([key, value]) =>
                combination[key] == value && combination.availableForSale > 0
            )
          );

          // The option is active if it's in the url params.
          const isActive =
            searchParams.get(optionNameLowerCase) === value.option_value_id;

          // You can't disable a link, so we need to render something that isn't clickable.
          const DynamicTag = isAvailableForSale ? Link : 'p';
          const dynamicProps = {
            ...(isAvailableForSale && { scroll: false }),
          };

          return (
            <DynamicTag
              key={value.option_value_id}
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
        href={`/urun${product.share}`}
        scroll={false}
        className='text-sm font-light'
      >
        x temizle
      </Link>
    </dl>
  ));
}

export default VariantSelector;
