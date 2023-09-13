import * as fs from 'fs';

const DateTimeFormatter = Intl.DateTimeFormat('de-CH', { dateStyle: 'medium', timeStyle: 'medium' });

export function log(message: string) {
  try {
    fs.appendFileSync(process.env.LOG_FILE, `[${DateTimeFormatter.format(new Date())}] ${message}\n`, {
      encoding: 'utf8',
    });
  } catch (e) {
    console.error(message);
    console.error(e);
  }
}
