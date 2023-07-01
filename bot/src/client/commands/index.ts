import type { SlashCommand } from '@/types/command';

import hello from '@/client/commands/hello';
import history from '@/client/commands/history';
import info from '@/client/commands/info';
import play from '@/client/commands/play';
import resume from '@/client/commands/resume';
import settings from '@/client/commands/settings';
import skip from '@/client/commands/skip';

export default [
  hello,
  settings,
  info,
  play,
  skip,
  resume,
  history,
] as const satisfies ReadonlyArray<SlashCommand>;
