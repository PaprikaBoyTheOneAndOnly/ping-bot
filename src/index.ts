import * as dotenv from 'dotenv';
import { Client, Events, GatewayIntentBits, VoiceState } from 'discord.js';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.login(process.env.TOKEN);
client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

const channelInfos: { [key: string]: string[] } = {};

client.on(Events.VoiceStateUpdate, (oldState, newState) => {
  if (newState.channelId) {
    addUserToChannel(newState);
  }

  if (oldState.channelId) {
    removeUserFromChannel(oldState);
  }
});

// TODO save subscription anywhere else
let joinNotificationSubscription: string[] = [];

client.on(Events.MessageCreate, message => {
  const userId = message.member?.id;

  if (!userId) {
    console.error('[MessageCreate] User ID not defined');
    return;
  }

  if (message.content?.startsWith('/subscribe')) {
    joinNotificationSubscription.push(message.member?.id);
    sendMessageToUser(userId, "You've subscribed join notifications");
  }

  if (message.content?.startsWith('/unsubscribe')) {
    joinNotificationSubscription = joinNotificationSubscription.filter(userId => userId !== message.member?.id);
    sendMessageToUser(userId, "You've unsubscribed join notifications");
  }
});

function addUserToChannel(state: VoiceState) {
  const userId = state.member?.id;

  if (!userId) {
    console.error('[addUserToChannel] User ID not defined');
    return;
  }

  if (!state.channelId) {
    console.error('[addUserToChannel] Channel ID not defined');
    return;
  }

  const usersInChannel = channelInfos[state.channelId] || [];
  usersInChannel.push(userId);

  notifyUserJoined(userId);
}

function removeUserFromChannel(state: VoiceState) {
  if (!state.channelId) {
    console.error('[removeUserFromChannel] Channel ID not defined');
    return;
  }

  const channelUsers = channelInfos[state.channelId];

  if (channelUsers && channelInfos[state.channelId]) {
    channelInfos[state.channelId] = channelInfos[state.channelId]?.filter(
      (userId: string) => userId != state.member?.id,
    );
  }
}

function notifyUserJoined(joinerUserId: string) {
  const user = client.users.cache.get(joinerUserId);

  joinNotificationSubscription.forEach(notificationUserId => {
    sendMessageToUser(notificationUserId || '', `${user?.username || 'A user'} has joined`);
  });
}

function sendMessageToUser(userId: string, message: string) {
  client.users.fetch(userId, { force: false }).then(user => {
    if (!hasUserJoinedVoice(userId)) {
      user.send(message).then(() => console.log(`Message sent to ${user.username}`));
    }
  });
}

function hasUserJoinedVoice(userId: string) {
  const guild = client.guilds.cache.find(guild => guild.members.cache.has(userId));
  const member = guild?.members.cache.get(userId);

  return !!member?.voice.channel;
}
