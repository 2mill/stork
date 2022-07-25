import { config } from 'dotenv'
import { Channel, Client, Collection, GatewayIntentBits, GuildChannel, GuildChannelManager, GuildManager, Snowflake } from 'discord.js'
import { Guild } from 'discord.js'
config();
// const { Client, GatewayIntentBits } = require("discord.js");

const client: Client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds]
});
client.on('ready', () => {
	console.log('client ready!');
	getMessagesFromChannel('blog')
});
client.on('messageCreate', message => console.log("Received a message!"))

const guildConfig = {
	"guild": process.env.guild,
}




client.login(process.env.DISCORD_KEY);

function getMessagesFromChannel(channelName: string): undefined {

	let guilds: Collection<string, Guild> = client.guilds.cache.filter(
		guild => guild.id == guildConfig.guild
	);

	//TODO: filter for the proper channel name and return it from this function.
	console.log(guilds)
	return undefined
}



