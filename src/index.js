require('dotenv').config();
const { Client, IntentsBitField, Status } = require('discord.js');
const chatGpt = require("./ai.js")

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});


client.on('ready', (c) =>{
    console.log('bot is ready');

});

  client.on('messageCreate', async (message) =>{
    if (message.author.bot){
        return;
    }
    
   if (message.content.startsWith(process.env.PREFIX)){
    message.channel.send("let me think") ;
    let _response = await chatGpt.chatgptText(message.content);
    message.reply(_response);
 
   }
    
    
} )

client.login(process.env.DISCORD_TOKEN);

