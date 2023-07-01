import type { SlashCommand } from '@/types/command';

import hello from '@/client/commands/hello';
import info from '@/client/commands/info';
import play from '@/client/commands/play';
import settings from '@/client/commands/settings';
import skip from '@/client/commands/skip';

export default [
  hello,
  settings,
  info,
  play,
  skip,
] as const satisfies ReadonlyArray<SlashCommand>;
