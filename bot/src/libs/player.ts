import {
  AudioPlayerStatus,
  StreamType,
  createAudioResource,
  joinVoiceChannel as discordJoinVoiceChannel,
  createAudioPlayer,
  entersState,
} from '@discordjs/voice';
import ytdl from 'ytdl-core';

import type {
  VoiceConnection,
  AudioPlayer as DiscordAudioPlayer,
} from '@discordjs/voice';
import type { TextBasedChannel, VoiceBasedChannel } from 'discord.js';

import { I18n } from '@/i18n';
import { apiClient } from '@/libs/apiClient';
import { err, ok } from '@/utils/result';

class AudioPlayer {
  // eslint-disable-next-line no-use-before-define
  private static _instance: AudioPlayer;

  private _player: DiscordAudioPlayer;

  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
  private constructor() {
    this._player = createAudioPlayer();
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new AudioPlayer();
    }
    return this._instance;
  }

  public get player() {
    return this._player;
  }
}

export const joinVoiceChannel = (voiceChannel: VoiceBasedChannel) => {
  const connection = discordJoinVoiceChannel({
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    channelId: voiceChannel.id,
    guildId: voiceChannel.guild.id,
    selfDeaf: true,
    selfMute: false,
  });

  return connection;
};

const waitReadyConnection = async (connection: VoiceConnection) =>
  new Promise<void>((resolve) => {
    setInterval(() => {
      if (connection.state.status === 'ready') {
        resolve();
      }
    }, 100);
  });

export const turnScrew = async (
  connection: VoiceConnection,
  player: DiscordAudioPlayer,
  textChannel: TextBasedChannel
) => {
  const queueRes = await (await apiClient.api.queue.$get()).json();
  if (queueRes.status !== 200) {
    // eslint-disable-next-line no-console
    console.error(queueRes);
    throw new Error('Failed to fetch queue');
  }

  const queueCount = queueRes.data.length;

  if (queueCount <= 0) {
    await waitReadyConnection(connection);
    connection.disconnect();
    return;
  }

  const currentQueueRes = await (
    await apiClient.api.queue.current.$get()
  ).json();
  if (currentQueueRes.status !== 200) {
    // eslint-disable-next-line no-console
    console.error(currentQueueRes);
    throw new Error('Failed to fetch current queue');
  }

  const currentRequest = currentQueueRes.data?.request;
  if (!currentRequest) {
    await apiClient.api.queue['decrease-order'].$patch();
    await turnScrew(connection, player, textChannel);
    return;
  }

  const { video: currentVideo, requestedBy } = currentRequest;

  const stream = ytdl(currentVideo.url, {
    filter: (format) =>
      format.audioCodec === 'opus' && format.container === 'webm', // webm opus
    quality: 'highest',
    highWaterMark: 32 * 1024 * 1024,
  });

  const resource = createAudioResource(stream, {
    inputType: StreamType.WebmOpus,
  });

  const languageRes = await (
    await apiClient.api.settings.language.$get()
  ).json();
  if (languageRes.status !== 200) {
    // eslint-disable-next-line no-console
    console.error(languageRes);
    throw new Error('Failed to get language');
  }

  const { language } = languageRes.data;

  await textChannel.send({
    content: I18n.t(language).play.contents.play({
      title: currentVideo.title,
      user: requestedBy.name,
    }),
  });

  player.play(resource);

  const historyRes = await (
    await apiClient.api.history.$post({
      json: {
        requestId: currentRequest.id,
      },
    })
  ).json();
  if (historyRes.status !== 200) {
    // eslint-disable-next-line no-console
    console.error(historyRes);
    throw new Error('Failed to add history');
  }

  await entersState(player, AudioPlayerStatus.Playing, 10 * 1000);
  await entersState(player, AudioPlayerStatus.Idle, 24 * 60 * 60 * 1000);

  await apiClient.api.queue['decrease-order'].$patch();

  await turnScrew(connection, player, textChannel);
};

export const setupPlayer = async (
  voiceChannel: VoiceBasedChannel,
  textChannel: TextBasedChannel
) => {
  const connection = joinVoiceChannel(voiceChannel);
  const { player } = AudioPlayer.instance;

  if (player.state.status !== AudioPlayerStatus.Idle) {
    return;
  }

  connection.subscribe(player);

  await turnScrew(connection, player, textChannel);
};

export const skip = () => {
  const { player } = AudioPlayer.instance;

  if (player.state.status !== AudioPlayerStatus.Playing) {
    return err(new Error('Not playing'));
  }

  player.stop();

  return ok(null);
};
