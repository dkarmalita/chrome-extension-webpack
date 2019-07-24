import React from 'react';
import { store, connect } from './store'
import './App.css'

// make background connection
var port = chrome.runtime.connect({name: "knockknock"});
port.postMessage({joke: "Knock knock"});
port.onMessage.addListener(function(msg) {
  console.log('POPUP_GOT_MESSAGE', msg)
  store.setState({ ...msg.payload })
  // if (msg.question == "Who's there?")
  //   port.postMessage({answer: "Madame"});
  // else if (msg.question == "Madame who?")
  //   port.postMessage({answer: "Madame... Bovary"});
});

const mapStateToProps = ({state, props, setState, getState}) => {
  console.log('STATE',state)
  const { user, bonus, currency, pw, } = state
  return {
    user,
    bonus, currency, pw,
  }
}

const handleOnClick = (payload) => {
  chrome.extension.sendMessage({
      type: "super-power",
      payload,
  });
}

const MainView = (props) => {
  console.log('App render', props)
  return (
    <div>
      <h1>{`User ${props.pw} got ${props.bonus} ${props.currency} of bonus`}</h1>
      <div className='buttonbar'>
        <button role="super-power" onClick={ ()=>handleOnClick(true) }>+Wow</button>
        <button role="super-power" onClick={ ()=>handleOnClick(false) }>-Wow</button>
        <button role="close-popup" onClick={ ()=>window.close() }>Close</button>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(MainView)
