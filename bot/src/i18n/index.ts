import type { LanguageType } from '@/schema/generated/prisma';

import en from '@/i18n/en';
import ja from '@/i18n/ja';

export interface IMessages {
  common: {
    internal_server_error: () => string;
    member: {
      invalid: () => string;
    };
    text: {
      not_found: () => string;
    };
    voice: {
      not_connected: () => string;
    };
    video: {
      failed: {
        fetch: () => string;
      };
    };
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
  info: {
    description: () => string;
    options: {
      video_url: {
        description: () => string;
        invalid: () => string;
      };
    };
    content: (args: {
      title: string;
      description: string;
      author: string;
    }) => string;
  };
  play: {
    description: () => string;
    contents: {
      push: (args: { title: string }) => string;
      interrupt: (args: { title: string }) => string;
      play: (args: { title: string; user: string }) => string;
    };
    options: {
      video_url: {
        description: () => string;
        invalid: () => string;
      };
      interrupt: {
        description: () => string;
        invalid: () => string;
      };
    };
  };
  skip: {
    description: () => string;
    content: (args: { user: string }) => string;
    failed: () => string;
  };
  resume: {
    description: () => string;
    content: () => string;
  };
  history: {
    description: () => string;
    content: (args: { histories: { title: string; user: string }[] }) => string;
    options: {
      limit: {
        description: () => string;
        invalid: () => string;
      };
    };
  };
  queue: {
    description: () => string;
    contents: {
      empty: () => string;
      content: (args: { items: { title: string; user: string }[] }) => string;
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
