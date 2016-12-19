var Discord = require("discord.js");
var bot = new Discord.Client();

bot.on("message", msg => {
    if (msg.content.startsWith("ping")) {
        msg.channel.sendMessage("pong!");
    }
});

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.login("MjU5Njk0MTI3MTQxMjI0NDQ4.CzlFvg.kUTD_6ZvmIlRR07MoC1M0yvjKFI");