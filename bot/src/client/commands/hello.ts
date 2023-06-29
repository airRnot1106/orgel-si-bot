import { SlashCommandBuilder } from '@discordjs/builders';

import type { SlashCommand } from '@/types/command';

import { I18n } from '@/i18n';
import { apiClient } from '@/libs/apiClient';

const descriptionEn = 'Hello Orgel!';
const descriptionJa = 'こんにちは、Orgel!';

export default {
  name: 'hello',
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription(descriptionEn)
    .setDescriptionLocalizations({
      'en-US': descriptionEn,
      'ja': descriptionJa,
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
    await interaction.reply({
      content: I18n.t(language).hello.content(),
      ephemeral: false,
    });
  },
} satisfies SlashCommand;
