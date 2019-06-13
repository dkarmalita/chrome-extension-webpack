import React from 'react';
import { store, connect } from './store'
import './App.css'

const sendTabReq = () =>
  chrome.tabs.getSelected(null, function(tab){
      chrome.tabs.sendMessage(tab.id, {type: 'get-crm-id'}, console.log);
  });

const mapStateToProps = ({state, props, setState, getState}) => {
  const { user } = state
  return { user }
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
      <h1>{`Hello ${props.user.id}`}</h1>
      <div className='buttonbar'>
        <button role="super-power" onClick={ ()=>handleOnClick(true) }>+Wow</button>
        <button role="super-power" onClick={ ()=>handleOnClick(false) }>-Wow</button>
        <button role="super-power" onClick={ ()=>sendTabReq() }>-To Tab</button>
        <button role="close-popup" onClick={ ()=>window.close() }>Close</button>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(MainView)