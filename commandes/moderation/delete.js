let fonctions = require("../../fonctions/log.js");

module.exports = {
  nom: "delete",
  execute: (message, Discord, options) => {
    let nombre = parseInt(options[1].split(/ +/)[1]);

    message.channel.bulkDelete(nombre)
      .then(fonctions.infos("Suppresion de message",`${nombre} messages supprimés`,options[2]))
      .catch(error => console.log(error));
  },
  parametres: {
    verification: true,
    unique: false,
    help: "Supprime un nombre de messages définis",
    utilisation: "!delete nombre"
  }
}