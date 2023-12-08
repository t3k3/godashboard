import ManufacturerList from '@/components/admin/Manufacturers/ManufacturerList';
import { getManufacturers } from '@/services/manufacturer';
import { cookies } from 'next/headers';

async function Manufacturer() {
  const nextCookies = cookies();
  const { manufacturers } = await getManufacturers(nextCookies);

  return (
    manufacturers && (
      <ManufacturerList
        manufacturers={manufacturers}
        // manufacturer_total={manufacturers.manufacturer_total}
      />
    )
  );
}

export default Manufacturer;
