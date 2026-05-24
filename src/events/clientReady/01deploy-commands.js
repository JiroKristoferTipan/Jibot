const { testServer } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');

// require('dotenv').config();
// const { REST, Routes } = require('discord.js');
// const fs = require('node:fs');
// const path = require('node:path');
// const { get } = require('node:http');

// const commands = [
//     {
//         name: 'ping',
//         description: 'Replies with Pong!',
//     },
//     {
//         name: 'server',
//         description: 'Provides information about the server.',
//     },
//     {
//         name: 'user',
//         description: 'Provides information about the user.',
//     },
//     {
//         name: 'dox',
//         description: 'Sends the coordinates of the specified user.',
//         options: [
//             {
//                 name: 'target',
//                 description: 'The user to dox',
//                 type: 6, // USER type
//                 required: true,
//             }
//         ]
//     }
// ];
// // Grab all the command folders from the commands directory you created earlier
// const foldersPath = path.join(__dirname, 'commands');
// const commandFolders = fs.readdirSync(foldersPath);

// for (const folder of commandFolders) {
// 	// Grab all the command files from the commands directory you created earlier
// 	const commandsPath = path.join(foldersPath, folder);
// 	const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
// 	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
// 	for (const file of commandFiles) {
// 		const filePath = path.join(commandsPath, file);
// 		const command = require(filePath);
// 		if ('data' in command && 'execute' in command) {
// 			commands.push(command.data.toJSON());
// 		} else {
// 			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
// 		}
// 	}
// }

// // Construct and prepare an instance of the REST module
// const rest = new REST().setToken(process.env.TOKEN);

// // and deploy your commands!
// (async () => {
// 	try {
// 		console.log(`Started refreshing ${commands.length} application (/) commands.`);

// 		// The put method is used to fully refresh all commands in the guild with the current set
// 		const data = await rest.put(
//             Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), 
//             { body: commands }
//         );

// 		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
// 	} catch (error) {
// 		// And of course, make sure you catch and log any errors!
// 		console.error(error);
// 	}
// })();

module.exports = async (client) => {
    try {
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client, testServer);
        for (const localCommand of localCommands) {
            const { name, description, options } = localCommand;
            const existingCommand = await applicationCommands.cache.find(
                (cmd) => cmd.name === name
            );
            if (existingCommand) {
                if (localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`Deleted command "${name}".`);
                    continue;
                }

                if (areCommandsDifferent(existingCommand, localCommand)) {
                await applicationCommands.edit(existingCommand.id, {
                    description,
                    options,
                });

                console.log(`Edited command "${name}".`);
                }
            } else {
                if (localCommand.deleted) {
                    console.log(
                        `Skipping registering command "${name}" as it's set to delete.`
                    );
                    continue;
                }

                await applicationCommands.create({
                    name,
                    description,
                    options,
                });

                console.log(`Registered command "${name}."`);
            }
        }
    } catch (error) {   
        console.error(error);
    }
};
