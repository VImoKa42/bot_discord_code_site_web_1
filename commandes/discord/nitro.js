module.exports = {
  nom: "nitro",
  execute: (message, Discord, options) => {
    let code = () => {
      let t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let c = [];
      for (let i = 0; i < 16; i++) {
        c.push(t.split('')[Math.floor(Math.random()*t.length)]);
      }
      return c.join('');
    }
    let ligne = new Discord.MessageActionRow()
      .addComponents(new Discord.MessageButton()
        .setLabel('Nitro')
        .setStyle('LINK')
        .setURL(`http://discord.gift/${code()}`)
      );
    message.channel.send({ content: "Clique sur le bouton pour aller vers un lien pour les nitros.", components: [ligne]});
  },
  parametres: {
    verification: false,
    unique: true,
    help: "Génére un lien pour avoir des nitro",
    utilisation: "!nitro"
  }
}