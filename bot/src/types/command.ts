import type {
  ApplicationCommandDataResolvable,
  ChatInputCommandInteraction,
  CacheType,
  MessageContextMenuCommandInteraction,
  UserContextMenuCommandInteraction,
} from 'discord.js';

export type SlashCommand = {
  name: string;
  data: ApplicationCommandDataResolvable;
  execute: (
    interaction:
      | ChatInputCommandInteraction<CacheType>
      | MessageContextMenuCommandInteraction<CacheType>
      | UserContextMenuCommandInteraction<CacheType>
  ) => Promise<void>;
};
