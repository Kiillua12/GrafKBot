var Discord = require("discord.js");
var Ytdl = require("ytdl-core");
var config = require('./config.js');
var bot = new Discord.Client();

bot.on("message", msg => {
    if (msg.content.startsWith("ping"))
      msg.channel.sendMessage("pong!");
    else if (msg.content.startsWith("coucou"))
      msg.channel.sendMessage("toi meme");
});

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.login(config.token);
