import type { LanguageType } from '@/schema/generated/prisma';

import en from '@/i18n/en';
import ja from '@/i18n/ja';

export interface IMessages {
  common: {
    internal_server_error: () => string;
  };
  hello: {
    description: () => string;
    content: () => string;
  };
  settings: {
    description: () => string;
    not_found: () => string;
    language: {
      description: () => string;
      options: {
        language: {
          description: () => string;
          invalid: () => string;
          changed: (args: { user: string; language: LanguageType }) => string;
        };
      };
    };
  };
}

const messages = {
  EN: en,
  JA: ja,
} as const satisfies Record<LanguageType, IMessages>;

export class I18n {
  static t(language: LanguageType) {
    return messages[language];
  }
}
