let { log } = require("../parametres.json");
let Discord = require("discord.js");

const infos = (titre, texte, client) => {
  let style = new Discord.MessageEmbed()
    .setColor("ORANGE")
    .addField(titre,texte,false)
    .setTimestamp();
  client.channels.cache.get(log).send({ embeds: [style] });
}
const erreur = (titre, texte, client) => {
  let style = new Discord.MessageEmbed()
    .setColor("RED")
    .addField(titre,texte,false)
    .setTimestamp();
  client.channels.cache.get(log).send({ embeds: [style] });
}

const connection = (titre, texte, client) => {
  let style = new Discord.MessageEmbed()
    .setColor("GREEN")
    .addField(titre,texte,false)
    .setTimestamp();
  client.channels.cache.get(log).send({ embeds: [style] });
}

module.exports = {
  infos,
  erreur,
  connection,
}