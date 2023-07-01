import { SlashCommandBuilder } from '@discordjs/builders';
import { GuildMember } from 'discord.js';

import type { SlashCommand } from '@/types/command';

import { I18n } from '@/i18n';
import { apiClient } from '@/libs/apiClient';
import { setupPlayer } from '@/libs/player';

export default {
  name: 'resume',
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription(I18n.t('EN').resume.description())
    .setDescriptionLocalizations({
      'en-US': I18n.t('EN').resume.description(),
      'ja': I18n.t('JA').resume.description(),
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

    const { member } = interaction;
    if (!(member instanceof GuildMember)) {
      await interaction.reply({
        content: I18n.t(language).common.member.invalid(),
        ephemeral: true,
      });
      return;
    }

    const textChannel = interaction.channel;
    if (!textChannel) {
      await interaction.reply({
        content: I18n.t(language).common.text.not_found(),
        ephemeral: true,
      });
      return;
    }

    const voiceChannel = member.voice.channel;
    if (!voiceChannel) {
      await interaction.reply({
        content: I18n.t(language).common.voice.not_connected(),
        ephemeral: true,
      });
      return;
    }

    await interaction.reply({
      content: I18n.t(language).resume.content(),
      ephemeral: true,
    });

    await setupPlayer(voiceChannel, textChannel);
  },
} as const satisfies SlashCommand;
