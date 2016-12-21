var Discord = require("discord.js");
var Commandes = require("./commandes.js");
/* Node opus pour l'audio du bot */
var opus = require('node-opus');
/* File System */
var fs = require('fs');
/* Youtube Downloader */
var ytdl = require("ytdl-core");

var config = require('./config.js');
var bot = new Discord.Client();



bot.on('ready', () => {
  console.log("ready");
  /*for ([id, gm] of bot.guilds.find(g => g).members){
    if (gm.user.username === "GrafkBot (Lucas)"){
      console.log("found");
      gm.setMute(true);
      console.log("muted");
    }
  }
  */

  
});

var PREFIX = "//";

//Commandes.js
bot.on("message", msg => {
	var cmd = new Commandes(msg, PREFIX, bot);
	cmd.execute();
});

//Events
bot.on("messageDelete", msg => {
  msg.channel.sendMessage("le message de "+  msg.author + " à été supprimé :\n" + msg);
});

bot.login(config.token);
