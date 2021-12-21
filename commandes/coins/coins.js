let data = require("../../fonctions/database.js");

module.exports = {
  nom: "coins",
  execute: async (message, Discord, options) => {
    let tab = await data.getAllDataRow("../database/shop.js",options[0].id,0);
    let jour = 8.64e+7;
    let time = jour - (Date.now() - tab[2]);
    if(time > 0){
      return message.channel.send(`${options[0]}, tu as déjà récupéré les VICoins de ta journée\nIl te reste ${Math.floor(time / (1000*Math.pow(60,2)) % 24)}h ${Math.floor(time / (1000*Math.pow(60,1)) % 60)}m ${Math.floor(time / 1000 % 60)}s avant de pouvoir récupérer ton VICoins`);
    }else{
      data.updateAllDataRow("../database/shop.js","database/shop.js",options[0].id,0,[options[0].id,tab[1]+10,Date.now()]);
      return message.reply(`Tu as ${tab[1]+10} VICoins`);
    }
  },
  parametres: {
    verification: false,
    unique: true,
    help: "Permet de récupérer du VICoins",
    utilisation: "!coins"
  }
}