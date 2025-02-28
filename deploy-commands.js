const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path")
require("dotenv").config();
const { clientId, guildId } = require(process.env.MODE === "dev"
    ? "./config-dev.json"
    : "./config.json");
const token = process.env.TOKEN;

console.log(
    "Deploying commands in " +
        (process.env.MODE === "dev" ? "DEV" : "PROD") +
        " mode."
);

const commands = [];

// Grab all the command folders

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {

    // Grab all the command files

    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
          Routes.applicationGuildCommands(clientId, guildId),
          { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();
