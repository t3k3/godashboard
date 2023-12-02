import { getOptions } from '@/services/option';
import OptionList from '@/components/admin/Options/OptionList';
import { cookies } from 'next/headers';

async function Secenekler() {
  const nextCookies = cookies();
  const { options } = await getOptions(nextCookies);

  return options && <OptionList options={options} />;
}

export default Secenekler;
