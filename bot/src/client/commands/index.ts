import type { SlashCommand } from '@/types/command';

import hello from '@/client/commands/hello';
import info from '@/client/commands/info';
import settings from '@/client/commands/settings';

export default [
  hello,
  settings,
  info,
] as const satisfies ReadonlyArray<SlashCommand>;
