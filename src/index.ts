import { config } from 'dotenv';
config()

interface BotConfig {
	guildID: string,
	key: string,
	repos: Repos
}
interface Repos {
	images: string,
}

class DBBotConfig implements BotConfig {
	guildID: string;
	key: string;
	repos: Repos;
	constructor(guildID: string, key: string, repos:Repos) {
		this.guildID = guildID;
		this.key = key;
		this.repos = repos
	}
}


const botConfig = {
	"guildID": process.env.guild,
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
	Guild,
	GuildChannel,

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




class DBClient {
	images:  Channel| undefined; 
	constructor(discordClient: Client, config: BotConfig) {
		this.images = getChannel(config.repos.images);
	}
}

client.login(botConfig.key);

function temp_filter(message: Message): boolean {
	return true
}


function findGuildCache(): Guild | undefined {
	return client.guilds.cache.find(guild => guild.id == botConfig.guildID)
}
function fetchGuild(): Guild | undefined {
	let guild: Guild | null = client.guilds.resolve(botConfig.guildID as string)
	if (guild == null) return undefined
}

/**
 * TODO: expand arguments for permissions etc.
 * @param channelName The name of the channel that is to be creatd
 * @returns 
 */
async function createTextChannel(channelName: string): Promise<TextChannel> {
	let temp: Guild = await client.guilds.fetch(botConfig.guildID as string)
	if (temp.channels.cache.find(channel => channel.name == channelName) == undefined) {
		return temp.channels.create({
			name: channelName,
			type: 0, // GuildText
		});
	}
	return Promise.reject(`Channel \'${channelName}\' already exists, channel duplication is not supported.`)
}


/**
 * 
 * @param channelNames An array of channelNames that is to be created
 * @returns 
 */
function bulkCreateTextChannle(channelNames: string[]): Promise<TextChannel>[] {
	return channelNames.map(
		channelName => createTextChannel(channelName)
	);
}

client.on('ready', () => {
	console.log('client ready!');

	// validate
	createTextChannel('images').then().catch(console.error)
	createTextChannel('other').then().catch(console.error)
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
function getChannel(channelName: string): Channel | undefined {

	const textChannels: Collection<string, Channel> = client.channels.cache.filter(
		channel => channel instanceof BaseGuildTextChannel
	);
	return textChannels.find(channel => {
		return (channel as BaseGuildTextChannel).name == channelName
	});
}



