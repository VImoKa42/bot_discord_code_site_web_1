let data = require("../../fonctions/database.js");
let fonctions = require("../../fonctions/log.js");

module.exports = (member, Discord, client) => {
  //Base de données
  data.deleteDataRow("../database/messages.js","database/messages.js",member.id,0);

  fonctions.infos("Un membre à quitté la communauté",`${member.user.tag} à quitté la guilde.\nBonne continuation à lui`,client);
}