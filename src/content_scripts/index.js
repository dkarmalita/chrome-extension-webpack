// import './styles.css'
// NOTE: these styles will be applied to the target page.

window.cflog = ( m, ...x ) => console.log(`%cColdFire %c${m}`, 'background: #222; color: firebrick;', 'background: #222; color: #bada55', ...x )


chrome.extension.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.type) {
    case "super-power":
      console.log('got super-power message from BG')
      chrome.extension.sendMessage({ // send message to background
          type: "echo",
          payload: 'super-power',
      });
      break;
  }
});

window.onload = function(){
    cflog('context_script is loaded')
    cflog('onload happens', { window })
}

console.log(document.cookie)