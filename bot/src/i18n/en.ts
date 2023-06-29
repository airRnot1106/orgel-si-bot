import type { IMessages } from '@/i18n';

export default {
  common: {
    internal_server_error: () => 'Internal Server Error.',
  },
  hello: {
    description: () => 'Hello Orgel!',
    content: () => 'Hello, Orgel!',
  },
  settings: {
    description: () => 'Configure the Orgel',
    not_found: () => 'Internal Server Error.',
    language: {
      description: () => 'Change the language of the Orgel',
      options: {
        language: {
          description: () => 'EN or JA',
          invalid: () => 'Invalid language. Select EN or JA.',
          changed: ({ user, language }) =>
            `${user} changed the language to ${language}.`,
        },
      },
    },
  },
} satisfies IMessages;
