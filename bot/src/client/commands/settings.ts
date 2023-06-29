import { SlashCommandBuilder } from '@discordjs/builders';

import type { SlashCommand } from '@/types/command';

import { I18n } from '@/i18n';
import { apiClient } from '@/libs/apiClient';
import { safeParseSchema } from '@/libs/zod';
import { LanguageSchema } from '@/schema/generated/prisma';

export default {
  name: 'settings',
  data: new SlashCommandBuilder()
    .setName('settings')
    .setDescription(I18n.t('EN').settings.description())
    .setDescriptionLocalizations({
      'en-US': I18n.t('EN').settings.description(),
      'ja': I18n.t('JA').settings.description(),
    })
    .addSubcommand((sub) =>
      sub
        .setName('language')
        .setDescription(I18n.t('EN').settings.language.description())
        .setDescriptionLocalizations({
          'en-US': I18n.t('EN').settings.language.description(),
          'ja': I18n.t('JA').settings.language.description(),
        })
        .addStringOption((option) =>
          option
            .setName('language')
            .setRequired(true)
            .setDescription(
              I18n.t('EN').settings.language.options.language.description()
            )
            .setDescriptionLocalizations({
              'en-US':
                I18n.t('EN').settings.language.options.language.description(),
              'ja': I18n.t(
                'JA'
              ).settings.language.options.language.description(),
            })
        )
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
        ephemeral: false,
      });
      return;
    }

    const { language } = settings.data;

    const targetLanguage = interaction.options.get('language')?.value;
    const parsedTargetLanguage = safeParseSchema(
      LanguageSchema,
      targetLanguage
    );
    if (!parsedTargetLanguage.ok) {
      await interaction.reply({
        content: I18n.t(language).settings.language.options.language.invalid(),
        ephemeral: true,
      });
      return;
    }

    const res = await (
      await apiClient.api.settings.language.$post({
        json: {
          language: parsedTargetLanguage.data,
        },
      })
    ).json();

    if (res.status !== 200) {
      // eslint-disable-next-line no-console
      console.error(res);

      await interaction.reply({
        content: I18n.t(language).common.internal_server_error(),
        ephemeral: false,
      });
      return;
    }

    const user = interaction.user.toString();

    await interaction.reply({
      content: I18n.t(
        parsedTargetLanguage.data
      ).settings.language.options.language.changed({
        user,
        language: parsedTargetLanguage.data,
      }),
      ephemeral: false,
    });
  },
} satisfies SlashCommand;
