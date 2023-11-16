import SettingsComp from '@/components/admin/SettingsComp';
import { getSettings } from '@/services/settings';

export const metadata = {
  title: 'Ayarlar',
};

async function Settings() {
  const settings = await getSettings();
  return settings && <SettingsComp settings={settings} />;
}

export default Settings;
