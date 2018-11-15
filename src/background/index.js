console.log('%cColdFire v0.1.0-dev.1', "color: red; font-size:15px;", (new Date).toISOString(), chrome.runtime.id )
// extension's background apge

// Listens

var superPower = function() {
    chrome.tabs.getSelected(null, function(tab){
        chrome.tabs.sendMessage(tab.id, {type: "super-power"});
        chrome.browserAction.setBadgeText({text: "Wow!"});
    });
}

// chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
//     console.log('background got a request', request)
//     switch(request.type) {
//         case "super-power":
//             superPower();
//             break;
//     }
//     return true;
// });

// -----------------

// chrome.windows.getAll({populate:true},function(wins){
//   wins.forEach(function(win){
//     win.tabs.forEach(function(tab){
//       console.log(tab.url);
//     });
//   });
// });

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  console.log('background got a runtime request', request)
  switch(request.type) {

    // recognising different messages
    case "popup-button-clicked":
      //  ..some code..
      sendResponse({globalstatus: 'globalstatus'});
      break;
   }
});

// ---------------------

console.log('%cbackground script loaded', 'background: #222; color: #bada55')
// extension's background apge
