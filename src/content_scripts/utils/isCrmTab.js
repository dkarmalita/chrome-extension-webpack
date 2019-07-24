import { CRM_DOMAIN_ID } from '../../config';

export default function(){
  return window.location.origin.indexOf(CRM_DOMAIN_ID) > -1
}
