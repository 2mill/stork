import { config } from 'dotenv';
config()
const botConfig = {
	"guild": process.env.guild,
	"key": process.env.DISCORD_KEY,
}
// import {front-matter} from 'front-matter';
import { 
	Client, 
	Channel,
	ChannelType,
	TextChannel,
	Collection, 
	GatewayIntentBits,
	BaseGuildTextChannel,
	BaseGuild,
	Message,
	MessageFlags,

} from 'discord.js'
// const { Client, GatewayIntentBits } = require("discord.js");

const client: Client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent,
	]

});
client.login(botConfig.key);

function temp_filter(message: Message): boolean {
	return true
}
client.on('ready', () => {
	console.log('client ready!');
	// console.log(getMessagesFromChannel('att'))
	// getChannel('att').forEach(channel => {
	// 	const mess = (channel as BaseGuildTextChannel).messages;
	// 	mess.fetch({limit: 10, cache:false}).then(
	// 		coll => coll.forEach(mss => console.log(mss.attachments.size))

			/**
			 * So you can list all of the attachements from a message and get the URl.
			 * Making a GET request on the given URL will dump the entire text from the body.
			 * This means that a discord bot could seriously be used as a source to store website data etc.
			 * You could feed it a schemas and validate new data uploads etc. Have it upload its own attachemetns etc.
			 * The possiblities are somewhat endless here.
			 * More importantly, a Discord bot could hold its own configuration data for a server ON the server itself.
			 */
		// );
		
	// });
});
function getChannel(channelName: string): Collection<string, Channel> {

	const textChannels: Collection<string, Channel> = client.channels.cache.filter(
		channel => channel instanceof BaseGuildTextChannel
	);


	return textChannels.filter(channel => {
		return (channel as BaseGuildTextChannel).name == channelName
	});
}



