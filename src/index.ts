import { config } from 'dotenv'

import { 

	Client, 
	Channel,
	ChannelType,
	TextChannel,
	Collection, 
	GatewayIntentBits,
	BaseGuildTextChannel,
	BaseGuild

} from 'discord.js'
config();
// const { Client, GatewayIntentBits } = require("discord.js");

const client: Client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.Guilds
	]

});
client.on('ready', () => {
	console.log('client ready!');
	console.log(getMessagesFromChannel('att'))
});
client.on('messageCreate', message => console.log("Received a message!"))

const guildConfig = {
	"guild": process.env.guild,
}




client.login(process.env.DISCORD_KEY);

function getMessagesFromChannel(channelName: string): Collection<string, Channel> {

	const textChannels: Collection<string, Channel> = client.channels.cache.filter(
		channel => channel instanceof BaseGuildTextChannel
	);


	return textChannels.filter(channel => {
		return (channel as BaseGuildTextChannel).name == channelName
	});
}



