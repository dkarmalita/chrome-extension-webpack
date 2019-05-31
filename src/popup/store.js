import { DataStore } from '../common/react-store';

const { connect, store } = new DataStore({
  user: { id: null, valid: false, loading: false }
})
const stateLogger = state=>console.log('RS >> updated state',{state})
store.subscribe(stateLogger)

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  switch(request.type) {
    case 'panda-info':
      console.log('panda-info', request.payload);
      break;
  }
  return true;
});

const setState = (payload) =>
  chrome.extension.sendMessage({
    type: "set-state",
    payload
  }, cb);

const getState = (cb) =>
  chrome.extension.sendMessage({
    type: "get-state"
  }, cb);

// init store by global values
getState((update)=>{
  console.log('update', update)
  store.setState(update)
})

export { connect, store }