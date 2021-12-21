let fonctions = require("../../fonctions/log.js");

module.exports = {
  nom: "bienvenue",
  execute: (member, Discord, client) => {
    let bienvenue = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTitle(`Bienvenue sur le serveur ${member.displayName}`, member.displayAvatarURL())
      .addField("Bienvenue jeune codeur,\nEs-tu prêt à rentrer dans le monde fantastique de la programmation ?")
      .setImage("https://library.kissclipart.com/20180922/hww/kissclipart-html-javascript-clipart-javascript-html-cascading-b4d968ca6d74fac0.jpg")
      .addField("As surmonter les défis, résoudre les exos et **gagnés les compéttions (*Battle Of Code*)** ?")
      .addField("**__Oui__** !!!!!!!")
      .setFooter("*#Serveur*")
      .setTimestamp();
    client.channels.cache.get("916801385771696221").send({embeds: [bienvenue]});
    fonctions.connection("Nouveau membre",`${member.displayName} est arrivé dans la communauté`,client);
  },
  parametres: {
    help: "Souhaite la bienvenue à un nouveau membre",
    utilisation: "/"
  }
}