require('dotenv').config();
const { Client, IntentsBitField, Status } = require('discord.js');
const chatGpt = require("./ai.js")
const _vars = require("./data.js")


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
 
   }else if (message.content === "announcement channel"){
    plantChannel(message)

    message.reply(':thumbsup:')
   }



} )


function plantChannel(_message){
  _vars.channels.push(_message.channel.id)
  console.log("Channel " + _message.channel.name + " " + _message.channel.id + " from " + _message.guild.name + ", subscibed to Announcements")
}

async function SendAnnouncement(text){
  let announcementText = await chatGpt.chatgptText(text);
  _vars.channels.forEach(function(element){
    let _channelid = client.channels.cache.get(element);
    _channelid.send(announcementText)

  });
  console.log("sent announcements to " + _vars.channels.length + " channel/s")
}

async function runInterval() {
  while (true) {
    await SendAnnouncement("give me a random fact about something random in 1 or 2 sentences");

    await new Promise(resolve => setTimeout(resolve, 1 *  60 * 60 * 1000));
  }
}



runInterval();

client.login(process.env.DISCORD_TOKEN);

