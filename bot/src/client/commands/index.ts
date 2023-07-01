import type { SlashCommand } from '@/types/command';

import hello from '@/client/commands/hello';
import info from '@/client/commands/info';
import play from '@/client/commands/play';
import settings from '@/client/commands/settings';

export default [
  hello,
  settings,
  info,
  play,
] as const satisfies ReadonlyArray<SlashCommand>;
