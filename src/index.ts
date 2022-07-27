import { config } from 'dotenv'

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
config();
// const { Client, GatewayIntentBits } = require("discord.js");

const client: Client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent,
	]

});

function temp_filter(message: Message): boolean {
	return true
}
client.on('ready', () => {
	console.log('client ready!');
	// console.log(getMessagesFromChannel('att'))
	getChannel('att').forEach(channel => {
		const mess = (channel as BaseGuildTextChannel).messages;
		mess.fetch({limit: 10, cache:false}).then(
			coll => coll.forEach(mss => console.log(mss.attachments.size))
		);
		
	});

});


client.on('messageCreate', message => message.attachments.forEach(attch => console.log(attch.url)));

const guildConfig = {
	"guild": process.env.guild,
}




client.login(process.env.DISCORD_KEY);


//todo: Rename function.
function getChannel(channelName: string): Collection<string, Channel> {

	const textChannels: Collection<string, Channel> = client.channels.cache.filter(
		channel => channel instanceof BaseGuildTextChannel
	);


	return textChannels.filter(channel => {
		return (channel as BaseGuildTextChannel).name == channelName
	});
}



