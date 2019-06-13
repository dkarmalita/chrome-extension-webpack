import { DataStore } from '../common/react-store';

const { connect, store } = new DataStore({
  user: { id: null, valid: false, loading: false }
})
const stateLogger = state=>console.log('RS >> updated state',{state})
store.subscribe(stateLogger)

export { connect, store }