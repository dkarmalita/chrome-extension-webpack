import { listTabs, setBadge } from '../common/chrome-utils';

export const listCrmTabsAsync = () => listTabs([
  'http://globalitrader.ptscrm.com/*',
  'https://globalitrader.ptscrm.com/*',
  'https://itrader.ptscrm.com/*',
  'http://localhost:3000/*',
]);

export const toggleBadge = (state) => {
  setBadge(state ? 'Wow!' : '');
}
