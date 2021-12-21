let data = require("../../fonctions/database.js");
let chemin = "../database/messages.js";

module.exports = async (reaction, membre) => {
  if(membre.id===reaction.message.author.id||reaction.message.author.bot) return;
  let id = reaction.message.author.id;
  let n = data.getDataRow(chemin,id,0,2);
  data.updateDataRow(chemin,"database/messages.js",id.toString(),0,Number(n+1),2);
}