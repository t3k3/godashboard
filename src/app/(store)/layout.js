import '@/app/globals.css';
import Footer from '@/components/store/Footer';
import Header from '@/components/store/Header';
import Navbar from '@/components/store/Navbar';

// import { getHeader } from '@/services/store/home';
import { getLayout } from '@/services/store/home';
// import { getFooter } from '@/services/store/home';
import { getAllCategoryList } from '@/services/store/category';
import getClientHeaders from '../libs/getHeaders';

export default async function StoreLayout({ children }) {
  const cookies = await getClientHeaders();

  const layoutData = await getLayout(cookies);

  // const headerData = await getHeader(cookies);

  // const footerData = await getFooter();

  const categoryList = await getAllCategoryList();

  return (
    layoutData && (
      <html lang='tr'>
        <body>
          <div>
            <Header headerData={layoutData.header_data} cookies={cookies} />

            <Navbar categoryList={categoryList} />
            <div>{children}</div>
            <Footer
              footerData={layoutData.footer_data}
              logo={layoutData.footer_data.footer_logo}
            />
          </div>
        </body>
      </html>
    )
  );
}
