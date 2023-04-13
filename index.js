process.title = "Initialisation..."

// BOT INIT

const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
const token = process.env.TOKEN;
const { version } = require('./package.json');

require('./utils/printBanner.js')();
process.title = "RBot v" + version + (process.env.MODE === 'dev' ? " DEV" : "")

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
    ],
});

// CONFIG

client.config = require(process.env.MODE === 'dev' ? './config-dev.json' : './config.json')

// LOGS

client.logger = require('./logger');

client.logger.info('Starting in ' + (process.env.MODE === 'dev' ? 'DEV' : 'PROD') + " mode.")

// DATABASES

const { Database } = require("quickmongo");

client.xpDB = new Database(
    process.env.DB_URL,
    { collectionName: "xp" + (process.env.MODE === 'dev' ? '-dev' : '') }
);

client.xpDB.on("ready", () => {
    client.logger.info("Connected to the XP Database");
});

const XPconnect = async function () {
    await client.xpDB.connect();
};

XPconnect();

client.suggestionDB = new Database(
    process.env.DB_URL,
    { collectionName: "suggestion" + (process.env.MODE === 'dev' ? '-dev' : '') }
);

client.suggestionDB.on("ready", () => {
    client.logger.info("Connected to the Suggestions Database");
});

const suggestionconnect = async function () {
    await client.suggestionDB.connect();
};

suggestionconnect();

/* async function doStuff() {
    // Setting an object in the database:
    await db.set("userInfo", { difficulty: "Easy" });
    // -> { difficulty: 'Easy' }

    // Pushing an element to an array (that doesn't exist yet) in an object:
    await db.push("userInfo.items", "Sword");
    // -> { difficulty: 'Easy', items: ['Sword'] }

    // Adding to a number (that doesn't exist yet) in an object:
    await db.add("userInfo.balance", 500);
    // -> { difficulty: 'Easy', items: ['Sword'], balance: 500 }

    // Repeating previous examples:
    await db.push("userInfo.items", "Watch");
    // -> { difficulty: 'Easy', items: ['Sword', 'Watch'], balance: 500 }
    await db.add("userInfo.balance", 500);
    // -> { difficulty: 'Easy', items: ['Sword', 'Watch'], balance: 1000 }

    // Fetching individual properties
    await db.get("userInfo.balance"); // -> 1000
    await db.get("userInfo.items"); // -> ['Sword', 'Watch']

    // remove item
    await db.pull("userInfo.items", "Sword");
    // -> { difficulty: 'Easy', items: ['Watch'], balance: 1000 }

    // set the data and automatically delete it after 1 minute
    await db.set("foo", "bar", 60); // 60 seconds = 1 minute

    // fetch the temporary data after a minute
    setTimeout(async () => {
        await db.get("foo"); // null
    }, 60_000);
} */

// XP Stuff

client.talkedRecently = new Map();

// GIVEAWAYS

const { GiveawaysManager } = require("./utils/giveaways/index.js");
const manager = new GiveawaysManager(client, {
    storage: "./giveaways" + (process.env.MODE === 'dev' ? '-dev' : '') + ".json",
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        embedColorEnd: "#000000",
        reaction: "🎉",
    },
});
// We now have a giveawaysManager property to access the manager everywhere!
client.giveawaysManager = manager;

// COMMANDS

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

// EVENTS

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}

// BOT LOGIN

client.login(token);
