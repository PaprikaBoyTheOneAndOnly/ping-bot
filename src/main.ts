import { Events } from 'discord.js';
import { createClient } from './discord-client';
import { log } from './logger';
import { readSubscriptions, subscribe, unsubscribe } from './subscription-handler';

export async function bootstrap() {
  const client = await createClient();

  client.on(Events.VoiceStateUpdate, (_, newState) => {
    if (newState.channelId) {
      const userId = newState.member?.id;

      if (!userId) {
        log('[addUserToChannel] User ID not defined');
        return;
      }

      if (!newState.channelId) {
        log('[addUserToChannel] Channel ID not defined');
        return;
      }

      notifyUserJoined(userId);
    }
  });

  client.on(Events.MessageCreate, message => {
    const userId = message.member?.id;

    if (!userId) {
      log('[MessageCreate] User ID not defined');
      return;
    }

    if (message.content?.startsWith('/subscribe')) {
      subscribe(message.member?.id);
      sendMessageToUser(userId, "You've subscribed join notifications");
    }

    if (message.content?.startsWith('/unsubscribe')) {
      unsubscribe(message.member?.id);
      sendMessageToUser(userId, "You've unsubscribed join notifications");
    }
  });

  function notifyUserJoined(joinerUserId: string) {
    const user = client.users.cache.get(joinerUserId);

    readSubscriptions().forEach(notificationUserId => {
      sendMessageToUser(notificationUserId || '', `${user?.username || 'A user'} has joined`);
    });
  }

  function sendMessageToUser(userId: string, message: string) {
    client.users.fetch(userId, { force: false }).then(user => {
      if (!hasUserJoinedVoice(userId)) {
        user.send(message).then(() => log(`Message sent to ${user.username}`));
      }
    });
  }

  function hasUserJoinedVoice(userId: string) {
    const guild = client.guilds.cache.find(guild => guild.members.cache.has(userId));
    const member = guild?.members.cache.get(userId);

    return !!member?.voice.channel;
  }
}
