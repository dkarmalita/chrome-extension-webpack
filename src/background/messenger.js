import { listCrmTabsAsync, toggleBadge } from './utils';
import { store } from './store';

// send 'get-crm-id' request to each found crm tab
const sendTabReq = () =>
  listCrmTabsAsync().then(tabsArr =>
    tabsArr.forEach(tab => {
      console.log('crm tab found', tab.id)
      chrome.tabs.sendMessage(tab.id, {type: 'get-crm-id', tabId: tab.id});
    }))

const getData = () => chrome.tabs.getSelected(null, function(tab) {
  chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
    console.log(' HERE WE ARE ',response);
  });
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(`got message`, request.type)
  switch(request.type) {

    case 'get-state':
      sendResponse(store.getState())
      break;

    case 'super-power':
      toggleBadge(request.payload);
      sendTabReq() // send 'get-crm-id' request to each found crm tab
      // getData()
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

// const getInfoAsync = () => new Promise(resolve=>{
//   chrome.tabs.getSelected(null, (tab) => {
//     chrome.tabs.sendMessage(tab.id, {type: "get-echo"}, (...args) => {
//       resolve({ args })
//     });
//   });
// })

// getInfoAsync().then(console.log)

