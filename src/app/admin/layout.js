'use client';
import Header from '@/components/admin/Header';
import '@/app/globals.css';
import { usePathname } from 'next/navigation';

// export const metadata = {
//   title: 'ADMIN',
//   description: 'Admin Layout',
// };

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  // console.log('pathname: ', pathname);

  const showHeader = pathname === '/admin/login' ? false : true;

  return (
    <html lang='tr'>
      <body>
        <div className='flex'>
          <div>{showHeader && <Header />}</div>
          <div className='w-full'>{children}</div>
        </div>
      </body>
    </html>
  );
}
