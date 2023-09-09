import * as dotenv from 'dotenv';
import { bootstrap } from './main';
import { log } from './logger';
import { setUpSubscriptions } from './subscription-handler';

dotenv.config();

setUpSubscriptions();

bootstrap()
  .then(() => log('Application is ready to go!'))
  .catch(e => {
    console.error('Error on startup', process.env.TOKEN);
    console.error(e);

    log('Error on startup');
    log(e);
  });
