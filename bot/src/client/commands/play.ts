import { SlashCommandBuilder } from '@discordjs/builders';
import { GuildMember } from 'discord.js';
import ytdl from 'ytdl-core';
import { z } from 'zod';

import type { SlashCommand } from '@/types/command';

import { I18n } from '@/i18n';
import { apiClient } from '@/libs/apiClient';
import { setupPlayer } from '@/libs/player';
import { safeParseSchema } from '@/libs/zod';
import {
  ChannelSchema,
  UserSchema,
  VideoSchema,
} from '@/schema/generated/prisma';

export default {
  name: 'play',
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription(I18n.t('EN').play.description())
    .setDescriptionLocalizations({
      'en-US': I18n.t('EN').play.description(),
      'ja': I18n.t('JA').play.description(),
    })
    .addStringOption((option) =>
      option
        .setName('video_url')
        .setRequired(true)
        .setDescription(I18n.t('EN').play.options.video_url.description())
        .setDescriptionLocalizations({
          'en-US': I18n.t('EN').play.options.video_url.description(),
          'ja': I18n.t('JA').play.options.video_url.description(),
        })
    )
    .addBooleanOption((option) =>
      option
        .setName('interrupt')
        .setDescription(I18n.t('EN').play.options.interrupt.description())
        .setDescriptionLocalizations({
          'en-US': I18n.t('EN').play.options.interrupt.description(),
          'ja': I18n.t('JA').play.options.interrupt.description(),
        })
    ),
  execute: async (interaction) => {
    const settings = await (
      await apiClient.api.settings.language.$get()
    ).json();
    if (settings.status !== 200) {
      // eslint-disable-next-line no-console
      console.error(settings);

      const language = interaction.locale === 'ja' ? 'JA' : 'EN';
      await interaction.reply({
        content: I18n.t(language).settings.not_found(),
        ephemeral: true,
      });
      return;
    }

    const { language } = settings.data;

    const textChannel = interaction.channel;
    if (!textChannel) {
      await interaction.reply({
        content: I18n.t(language).common.text.not_found(),
        ephemeral: true,
      });
      return;
    }

    const maybeVideoUrl = interaction.options.get('video_url')?.value;
    const parsedVideoUrlResult = safeParseSchema(
      z.string().url(),
      maybeVideoUrl
    );
    if (!parsedVideoUrlResult.ok) {
      await interaction.reply({
        content: I18n.t(language).play.options.video_url.invalid(),
        ephemeral: true,
      });
      return;
    }

    const videoUrl = parsedVideoUrlResult.data;

    const isValidUrl = ytdl.validateURL(videoUrl);
    if (!isValidUrl) {
      await interaction.reply({
        content: I18n.t(language).play.options.video_url.invalid(),
        ephemeral: true,
      });
      return;
    }

    const maybeIsInterrupt =
      interaction.options.get('interrupt')?.value ?? false;
    const parsedIsInterruptResult = safeParseSchema(
      z.boolean(),
      maybeIsInterrupt
    );
    if (!parsedIsInterruptResult.ok) {
      await interaction.reply({
        content: I18n.t(language).play.options.interrupt.invalid(),
        ephemeral: true,
      });
      return;
    }

    const isInterrupt = parsedIsInterruptResult.data;

    const { member } = interaction;
    if (!(member instanceof GuildMember)) {
      await interaction.reply({
        content: I18n.t(language).common.member.invalid(),
        ephemeral: true,
      });
      return;
    }

    const info = await ytdl.getBasicInfo(videoUrl);
    const {
      videoId,
      title,
      description,
      author: {
        id: channelId,
        name: channelName,
        user: channelUser,
        channel_url: channelUrl,
      },
    } = info.videoDetails;

    const parsedChannelResult = safeParseSchema(ChannelSchema, {
      id: channelId,
      name: channelName,
      user: channelUser,
      url: channelUrl,
    });

    const parsedVideoResult = safeParseSchema(VideoSchema, {
      id: videoId,
      title,
      description,
      url: videoUrl,
      channelId,
    });

    const parsedUserResult = safeParseSchema(UserSchema, {
      id: member.id,
      name: member.user.toString(),
    });

    if (
      !parsedChannelResult.ok ||
      !parsedVideoResult.ok ||
      !parsedUserResult.ok
    ) {
      await interaction.reply({
        content: I18n.t(language).common.video.failed.fetch(),
        ephemeral: true,
      });
      return;
    }

    const channel = parsedChannelResult.data;
    const video = parsedVideoResult.data;
    const user = parsedUserResult.data;

    const pushToQueueRes = await (
      await apiClient.api.queue.$post({
        json: {
          channel,
          video,
          user,
          isInterrupt,
        },
      })
    ).json();

    if (pushToQueueRes.status !== 200) {
      // eslint-disable-next-line no-console
      console.error(pushToQueueRes);

      await interaction.reply({
        content: I18n.t(language).common.internal_server_error(),
        ephemeral: false,
      });
      return;
    }

    const message = isInterrupt
      ? I18n.t(language).play.contents.interrupt({ title })
      : I18n.t(language).play.contents.push({ title });

    await interaction.reply({
      content: message,
      ephemeral: true,
    });

    const voiceChannel = member.voice.channel;
    if (!voiceChannel) {
      await interaction.reply({
        content: I18n.t(language).common.voice.not_connected(),
        ephemeral: true,
      });
      return;
    }

    await setupPlayer(voiceChannel, textChannel);
  },
} as const satisfies SlashCommand;
