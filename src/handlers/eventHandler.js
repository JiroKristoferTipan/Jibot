const path = require('node:path');
const getAllFiles = require('../utils/getAllFiles');

module.exports = (client) => {
    const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);

    for (const eventFolder of eventFolders) {
        const eventFiles = getAllFiles(eventFolder);
        eventFiles.sort((a, b) => a > b);

        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();

        client.on(eventName, async (arg) => {
            for (const eventFile of eventFiles) {
                const eventFunction = require(eventFile);
                await eventFunction(client, arg);
            }
        });
    }
};

// //check if bot is on
// client.once(Events.ClientReady, (readyClient) => {
//     console.log(`Logged in as ${client.user.tag}!`);
// });

// //log messages
// client.on(Events.MessageCreate, (message) => {
// 	if (message.author.bot) return;
// 	console.log(`${message.author.tag}: ${message.content}`);
// 	if (message.content === '67') {
// 		message.channel.send('sybau bruh');
// 	}
// });