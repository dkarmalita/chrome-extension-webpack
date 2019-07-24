// background

import './messenger';

console.log('%c[POC]', "color: red; font-size:15px;", (new Date).toISOString(), chrome.runtime.id )

// listCrmTabsAsync().then((tabsArr) => {
//   tabsArr.forEach(tab => {
//     console.log('crm tab found', tab.id)
//     chrome.tabs.sendMessage(tab.id, { type: 'get-crm-id' }, console.log);
//   })
//   // console.log(tabsArr);
// })


// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log(' HEH! ',request)
//     // console.log(sender.tab ?
//     //             "from a content script:" + sender.tab.url :
//     //             "from the extension");
//     // if (request.type == 'get-echo')
//     if(sendResponse)
//       sendResponse({ farewell: "goodbye" });
//   });

// setInterval(()=>console.log('polling'), 1000)
