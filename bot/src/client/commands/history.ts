import { SlashCommandBuilder } from '@discordjs/builders';
import { z } from 'zod';

import type { SlashCommand } from '@/types/command';

import { I18n } from '@/i18n';
import { apiClient } from '@/libs/apiClient';
import { safeParseSchema } from '@/libs/zod';

export default {
  name: 'history',
  data: new SlashCommandBuilder()
    .setName('history')
    .setDescription(I18n.t('EN').history.description())
    .setDescriptionLocalizations({
      'en-US': I18n.t('EN').history.description(),
      'ja': I18n.t('JA').history.description(),
    })
    .addIntegerOption((option) =>
      option
        .setName('limit')
        .setDescription(I18n.t('EN').history.options.limit.description())
        .setDescriptionLocalizations({
          'en-US': I18n.t('EN').history.options.limit.description(),
          'ja': I18n.t('JA').history.options.limit.description(),
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

    const maybeLimit = interaction.options.get('limit')?.value;
    const parsedLimitResult = safeParseSchema(
      z.number().int().optional(),
      maybeLimit
    );
    if (!parsedLimitResult.ok) {
      await interaction.reply({
        content: I18n.t(language).history.options.limit.invalid(),
        ephemeral: true,
      });
      return;
    }

    const limit = parsedLimitResult.data ?? 10;

    const historiesRes = await (
      await apiClient.api.history.$get({
        query: {
          id: '',
          limit: `${limit}`,
        },
      })
    ).json();

    if (historiesRes.status !== 200) {
      // eslint-disable-next-line no-console
      console.error(historiesRes);
      await interaction.reply({
        content: I18n.t(language).common.internal_server_error(),
        ephemeral: false,
      });
      return;
    }

    const histories = historiesRes.data;

    const mappedHistories = histories.map((history) => {
      const { title } = history.request.video;
      const user = history.request.requestedBy.name;
      return {
        title,
        user,
      };
    });

    await interaction.reply({
      content: I18n.t(language).history.content({ histories: mappedHistories }),
      ephemeral: true,
    });
  },
} as const satisfies SlashCommand;
