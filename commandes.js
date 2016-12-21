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
      this.PREFIX + "coucou -- dis bonjour\n"+
      this.PREFIX + "ytdl -- télécharge la chanson lose yourself en format audio\n"+
      this.PREFIX + "who -- affiche la liste des utilisateurs humains connectés\n"+
			this.PREFIX + "connect@<nomSalon> -- connect au salon indiqué\n"+
			this.PREFIX + "ici! -- dis au bot de venir dans le salon de l'auteur");
    }

    else if (this.msg.content.startsWith(this.PREFIX + "ping"))
      this.msg.channel.sendMessage("pong!");

    else if (this.msg.content.startsWith(this.PREFIX + "coucou")){
		if (this.msg.author.username == "Choup")
			this.msg.channel.sendMessage("coucou Choupinou :))");
		else
			this.msg.channel.sendMessage("tg");
		}

    else if (this.msg.content.startsWith(this.PREFIX + "ytdl")){
      ytdl('https://www.youtube.com/watch?v=6Un9HLDCTCs', {
        filter: "audioonly"
      }).pipe(fs.createWriteStream('audioTrack.webm'));
      this.msg.channel.sendMessage("Fichier téléchargé")
    }

    else if (this.msg.content === this.PREFIX + "qui est en ligne" || this.msg.content == this.PREFIX + "who"){
			var listUsers = this.bot.users;
	    this.msg.channel.sendMessage("Les utilisateurs en ligne sont :\n" +
				listUsers.filter(u=>!u.bot && u.presence.status == "online").map(u=>u.username));

    }

		else if (this.msg.content.startsWith(this.PREFIX + "connect@")){
			var chanName = this.msg.content.substring((this.PREFIX+"connect@").length);
			this.join(chanName);
		}

		else if (this.msg.content === this.PREFIX + "ici!"){
			chan = this.userChan(this.msg.author);
			if (chan != null)
				chan.join();
		}

		else if (this.msg.content === this.PREFIX + "shh"){

		}
	}

 module.exports = commandes;

commandes.prototype.join = function(channelName) {
	var chanName = channelName;
	var chosenChan = null;
	var listChan = this.bot.channels;

	chosenChan = listChan.find(chan => chan.name === chanName);
	if (chosenChan != null)
		chosenChan.join();
	else
		this.msg.channel.sendMessage("Ce channel n'existe pas.")
}

commandes.prototype.userChan = function(_user){
	var listVChan = this.bot.channels.filter(chan => chan.type === "voice");
	for ([id, vc] of listVChan)
		if(vc.members.first() != null) //liste des voiceChan avec qqu'un dedans
			for (u of vc.members.map(m => m.user))
				if (u.username == _user.username)
					return vc;
	return null;
}
