import '@/app/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang='tr'>
      <body>
        <div>
          <div className=' '>{children}</div>
        </div>
      </body>
    </html>
  );
}
