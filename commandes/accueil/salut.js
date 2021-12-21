module.exports = {
  nom: "salut",
  execute: (message, Discord, options) => {
    if (message.mentions.members.length>=1) {
      message.reply(`Heureux de te voir ${message.author} et vous aussi ${message.mentions.members.join(',')}`);
    } else {
      message.reply(`Heureux de te voir ${message.author}`);
    }
  },
  parametres: {
    verification: false,
    unique: false,
    help: "Dis salut à l'utilisateur qui l'envoie",
    utilisation: "!salut (@membres)"
  }
}