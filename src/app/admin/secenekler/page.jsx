import { getOptions } from '@/services/option';
import OptionList from '@/components/admin/Options/OptionList';
import { cookies } from 'next/headers';

async function Secenekler() {
  const nextCookies = cookies();
  const secenekler = await getOptions(nextCookies);
  // console.log('SEÇENEKLER: ', secenekler);
  return secenekler && <OptionList options={secenekler.options} />;
}

export default Secenekler;
