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
  info: {
    description: () => '指定した動画の情報を取得します',
    options: {
      video_url: {
        description: () => 'Youtubeの動画URL',
        invalid: () => '無効なURLです。有効なURLを入力してください。',
      },
    },
    content: ({ title, description, author }) =>
      `
:movie_camera:**動画情報**:movie_camera:
**タイトル**
${title}

**説明**
${description}

**チャンネル**
${author}
`,
  },
} satisfies IMessages;
