function PaymentOkButtonDesktop({ totals, payment, handleSubmit, warning }) {
  return (
    <div className='lg:block hidden lg:col-span-4 xl:col-span-3 border-l pl-8 border-dashed max-lg:fixed max-lg:bottom-0 max-lg:min-w-screen'>
      <div className='border border-gray-200 p-5 rounded sticky top-12 max-h-screen'>
        <h3 className='text-lg mb-4 text-gray-800 font-semibold uppercase'>
          ÖDENECEK TUTAR
        </h3>
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <p className='font-medium'>Ara Toplam:</p>
            <p className='font-medium'>
              {totals.sub_total.toLocaleString('tr-TR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{' '}
              TL
            </p>
          </div>
          <div className='flex items-center justify-between'>
            <p className='font-medium'>KDV (%{totals.vat_rate}) </p>
            <p className='font-medium'>
              {totals.vat.toLocaleString('tr-TR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{' '}
              TL
            </p>
          </div>
          <div className='flex items-center justify-between'>
            <p className='font-medium'>Kargo Ücreti</p>
            <p className='font-medium'>
              {totals.shipping.toLocaleString('tr-TR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{' '}
              TL
            </p>
          </div>
          {/* {totals.fee && totals.fee > 0 && (
            <div className='flex items-center justify-between'>
              <p className='font-medium'>Vade Farkı</p>
              <p className='font-medium'>
                {totals.fee.toLocaleString('tr-TR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                TL
              </p>
            </div>
          )} */}
        </div>

        <h2 className='mt-4 pt-4 text-2xl font-semibold border-t border-gray-200 flex items-center justify-between'>
          <span>Toplam:</span>
          <span>
            {totals?.total?.toLocaleString('tr-TR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{' '}
            TL
          </span>
        </h2>

        <button
          className={`${
            payment.order.payment_method == '' && 'disabled:opacity-75'
          } focus:outline-none mt-8 uppercase font-medium rounded border border-primary w-full py-2 flex items-center justify-center space-x-2 bg-primary text-white hover:text-primary hover:bg-transparent transition`}
          disabled={payment.payment_method == ''}
          onClick={handleSubmit}
        >
          SİPARİŞİ TAMAMLA
        </button>
        {warning &&
          payment.order.payment_method == 1 &&
          payment.order.payment_code == 0 && (
            <span className='text-sm text-red-400'>Banka seçmediniz.</span>
          )}
      </div>
    </div>
  );
}

export default PaymentOkButtonDesktop;
