import axios from 'axios';
import { MOCK_API_CALLS_ONLY } from '../config';

// https://api-bonus-gmotrading-dev.crmarts.com/swagger/index.html
// /api/bonuses/{id}

let bonus = 7302.16

setInterval(()=>bonus+=500, 10000)

const mockBonus = (id) => ({
  "data": {
    "bonus": bonus,
    "pw": id,
    "currency": 'usd',
  }
})

// call mock and the real api both
export const getUserBonus = (id) => new Promise( resolve => {
  if(!MOCK_API_CALLS_ONLY) _getUserBonus(id) // real api call
  setTimeout( resolve(mockBonus(id)), 1000) // api call mock
})

// real api call
const _getUserBonus = (id) =>
  axios.get(`https://api-bonus-gmotrading-dev.crmarts.com/api/bonuses/${id}`
    ).then(results => {
      console.log('result', results)
    }).catch(error => {
      console.log('Error in obtaining headlines', error);
    });