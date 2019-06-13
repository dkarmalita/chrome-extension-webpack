import { listCrmTabsAsync, toggleBadge } from './utils';
import { store } from './store';
import { POLLING_INTERVAL, POLLING_ENABLED, MAX_POLLINGS } from '../config';

/* logger
   ------ */
const log = console.log

/* crm tabs list
   ------------- */

const crmTabs = []
const addTab = tabId => {
  crmTabs.push(tabId)
  log('tab added to list', tabId)
}
const removeTab = tabId => {
  const tabIdx = crmTabs.indexOf(tabId)
  if(tabIdx === -1){ return }
  crmTabs.splice(crmTabs.indexOf(tabId), 1)
  log('tab removed from list', tabId)
}
const tabsCount = () => crmTabs.length

/* communications
 ---------------- */

/**
 * Sends a message to tab and wait for its answer
 * @param  {int}      tabId   id of tab to communicate with
 * @param  {string}   type    type constant pf the action
 * @param  {any}      payload payload of the action
 * @return {Promise}  a promise which is resolving with the tab's answer
 */
const getTabAnswer = (tabId, type, payload) => new Promise((resolve,reject) => {
  log('INDEX',crmTabs.indexOf(tabId))
  const port = chrome.tabs.sendMessage(tabId, { type, payload }, function(response) {
    if(chrome.runtime.lastError) {
      reject('err-tab-closed');
    }
    resolve(response);
  });
})

/* polling
   ------- */

let polling = null;
let pollsCount = 0

/**
 * Get crm data from LATEST crm tab ONLY for now
 * @return {[type]} [description]
 */
const pollCrmTabs = () => {
  const tabId = crmTabs.length === 0 ? null : crmTabs[crmTabs.length - 1]
  log('Poll crm data of', tabId)
  ++pollsCount
  if(isPollingExecuted()){ disablePolling() }
  getTabAnswer(tabId, 'get-crm-id', null)
    .then( (data)=>{
      log('>> got crm data from', tabId, data)
      return data
    })
    .catch( e => {
      log(e)
      removeTab(tabId)
      if(tabsCount() === 0){
        disablePolling()
      }
    })
}

const isPollingExecuted = () => (MAX_POLLINGS && pollsCount >= MAX_POLLINGS)

const enablePolling = () => {
  if(isPollingExecuted() || polling){ return }
  polling = setInterval(pollCrmTabs, POLLING_INTERVAL)
  log('polling enabled')
}

const disablePolling = () => {
  clearInterval(polling)
  polling = null
  log('polling disabled')
}

/* popup channel
   ------------- */

/*===================================================*/

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

    // add each crm tab to list and enable polling
    case 'crm-tab-loaded':
      addTab(sender.tab.id)
      enablePolling()
      break;

// -----------

    case 'get-state':
      sendResponse(store.getState())
      break;

    case 'super-power':
      toggleBadge(request.payload);
      sendTabReq() // send 'get-crm-id' request to each found crm tab
      // getData()
      break;

    case 'panda-info': // got info from a crm page
      console.log('panda-info', request.payload, sender.tab.id );
      const { user } = request.payload
      store.setState({ user: { ...user, tabId: sender.tab.id } })
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
