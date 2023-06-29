import type { IMessages } from '@/i18n';

export default {
  hello: {
    description: () => 'Hello Orgel!',
    content: () => 'Hello, Orgel!',
  },
  settings: {
    not_found: () => 'Internal Server Error.',
  },
} satisfies IMessages;
