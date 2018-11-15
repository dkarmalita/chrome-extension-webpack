// https://www.raymondcamden.com/2012/07/15/How-to-add-a-panel-to-Chrome-Dev-Tools

window.onload = function(){
  alert('devtool is loaded!')
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   chrome.runtime.sendMessage({type: "devtool"});
  // });

  var backgroundPageConnection = chrome.runtime.connect({
      name: "mccdlklbgfjdckfegpllmijepifnhilc"
  });

  backgroundPageConnection.onMessage.addListener(function (message) {
      // Handle responses from the background page, if any
  });

  // Relay the tab ID to the background page
  chrome.runtime.sendMessage({
      tabId: chrome.devtools.inspectedWindow.tabId,
      scriptToInject: "content_script.js"
  });
}



chrome.devtools.panels.create(
  "ColdFire",
  "coldfusion10.png",
  "panel.html",
  function(panel) {
    // var devtools_connection = chrome.runtime.connect({name: 'kcbkpnaijopamohahimgbkdocedinoib'});
    // devtools_connection.postMessage({msg: 'some message'})
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //   chrome.runtime.sendMessage({type: "start-tron", tabid:tabs[0].id});
    // });
    console.log("devtool index callback", (new Date).toISOString());
  }
);

