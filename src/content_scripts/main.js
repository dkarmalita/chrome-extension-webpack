// content_script

import { getUserData } from './utils';
import { sendMessage, addExtensionListener } from './messenger';
import { log } from './logger';

const sendPandeInfo = (payload) => sendMessage('panda-info', payload)

const extensionListener = ((message, sender, sendResponse) => {
  console.log('got a message', message.type)
  switch (message.type) {
    case "super-power":
      console.log('got super-power message from BG')
      sendMessage('echo', 'super-power')
      break;

    // when a content_script get such request, it parses the cookie jwt token and broadcast the result.
    case 'get-crm-id':
      // console.log('GET CRM ID REQ')
      // console.log('response', userData)
      // console.log('cb', sendResponse)
      // const userData = getUserData()
      // const { tabId } = message
      // sendPandeInfo({ userData, tabId })
      sendResponse(getUserData())
      break;

    case 'get-echo':
      console.log(`'get-echo' received`)
      sendResponse({ type: 'ECHO' })
      break;
  }
});

export default function main(){
  addExtensionListener(extensionListener)
  sendMessage('crm-tab-loaded', null) // just send the notification + tabId to the background script
  // sendPandeInfo(getUserData())
  log('context_script is loaded', { window })
}