import type { SlashCommand } from '@/types/command';

import hello from '@/client/commands/hello';
import search from '@/client/commands/search';
import settings from '@/client/commands/settings';

export default [
  hello,
  settings,
  search,
] as const satisfies ReadonlyArray<SlashCommand>;
