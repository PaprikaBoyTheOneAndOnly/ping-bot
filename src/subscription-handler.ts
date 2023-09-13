import * as fs from 'fs';
import { ObjectEncodingOptions } from 'fs';

const CONFIG: ObjectEncodingOptions = { encoding: 'utf8' };

export function setUpSubscriptions() {
  const SUBSCRIPTION_FILE = `${process.env.CONFIG_PATH}/.subscriptions.json`;
  if (!fs.existsSync(SUBSCRIPTION_FILE)) {
    fs.writeFileSync(SUBSCRIPTION_FILE, JSON.stringify([]), CONFIG);
  }
}

export function subscribe(userId: string) {
  const subscriptions = readSubscriptions();

  if (!subscriptions.includes(userId)) {
    subscriptions.push(userId);
    fs.writeFileSync(process.env.SUBSCRIPTION_CONFIG_FILE, JSON.stringify(subscriptions));
  }
}

export function unsubscribe(userId: string) {
  const subscriptions = readSubscriptions();

  fs.writeFileSync(
    process.env.SUBSCRIPTION_CONFIG_FILE,
    JSON.stringify(subscriptions.filter(id => id != userId)),
    CONFIG,
  );
}

export function readSubscriptions(): string[] {
  const subscriptions = fs.readFileSync(process.env.SUBSCRIPTION_CONFIG_FILE, CONFIG) as string;
  return JSON.parse(subscriptions);
}
