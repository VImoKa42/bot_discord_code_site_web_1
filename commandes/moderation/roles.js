let fonctions = require("../../fonctions/log.js");

module.exports = {
  nom: "roles",
  execute: (message, Discord, options) => {
    let roles = message.mentions.roles;
    let membres = message.mentions.members;
    let liste = [];
    if(contenu.match(/(true|false)/ig)===false){
      return fonctions.erreur("Erreur : Roles",'Aïe, vous n\'avez pas renseigné le parmètre de méthode');
    }else{
      membres.forEach(membre => {
        liste = [];
        roles.forEach(role => {
          liste.push(role.name);
          if(contenu.match(/true/ig)){
            membre.roles.add(role);
          }else if(contenu.match(/false/ig)){
            membre.roles.remove(role);
          }
        });
        if(contenu.match(/true/ig)){
          return fonctions.infos("Ajout de roles",`Bravo ${membre.displayName},\nTu es passé aux roles ${liste.join(', ')}`,options[2]);
        }else if(contenu.match(/false/ig)){
          return fonctions.infos("Suppresion de roles",`Dommage ${membre.displayName},\nTu as été retirés du roles ${liste.join(', ')}`,options[2]);
        }
      });
    }
  },
  parametres: {
    verification: true,
    unique: false,
    help: "Ajoute ou supprime un ou des roles à un ou plusieurs membres",
    utilisation: "!roles @roles_ou_membres"
  }
}