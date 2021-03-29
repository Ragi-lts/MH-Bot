import Discord from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.TOKEN;
const client = new Discord.Client()

client.on('ready', () => {
    console.log(
        `Logged in as ${client.user.tag}`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});


client.login(token);