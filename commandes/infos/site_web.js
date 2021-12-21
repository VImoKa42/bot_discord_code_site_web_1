module.exports = {
  nom: "site",
  execute: (message, Discord, options) => {
    let ligne = new Discord.MessageActionRow()
      .addComponents(new Discord.MessageButton()
        .setLabel('Site Web')
        .setStyle('LINK')
        .setURL('https://discord.com/channels/916801385771696218/916801385771696221')
      );
    message.channel.send({ content: "Clique sur le bouton pour aller dans le fil de discussion.", components: [ligne]});
  },
  parametres: {
    verification: false,
    unique: true,
    help: "Envoie un lien vers le salon de discussion",
    utilisation: "!site"
  }
}