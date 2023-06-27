import type { IMessages } from '@/i18n';

export default {
  hello: {
    content: () => 'こんにちは、Orgel!',
  },
  settings: {
    not_found: () => '致命的なエラー。',
  },
} satisfies IMessages;
