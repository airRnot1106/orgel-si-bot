import { SlashCommandBuilder } from '@discordjs/builders';

import type { SlashCommand } from '@/types/command';

import { I18n } from '@/i18n';
import { apiClient } from '@/libs/apiClient';

export default {
  name: 'queue',
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription(I18n.t('EN').queue.description())
    .setDescriptionLocalizations({
      'en-US': I18n.t('EN').queue.description(),
      'ja': I18n.t('JA').queue.description(),
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

    const queueRes = await (await apiClient.api.queue.$get()).json();
    if (queueRes.status !== 200) {
      // eslint-disable-next-line no-console
      console.error(queueRes);

      await interaction.reply({
        content: I18n.t(language).common.internal_server_error(),
        ephemeral: true,
      });
      return;
    }

    const items = queueRes.data;

    if (items.length <= 0) {
      await interaction.reply({
        content: I18n.t(language).queue.contents.empty(),
        ephemeral: true,
      });
      return;
    }

    const mappedItems = items.map((item) => {
      const { title } = item.request.video;
      const user = item.request.requestedBy.name;
      return {
        title,
        user,
      };
    });

    const message = I18n.t(language).queue.contents.content({
      items: mappedItems,
    });
    const formattedMessage = message.slice(0, 1950);

    await interaction.reply({
      content: formattedMessage,
      ephemeral: true,
    });
  },
} as const satisfies SlashCommand;
