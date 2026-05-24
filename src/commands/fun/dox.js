module.exports = {
  name: 'dox',
  description: 'Sends the coordinates of the specified user.',
  // devOnly: Boolean,
  testOnly: true,
  options: [
    {
      name: 'target',
      description: 'The user to get coordinates for.',
      type: 6,
      required: true,
    },
  ],
  // deleted: Boolean,

  callback: (client, interaction) => {
	const latitude = (Math.random() * 180 - 90).toFixed(6);
    const longitude = (Math.random() * 360 - 180).toFixed(6);
	interaction.reply(`${interaction.options.getUser('target').username}'s Coordinates: ${latitude}, ${longitude}`);
  },
};