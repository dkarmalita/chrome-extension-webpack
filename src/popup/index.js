import './styles.css'

// const logger = chrome.extension.getBackgroundPage().console.log
// const log = (...x) => logger(`%cColdFire %c${m}`, 'background: #222; color: firebrick;', 'background: #222; color: #bada55', ...x )

// Popup

const clog = (m,...x) => {
  chrome.extension.getBackgroundPage().console.log(`%cColdFire %c${m}`, 'background: #222; color: firebrick;', 'background: #222; color: #bada55', ...x )
}

window.onload = function() {

    clog('popup is loaded', (new Date).toISOString())

    document.getElementById("button").onclick = function() {

        // clog('button is clicked')
        // // it's sending super-power message which we are going to detect in script.js
        // chrome.extension.sendMessage({
        //     type: "super-power",
        //     payload: 'payload is here'
        // });

        // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //   chrome.runtime.sendMessage({type: "popup-button-clicked", tabid:tabs[0].id});
        // });

        // it's sending super-power message which we are going to detect in script.js
        chrome.extension.sendMessage({
            type: "super-power"
        });
    }
}

