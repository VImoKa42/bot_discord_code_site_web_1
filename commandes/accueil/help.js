let { commandes } = require("../../fichiers.json");
let { prefix } = require("../../parametres.json");

module.exports = {
  nom: "help",
  execute: (message, Discord, options) => {
    let fields = [];
    if(options[1].split(/ +/).length === 1){
      for (const url of commandes) {
        let commande = require(`../../${url}`);
        let texte = "";
        if(commande.parametres.verification){
          texte = ` (admin)`;
        }
        fields.push(`**${commande.nom}${texte}**\n${commande.parametres.utilisation}`);
      }
      let style = new Discord.MessageEmbed()
        .setTitle("Commandes du serveur")
        .setAuthor("Admin", "https://cdn.discordapp.com/avatars/915606269753167924/c27af8445b45f1a04cf651e0b83aecca.png?size=80")
        .setColor("#ec4040")
        .setDescription("Liste des commandes des bots, avec explication de son retour lors d'une éxécution")
        .addField("__**Infos**__:",`Prefix: ${prefix}\nNom: ${options[2].user.tag}`)
        .addField("__**Commandes**__:",fields.sort((a,b) => a - b).join('\n'))
        .setTimestamp()
        .setFooter("Bot crée par Vincent -", "https://cdn.discordapp.com/avatars/915606269753167924/c27af8445b45f1a04cf651e0b83aecca.png?size=80");
      return message.channel.send({embeds: [style]});
    }else{
      let commande = options[1].split(/ +/)[1]
      let style = new Discord.MessageEmbed()
        .setTitle("Commandes du serveur")
        .setAuthor("Admin", "https://cdn.discordapp.com/avatars/915606269753167924/c27af8445b45f1a04cf651e0b83aecca.png?size=80")
        .setColor("#ec4040")
        .setDescription("Liste des commandes des bots, avec explication de son retour lors d'une éxécution")
        .addField("__**Infos**__:",`Prefix: ${prefix}\nNom: ${options[2].user.tag}`)
        .addField("__**Commandes**__:",fields.sort((a,b) => a - b).join('\n'))
        .setTimestamp()
        .setFooter("Bot crée par Vincent -", "https://cdn.discordapp.com/avatars/915606269753167924/c27af8445b45f1a04cf651e0b83aecca.png?size=80");
      return message.channel.send({embeds: [style]});
    }
  },
  parametres: {
    verification: false,
    unique: true,
    help: "Affiche les commandes du bot",
    utilisation: "!help | !help commande"
  }
}