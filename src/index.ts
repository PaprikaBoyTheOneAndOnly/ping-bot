import * as dotenv from 'dotenv';
import { bootstrap } from './main';
import { log } from './logger';
import { setUpSubscriptions } from './subscription-handler';

dotenv.config();

setUpSubscriptions();

bootstrap()
  .then(() => log('Application is ready to go!'))
  .catch(e => {
    log('Error on startup');
    log(e);
  });
