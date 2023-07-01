import { SlashCommandBuilder } from '@discordjs/builders';

import type { SlashCommand } from '@/types/command';

import { I18n } from '@/i18n';
import { apiClient } from '@/libs/apiClient';
import { skip } from '@/libs/player';

export default {
  name: 'skip',
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription(I18n.t('EN').skip.description())
    .setDescriptionLocalizations({
      'en-US': I18n.t('EN').skip.description(),
      'ja': I18n.t('JA').skip.description(),
    }),
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

    const skipResult = skip();
    if (!skipResult.ok) {
      await interaction.reply({
        content: I18n.t(language).skip.failed(),
        ephemeral: true,
      });
      return;
    }

    const user = interaction.user.toString();

    await interaction.reply({
      content: I18n.t(language).skip.content({
        user,
      }),
      ephemeral: false,
    });
  },
} as const satisfies SlashCommand;
