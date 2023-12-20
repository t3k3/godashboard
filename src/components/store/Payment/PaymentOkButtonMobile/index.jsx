function PaymentOkButtonMobile({ totals, payment, handleSubmit }) {
  return (
    <div className='fixed bottom-0 w-screen lg:hidden'>
      <div className='px-4 border-t border-2 border-gray-200 bg-gray-100 grid grid-cols-2 pt-2'>
        <div className='col-span-1 mx-auto'>
          <span className=' text-primary font-semibold text-xs uppercase'>
            ÖDENECEK TUTAR
          </span>
          {/* <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <p className='font-medium'>Ara Toplam:</p>
              <p className='font-medium'>{totals.sub_total.toFixed(2)} TL</p>
            </div>
            <div className='flex items-center justify-between'>
              <p className='font-medium'>KDV (%{totals.vat_rate}) </p>
              <p className='font-medium'>{totals.vat.toFixed(2)} TL</p>
            </div>
            <div className='flex items-center justify-between'>
              <p className='font-medium'>Kargo Ücreti</p>
              <p className='font-medium'>{totals.shipping.toFixed(2)} TL</p>
            </div>
          </div> */}

          <h2 className='text-xl font-sans pl-2 font-semibold items-center justify-between'>
            {totals.total.toFixed(2)} <span className='text-sm'>TL</span>
          </h2>
        </div>
        <div className='col-span-1 '>
          <button
            className={`${
              payment.payment_method == '' && 'disabled:opacity-75'
            } focus:outline-none font-medium rounded-xl border border-primary w-full py-3 flex items-center justify-center space-x-2 bg-primary text-white hover:text-primary hover:bg-transparent transition`}
            disabled={payment.payment_method == ''}
            onClick={handleSubmit}
          >
            Siparişi Tamamla
          </button>
        </div>
        {payment.payment_method == '' && (
          <span className='text-sm text-red-400'>
            Ödeme yöntemi seçmediniz.
          </span>
        )}
      </div>
    </div>
  );
}

export default PaymentOkButtonMobile;
