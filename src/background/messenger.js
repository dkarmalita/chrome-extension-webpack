// import { listCrmTabsAsync, toggleBadge } from './utils';
// import { store } from './store';
import { setBadge } from '../common/chrome-utils';
import { getUserBonus } from './api';
import { POLLING_INTERVAL, POLLING_ENABLED, MAX_POLLINGS } from '../config';

/* logger
   ------ */
const log = console.log

/* badge management
   ---------------- */

export const toggleBadge = (state) => {
  setBadge(state ? 'Wow!' : '');
}

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
    .then( data => {
      return getUserBonus(data.user.id)
    })
    .then( data => {
      sendToPopup('user-id-update', data.data )
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
  if( polling || !POLLING_ENABLED ){ return }
  pollsCount = 0;
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

let _port = null // !null while the popup is open

const sendToPopup = (type, payload) => {
  if( !_port ){ return }
  _port.postMessage({ type, payload })
  if(chrome.runtime.lastError) { _port = null }
}

const listenPopup = msg => {
    console.log('PORT_MESSAGE', msg)
}

chrome.runtime.onConnect.addListener(function(port) {
  console.log('ON_CONNECT HAPPENS', port)
  _port = port
  _port.onMessage.addListener(listenPopup);
  _port.onDisconnect.addListener(function() {
    _port = null
  });
});

/* extension wide events listener
   ------------------------------ */

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  // console.log(`got message`, request.type)
  switch(request.type) {

    // add each crm tab to list and enable polling
    case 'crm-tab-loaded':
      addTab(sender.tab.id)
      enablePolling()
      break;

    // toggle 'Wow' badge
    case 'super-power':
      toggleBadge(request.payload);
      break;
  }
  return true;
});
