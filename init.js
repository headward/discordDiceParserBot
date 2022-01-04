// Require the necessary discord.js classes
import { Client, Intents } from "discord.js"
import dotenv from "dotenv"
dotenv.config();
const { token } = process.env.DISCORD_TOKEN
export const PREFIX = "!"
export default {
	startClient(){
		const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
		client.once('ready', () => {
			client.user.setPresence({
				activities: [{
					name:'Jeter des dés'
				}]
			})
			console.log('Ready!');
		});
		client.login(token);
		return client;
	}
};