function Confirm({ searchParams }) {
  return (
    <div>
      Sipariş başarıyla oluşturuldu. Sipariş numarası : {searchParams.orderid}
    </div>
  );
}

export default Confirm;
