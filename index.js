var Discord = require("discord.js");

/* Node opus pour l'audio du bot */
var opus = require('node-opus');

/* File System */
var fs = require('fs');

/* Youtube Downloader */
var ytdl = require("ytdl-core");

var config = require('./config.js');
var bot = new Discord.Client();

/* Le symbole devant chaque commande */

var PREFIX = "//";

bot.on('ready', () => {
  console.log("ready");
});

bot.on("message", msg => {
    if (msg.content.startsWith( PREFIX + ("h" || "help"))){
      msg.reply(
      "liste des commandes:\n"+
      PREFIX + "ping -- répond par pong\n"+
      PREFIX + "coucou -- répond par toi même\n"+
      PREFIX + "ytdl -- télécharge la chanson lose yourself en format audio\n"+
      PREFIX + "qui est en ligne -- affiche la liste des utilisateurs humains connectés");
    }

    else if (msg.content.startsWith(PREFIX + "ping"))
      msg.channel.sendMessage("pong!");

    else if (msg.content.startsWith(PREFIX + "coucou"))
      msg.channel.sendMessage("toi même");

    else if (msg.content.startsWith(PREFIX + "ytdl")){
      ytdl('https://www.youtube.com/watch?v=6Un9HLDCTCs', {
        filter: "audioonly"
      }).pipe(fs.createWriteStream('audioTrack.webm'));
      msg.channel.sendMessage("Fichier téléchargé")
    }

    else if (msg.content === PREFIX + "qui est en ligne"){
      var usersID = bot.users.keys();
      var onlineUsers = [];

      /* On utilise for.. of.. pour parcourir des maps */
      for (var k of usersID){
        var _user = bot.users.get(k);
        if (_user.presence.status === "online" && !_user.bot){
          onlineUsers.push(_user.username);
        }
      }
      msg.channel.sendMessage("Les utilisateurs en ligne sont :\n" + onlineUsers);
    }
});

//Events
bot.on("messageDelete", msg => {
  msg.channel.sendMessage("le message de "+  msg.author + " à été supprimé :\n" + msg);
});

bot.login(config.token);
