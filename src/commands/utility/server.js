const { interaction } = require('discord.js');

module.exports = {
  name: 'server',
  description: 'Provides information about the server.',
  // devOnly: Boolean,
  testOnly: true,
  // options: Object[],
  // deleted: Boolean,

  callback: (client, interaction) => {
    interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
  },
};