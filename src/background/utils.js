import { listTabs, setBadge } from '../common/chrome-utils';

export const listCrmTabsAsync = () => listTabs([
  'http://globalitrader.ptscrm.com/*',
  'https://globalitrader.ptscrm.com/*'
]);

export const toggleBadge = (state) => {
  setBadge(state ? 'Wow!' : '');
}
