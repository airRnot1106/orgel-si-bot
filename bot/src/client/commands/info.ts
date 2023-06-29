import { SlashCommandBuilder } from '@discordjs/builders';
import ytdl from 'ytdl-core';
import { z } from 'zod';

import type { SlashCommand } from '@/types/command';

import { I18n } from '@/i18n';
import { apiClient } from '@/libs/apiClient';
import { safeParseSchema } from '@/libs/zod';
import { err, ok } from '@/utils/result';

export default {
  name: 'info',
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription(I18n.t('EN').info.description())
    .setDescriptionLocalizations({
      'en-US': I18n.t('EN').info.description(),
      'ja': I18n.t('JA').info.description(),
    })
    .addStringOption((option) =>
      option
        .setName('video_url')
        .setRequired(true)
        .setDescription(I18n.t('EN').info.options.video_url.description())
        .setDescriptionLocalizations({
          'en-US': I18n.t('EN').info.options.video_url.description(),
          'ja': I18n.t('JA').info.options.video_url.description(),
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

    const maybeVideoUrl = interaction.options.get('video_url')?.value;
    const parsedVideoUrlResult = safeParseSchema(
      z.string().url(),
      maybeVideoUrl
    );
    if (!parsedVideoUrlResult.ok) {
      await interaction.reply({
        content: I18n.t(language).info.options.video_url.invalid(),
        ephemeral: true,
      });
      return;
    }

    const videoUrl = parsedVideoUrlResult.data;
    const infoResult = await ytdl
      .getBasicInfo(videoUrl)
      .then((info) => ok(info))
      .catch((e) =>
        e instanceof Error ? err(e) : err(new Error('Unknown error'))
      );
    if (!infoResult.ok) {
      await interaction.reply({
        content: I18n.t(language).info.options.video_url.invalid(),
        ephemeral: true,
      });
      return;
    }

    const info = infoResult.data;
    const {
      title,
      description: maybeDescription,
      author: { name: author },
    } = info.videoDetails;

    const description = maybeDescription ?? '';
    const maxDescriptionLength = 300;
    const formattedDescription =
      description.length > maxDescriptionLength
        ? `${description.slice(0, maxDescriptionLength)}...`
        : description;
    await interaction.reply({
      content: I18n.t(language).info.content({
        title,
        description: formattedDescription,
        author,
      }),
      ephemeral: true,
    });
  },
} as const satisfies SlashCommand;
