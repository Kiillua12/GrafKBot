var Speech = require("./SpeechToText.js");

function commandes (_msg, _prefix, _bot) {
	this.msg = _msg;
	this.PREFIX = _prefix;
	this.bot = _bot
}

commandes.prototype.execute = function () {
    if (this.msg.content.startsWith(this.PREFIX + ("h" || "help"))){
	  this.msg.reply(
      "liste des commandes:\n"+
      this.PREFIX + "ping -- répond par pong\n"+
      this.PREFIX + "coucou -- répond par toi même\n"+
      this.PREFIX + "ytdl -- télécharge la chanson lose yourself en format audio\n"+
      this.PREFIX + "qui est en ligne -- affiche la liste des utilisateurs humains connectés");
    }

    else if (this.msg.content.startsWith(this.PREFIX + "ping"))
      this.msg.channel.sendMessage("pong!");

    else if (this.msg.content.startsWith(this.PREFIX + "coucou")){
		var speech = new Speech();
		this.msg.channel.sendMessage(speech.test());
	}

    else if (this.msg.content.startsWith(this.PREFIX + "ytdl")){
      ytdl('https://www.youtube.com/watch?v=6Un9HLDCTCs', {
        filter: "audioonly"
      }).pipe(fs.createWriteStream('audioTrack.webm'));
      this.msg.channel.sendMessage("Fichier téléchargé")
    }

    else if (this.msg.content === this.PREFIX + "qui est en ligne" || this.msg.content == this.PREFIX + "who"){
	var lstUsers = this.bot.users;
	this.msg.channel.sendMessage("Les utilisateurs en ligne plus court sont :\n" + lstUsers.filter(u=>!u.bot && u.presence.status == "online").map(u=>u.username));
	
	}
	
	else if(this.msg.content.startsWith(this.PREFIX + "listen"))
	{
		var channel = this.bot.channels;
		var voiceChannel = channel.filter(u=>u.type == "voice" && u.name == this.msg.content.split(" ")[1]).first();
		if (voiceChannel == null)
			this.msg.channel.sendMessage("Ce channel n'existe pas ou vous n'en avez pas indiqué")
		else {
			voiceChannel.join().then(connection => {
			 const receiver = connection.createReceiver();
			});
		}
	}
}

 module.exports = commandes;
/* Le symbole devant chaque commande */
