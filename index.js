var Discord = require("discord.js");

/* File System */
var fs = require('fs');

/* Youtube Downloader */
var ytdl = require("ytdl-core");
var config = require('./config.js');
var bot = new Discord.Client();

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.on("message", msg => {
    if (msg.content.startsWith("ping"))
      msg.channel.sendMessage("pong!");

    else if (msg.content.startsWith("coucou"))
      msg.channel.sendMessage("toi meme");

    else if (msg.content.startsWith("ytdl")){
      ytdl('https://www.youtube.com/watch?v=6Un9HLDCTCs', {
        filter: "audioonly"
      })
      .pipe(fs.createWriteStream('audioTrack.webm'));
    }
});

bot.login(config.token);
