import * as fs from 'fs';

const SUBSCRIPTION_FILE = '.subscriptions.json';

export function setUpSubscriptions() {
  if (!fs.existsSync(SUBSCRIPTION_FILE)) {
    fs.writeFileSync(SUBSCRIPTION_FILE, JSON.stringify([]), { encoding: 'utf8' });
  }
}

export function subscribe(userId: string) {
  const subscriptions = readSubscriptions();

  if (!subscriptions.includes(userId)) {
    subscriptions.push(userId);
    fs.writeFileSync(SUBSCRIPTION_FILE, JSON.stringify(subscriptions), { encoding: 'utf8' });
  }
}

export function unsubscribe(userId: string) {
  const subscriptions = readSubscriptions();

  fs.writeFileSync(SUBSCRIPTION_FILE, JSON.stringify(subscriptions.filter(id => id != userId)), { encoding: 'utf8' });
}

export function readSubscriptions(): string[] {
  const subscriptions = fs.readFileSync(SUBSCRIPTION_FILE, { encoding: 'utf8' });
  return JSON.parse(subscriptions);
}
