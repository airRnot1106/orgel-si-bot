import type { IMessages } from '@/i18n';

export default {
  common: {
    internal_server_error: () => '致命的なエラーが発生しました。',
  },
  hello: {
    description: () => 'こんにちは、Orgel!',
    content: () => 'こんにちは、Orgel!',
  },
  settings: {
    description: () => 'Orgelの設定をします',
    not_found: () => '致命的なエラー。',
    language: {
      description: () => 'Orgelの言語を変更します',
      options: {
        language: {
          description: () => '対応言語: EN, JA',
          invalid: () => '無効な言語です。ENかJAを選択してください。',
          changed: ({ user, language }) =>
            `${user}が言語を${language}に変更しました。`,
        },
      },
    },
  },
} satisfies IMessages;
