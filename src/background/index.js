// background

import { DataStore } from '../common/react-store';
import { listCrmTabsAsync, toggleBadge } from './utils';
import { store } from './store';

console.log('%cColdFire v0.1.0-dev.1', "color: red; font-size:15px;", (new Date).toISOString(), chrome.runtime.id )

// send 'get-crm-id' request to each found crm tab
const sendTabReq = () =>
  listCrmTabsAsync().then(tabsArr =>
    tabsArr.forEach(tab => {
      console.log('crm tab found', tab.id)
      chrome.tabs.sendMessage(tab.id, {type: 'get-crm-id', tabId: tab.id});
    }))

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(`got message`, request.type)
  switch(request.type) {

    case 'get-state':
      sendResponse(store.getState())
      break;

    case 'super-power':
      toggleBadge(request.payload);
      sendTabReq() // send 'get-crm-id' request to each found crm tab
      break;

    case 'panda-info':
      console.log('panda-info', request.payload);
      const { user } = request.payload
      store.setState({ user })
      break;

    case 'echo':
      console.log('echo', request.payload);
      break;
  }
  return true;
});

// listCrmTabsAsync().then((tabsArr) => {
//   tabsArr.forEach(tab => {
//     console.log('crm tab found', tab.id)
//     chrome.tabs.sendMessage(tab.id, { type: 'get-crm-id' }, console.log);
//   })
//   // console.log(tabsArr);
// })

