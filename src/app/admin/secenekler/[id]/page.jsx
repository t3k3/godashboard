import { getSingleOption } from '@/services/option';
import OptionComp from '@/components/admin/OptionComp';

async function Secenek(props) {
  const option = await getSingleOption(props.params.id);
  console.log(option);
  return option && <OptionComp option={option} />;
}

export default Secenek;
