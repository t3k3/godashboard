import React, { useState, useEffect } from 'react';

function PaymentResponseHTML({ soapResponse }) {
  const [iframeSrc, setIframeSrc] = useState('');

  useEffect(() => {
    const htmlContent = decodeURIComponent(soapResponse);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setIframeSrc(url);

    // URL'yi temizlemek için
    return () => URL.revokeObjectURL(url);
  }, [soapResponse]);

  return (
    <div>
      <iframe
        src={iframeSrc}
        style={{
          width: '100%',
          height: '50%',
          border: 'none',
          zIndex: 9999,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'white',
        }}
        title='Payment Response'
      />
    </div>
  );
}

export default PaymentResponseHTML;
