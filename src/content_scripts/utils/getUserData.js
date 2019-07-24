import { getCookie, parseJwt } from './';
import { PARSED_JWT_MOCK, MOCK_USER_JWT } from '../../config';

export default function getUserData(){
  if(MOCK_USER_JWT && PARSED_JWT_MOCK){ return PARSED_JWT_MOCK }
  return parseJwt(getCookie('jwt-token')) // returns null on errors
}
