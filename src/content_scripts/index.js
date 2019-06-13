import { addWindowListener, isCrmTab } from './utils';
import main from './main';
import { log } from './logger';

if(isCrmTab()){
  addWindowListener(main)
  log('>> CRM TAB <<') // TODO: remove the console
}
