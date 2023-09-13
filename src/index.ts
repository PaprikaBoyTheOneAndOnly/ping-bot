import * as dotenv from 'dotenv';
import { bootstrap } from './main';
import { log } from './logger';
import { setUpSubscriptions } from './subscription-handler';

dotenv.config();
dotenv.populate(process.env, {
  SUBSCRIPTION_CONFIG_FILE: `${process.env.CONFIG_PATH}/.subscriptions.json`,
  LOG_FILE: `${process.env.CONFIG_PATH}/.log`,
} as Partial<NodeJS.ProcessEnv>);

setUpSubscriptions();

bootstrap()
  .then(() => log('Application is ready to go!'))
  .catch(e => {
    console.error('Error on startup');
    console.error(e);

    log('Error on startup');
    log(e);
  });
