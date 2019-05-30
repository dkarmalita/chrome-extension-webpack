import React from 'react';
import ReactDOM from 'react-dom'

import './styles.css'

const handleOnClick = (payload) => {
  chrome.extension.sendMessage({
      type: "super-power",
      payload,
  });
}

class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        <button role="super-power" onClick={ ()=>handleOnClick(true) }>+Wow</button>
        <button role="super-power" onClick={ ()=>handleOnClick(false) }>-Wow</button>
        <button role="close-popup" onClick={ ()=>window.close() }>Close</button>
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="Taylor" />,
  document.getElementById('root')
);

// const clog = (m,...x) => {
//   chrome.extension.getBackgroundPage().console.log(`%cColdFire %c${m}`, 'background: #222; color: firebrick;', 'background: #222; color: #bada55', ...x )
// }

// window.onload = function() {

//     clog('popup is loaded', (new Date).toISOString())

//     document.getElementById("button").onclick = function() {

//         // it's sending super-power message which we are going to detect in script.js
//         chrome.extension.sendMessage({
//             type: "super-power"
//         });
//     }
// }

