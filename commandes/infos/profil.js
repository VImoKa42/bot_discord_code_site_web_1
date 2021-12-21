let data = require("../../fonctions/database.js");
let { palier } = require("../../parametres.json");

module.exports = {
  nom: "profil",
  execute: (message, Discord, options) => {
    let membre = message.mentions.members.first() || options[0];
    //let n = data.getAllDataRow("../database/messages.js",membre.id,0);

    let style = new Discord.MessageEmbed()
      .setTitle(`Profil de ${membre.username}`)
      //.setDescription(`Level : **${Math.floor(n[1]/palier)}**`)
      .setColor("PURPLE")
      .setImage(membre.displayAvatarURL({ format: "png", size: 96 }))
      //.addField("__Statistiques__:",`Messages: ${n[1]}\nRéactions: ${n[2]}`)
      .addField("__Middle Age Battle__:",`${data.getAllDataRow("../database/MAB.js",membre.id,0).join('\n')}`)
      .setTimestamp();
    
    message.channel.send({embeds: [style]});
  },
  parametres: {
    verification: false,
    unique: false,
    help: "Affiche le profil d'un membre",
    utilisation: "!profil @membre"
  }
}