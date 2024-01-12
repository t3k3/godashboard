import ParamPaymentSuccess from '@/components/store/Payment/ParamPaymentSuccess';

function PaymentSuccess(request) {
  console.log('request: ', request);
  return (
    <div>
      <h1>Payment Success</h1>
      <ParamPaymentSuccess />
      {/* XML verilerini burada göster */}
      {/* <pre>{data}</pre> */}
    </div>
  );
}

export default PaymentSuccess;
