import { getCookie, parseJwt } from './';

export default function getUserData(){
  // KARD: remove the mock
  return '1234567'
  return parseJwt(getCookie('jwt-token')) // returns null on errors
}