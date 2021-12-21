let ytdl = require("ytdl-core");
let fonctions = require("../../fonctions/log.js");

module.exports = {
  nom: "audio",
  execute: async (message, Discord, options) => {
    if(!message.guild) return;

    if(message.author.voice.channel){
      let connection = await message.author.voice.channel.join();
      let dispatcher = connection.play(ytdl(options[1].split(/ +/)[1]), {
        volume: 0.5
      });

      dispatcher.on('start', () => {
        message.client.user.setActivity("Musique", { type: "LISTENING" });
      });

      dispatcher.on('error', () => {
        fonctions.erreur("Erreur","Lien invalide");
        dispatcher.destroy();
        message.member.voice.channel.leave();
      })

      dispatcher.on('finish', () => {
        dispatcher.destroy();
        message.member.voice.channel.leave();
      })
    }else{
      message.reply("Vous n'êtes pas connecté à un salon vocal");
    }
  },
  parametres: {
    verification: false,
    unique: false,
    help: "Joue une musique",
    utilisation: "!audio url"
  }
}