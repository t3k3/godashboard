import '@/app/globals.css';
import Footer from '@/components/store/Footer';
import Header from '@/components/store/Header';
import Navbar from '@/components/store/Navbar';

import { getHeader } from '@/services/store/home';
import { getFooter } from '@/services/store/home';
import { getAllCategoryList } from '@/services/store/category';
import getClientHeaders from '../libs/getHeaders';

export default async function StoreLayout({ children }) {
  const cookies = await getClientHeaders();

  const headerData = await getHeader(cookies);

  const footerData = await getFooter();

  const categoryList = await getAllCategoryList();

  return (
    headerData &&
    footerData && (
      <html lang='tr'>
        <body>
          <div>
            <Header headerData={headerData} cookies={cookies} />

            <Navbar categoryList={categoryList} />
            <div>{children}</div>
            <Footer footerData={footerData} logo={headerData.logo} />
          </div>
        </body>
      </html>
    )
  );
}
