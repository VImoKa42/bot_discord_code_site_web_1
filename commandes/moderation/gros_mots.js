let fonctions = require("../../fonctions/log.js");

module.exports = {
  nom: "gros_mots",
  execute: (message, Discord, options) => {
    let contenu = options[1];
    if(contenu.match(/(Merde|Con)/ig)){
      return message.reply(`**Avertissement** ${message.author}  :face_with_symbols_over_mouth:\nTon vocabulaire !!!`);
    }else if(contenu.match(/(Connard|Salaud|Putain|Nique ta mère)/ig)){
      let member = message.author;
      if (!member) {
        return fonctions.erreur("Erreur : kickage","Utilisateur pas trouvé ou pas spécifié",options[2]);
      }
      if (!member.kickable) {
        return fonctions.erreur("Erreur : kickage","L'utilisateur n'est pas kickable",options[2]);
      }
      member
        .kick()
        .then(() => {
          return fonctions.infos(`Kickage de ${member.user.tag}`,`${member} as été kicked avec succès`,options[2])
        })
        .catch(error => {
          return fonctions.erreur("Erreur de kickage",`Une erreur s'est produite : ${error}\nTu as de la chance ${member.user.tag}`,options[2]);
        });
    }
  },
  parametres: {
    verification: false,
    unique: false,
    help: "S'occupe de punir les gros mots dans les messages",
    utilisation: "/"
  }
}