import { Client, Events, GatewayIntentBits } from 'discord.js';
import { log } from './logger';

export async function createClient() {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildPresences,
    ],
  });

  client.once(Events.ClientReady, c => {
    log(`Logged in as ${c.user.tag}`);
  });

  await client.login(process.env.TOKEN);

  return client;
}
