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
  info: {
    description: () => 'Fetch the information of the specified video',
    options: {
      video_url: {
        description: () => 'Youtube Video URL',
        invalid: () => 'Invalid URL. Please enter a valid URL.',
      },
    },
    content: ({ title, description, author }) =>
      `
:movie_camera:**Video Info**:movie_camera:
**Title**
${title}

**Description**
${description}

**Author**
${author}
`,
  },
} satisfies IMessages;
