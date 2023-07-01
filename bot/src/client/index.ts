import { Client, GatewayIntentBits } from 'discord.js';

import commands from '@/client/commands';
import { envSchema } from '@/schema/env';

const { DISCORD_TOKEN } = envSchema.parse(process.env);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.on('ready', async () => {
  const guild = client.guilds.cache.first();
  if (!guild) {
    // eslint-disable-next-line no-console
    console.error(
      'Orgel has not been added to the guild, please add it to the guild before launching Orgel'
    );
    return;
  }

  await client.application?.commands.set(
    commands.map((command) => command.data),
    guild.id
  );

  // eslint-disable-next-line no-console
  console.log('Orgel is ready');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  const target = commands.find((command) => command.name === commandName);

  if (!target) return;
  await target.execute(interaction);
});

client.login(DISCORD_TOKEN).catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
});
