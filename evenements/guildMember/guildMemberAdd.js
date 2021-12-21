let data = require("../../fonctions/database.js");

module.exports = (member, Discord, client) => {
  //Base de données
  data.setDataRow("../database/messages.js","database/messages.js");
  data.setDataRow("../database/MAB.js","database/MAB.js");

  client.commands.get("bienvenue").execute(member, Discord, client);
}