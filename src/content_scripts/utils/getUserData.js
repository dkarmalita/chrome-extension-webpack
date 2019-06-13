import { getCookie, parseJwt } from './';

// KARD: remove the mock
const parsedJwtMock = {
  exp: '1560357869',
  iat: '1560354269',
  ip: '62.244.35.42',
  user: {
    id: '3860',
  },
  localhost: true,
}

export default function getUserData(){
  return parsedJwtMock // KARD: remove the mock
  return parseJwt(getCookie('jwt-token')) // returns null on errors
}