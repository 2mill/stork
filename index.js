require('dotenv').config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});
client.on('ready', () => console.log('client ready!'));
client.on('messageCreate', message => console.log("Received a message!"))
client.login(process.env.DISCORD_KEY);