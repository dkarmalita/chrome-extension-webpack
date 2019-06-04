// content_script

import { getCookie, parseJwt } from './utils';

const getUserData = () => parseJwt(getCookie('jwt-token')) // returns null on errors

const broadcastInfo = (userData, tabId=null) =>
  chrome.extension.sendMessage({ // send message to background
      type: 'panda-info',
      payload: { userData, tabId },
  });

const sendInfo = (payload) =>
  chrome.extension.sendMessage({ // send message to background
      type: 'panda-info',
      payload,
  });

// import './styles.css'
// NOTE: these styles will be applied to the target page.

window.cflog = ( m, ...x ) => console.log(`%cColdFire %c${m}`, 'background: #222; color: firebrick;', 'background: #222; color: #bada55', ...x )

chrome.extension.onMessage.addListener(function (message, sender, sendResponse) {
  console.log('got a message', message.type)
  switch (message.type) {
    case "super-power":
      console.log('got super-power message from BG')
      chrome.extension.sendMessage({ // send message to background
          type: "echo",
          payload: 'super-power',
      });
      break;

    // when a content_script get such request, it parses the cookie jwt token and broadcast the result.
    case 'get-crm-id':
      console.log('GET CRM ID REQ')
      const userData = getUserData()
      console.log('response', userData)
      console.log('cb', sendResponse)
      broadcastInfo(userData, message.tabId)
      // sendResponse(userData)
      break;

    case 'get-echo':
      console.log(`'get-echo' received`)
      sendResponse({ type: 'ECHO' })
      break;
  }
});

window.onload = function(){
  sendInfo(getUserData())
  cflog('context_script is loaded')
  cflog('onload happens', { window })
}

