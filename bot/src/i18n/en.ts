import type { IMessages } from '@/i18n';

export default {
  common: {
    internal_server_error: () => 'Internal Server Error.',
    member: {
      invalid: () =>
        'Invalid Member. Please execute again with a valid member.',
    },
    text: {
      not_found: () =>
        'Text channel is not found. Please execute again in a text channel.',
    },
    voice: {
      not_connected: () => 'Please join the Voice Channel first.',
    },
    video: {
      failed: {
        fetch: () => 'Failed to fetch the video.',
      },
    },
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
  play: {
    description: () => 'Play the specified video',
    contents: {
      push: ({ title }) => `Added ${title} to the queue.`,
      interrupt: ({ title }) => `Interrupted ${title}.`,
      play: ({ title, user }) =>
        `
:musical_note: Now Playing :musical_note:
**Title**
${title}

${user}
`,
    },
    options: {
      video_url: {
        description: () => 'Youtube Video URL',
        invalid: () => 'Invalid URL. Please enter a valid URL.',
      },
      interrupt: {
        description: () => 'Interrupt at the head of the queue',
        invalid: () => 'Invalid option. Please enter a valid option.',
      },
    },
  },
  skip: {
    description: () => 'Skip the current video',
    content: ({ user }) => `${user} skipped the current video.`,
    failed: () => 'Failed to skip the current video.',
  },
} satisfies IMessages;
