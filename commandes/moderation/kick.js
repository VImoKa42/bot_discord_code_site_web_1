let fonctions = require("../../fonctions/log.js");

module.exports = {
  nom: "kick",
  execute: (message, Discord, options) => {
    let member = message.mentions.members.first();
    if (!member) {
      return fonctions.erreur("Erreur : kickage",`Utilisateur pas trouvé ou pas spécifié`,options[2]);
    }
    if (!member.kickable) {
      return fonctions.erreur("Erreur : kickage",`L'utilisateur n'est pas kickable`,options[2]);
    }
    member
      .kick()
      .then(() => {
        return fonctions.infos(`Kickage de ${member.user.tag}`,`${member} as été kicked avec succès`,options[2])
      })
      .catch(error => {
        return fonctions.erreur("Erreur de kickage",`Une erreur s'est produite : ${error}\nTu as de la chance ${member.user.tag}`,options[2]);
      });
  },
  parametres: {
    verification: true,
    unique: false,
    help: "Kicked un membre",
    utilisation: "!kick @membre"
  }
}