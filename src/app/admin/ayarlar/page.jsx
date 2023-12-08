import SettingsComp from '@/components/admin/SettingsComp';
import { getSettings } from '@/services/settings';
import { getOrderStatus } from '@/services/order';

export const metadata = {
  title: 'Ayarlar',
};

async function Settings() {
  const { settings } = await getSettings();
  const { statuses } = await getOrderStatus();

  return settings && <SettingsComp settings={settings} statuses={statuses} />;
  // return <SettingsComp />;
}

export default Settings;
