require("dotenv").config();
const { Client, IntentsBitField } = require('discord.js');
const eventHandler = require("./handlers/eventHandler");

const client = new Client({ intents: [
    IntentsBitField.Flags.Guilds, 
    IntentsBitField.Flags.GuildMembers, 
    IntentsBitField.Flags.GuildMessages, 
    IntentsBitField.Flags.MessageContent
]});

eventHandler(client);

client.login(process.env.TOKEN);

// //command handling
// client.commands = new Collection();

// // Grab all the command folders from the commands directory you created earlier
// const foldersPath = path.join(__dirname, '..', 'commands');
// const commandEntries = fs.readdirSync(foldersPath);

// // Loop through the command entries, which can be either files or folders
// for (const entry of commandEntries) {
// 	const entryPath = path.join(foldersPath, entry);
// 	const stat = fs.statSync(entryPath);
// 	if (stat.isDirectory()) {
// 		const commandFiles = fs.readdirSync(entryPath).filter((file) => file.endsWith('.js'));
// 		for (const file of commandFiles) {
// 			const filePath = path.join(entryPath, file);
// 			const command = require(filePath);
// 			if ('data' in command && 'execute' in command) {
// 				client.commands.set(command.data.name, command);
// 			} else {
// 				console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
// 			}
// 		}
// 	} else if (stat.isFile() && entry.endsWith('.js')) {
// 		const command = require(entryPath);
// 		if ('data' in command && 'execute' in command) {
// 			client.commands.set(command.data.name, command);
// 		} else {
// 			console.log(`[WARNING] The command at ${entryPath} is missing a required "data" or "execute" property.`);
// 		}
// 	}
// }

// // Listen for interactions and execute commands
// client.on(Events.InteractionCreate, async (interaction) => {
//     if (!interaction.isChatInputCommand()) return; 
// 	const command = interaction.client.commands.get(interaction.commandName);
//     // not a registered interaction
// 	if (!command) {
// 		console.error(`No command matching ${interaction.commandName} was found.`);
// 		return;
// 	}
// 	try {
// 		await command.execute(interaction);
// 	} catch (error) {
// 		console.error(error);
// 		if (interaction.replied || interaction.deferred) {
// 			await interaction.followUp({
// 				content: 'There was an error while executing this command!',
// 				flags: MessageFlags.Ephemeral,
// 			});
// 		} else {
// 			await interaction.reply({
// 				content: 'There was an error while executing this command!',
// 				flags: MessageFlags.Ephemeral,
// 			});
// 		}
// 	}
// });