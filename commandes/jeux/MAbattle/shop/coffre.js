let data = require("../../../../fonctions/database.js");

module.exports = {
	nom: 'MAcoffre',
	execute: (message, Discord, options) => {
		message.channel.send("Voulez-vous acheter un coffre à `15`pièces ?\nSi oui, tapez `oui` !");
    const msg_filter = (m) => m.author.id === message.author.id;
    message.channel.awaitMessages({ filter: msg_filter, max: 1 })
      .then((collected) => {
        if(collected.first().content==="oui"){
          let tab = [["Pièces",Math.floor(Math.random()*10)+10],["XP",Math.floor(Math.random()*20)+15]];
          let i = Math.floor(Math.random()*tab.length);
          data.updateDataRow("../database/MAB.js","database/MAB.js",options[0].id,0,data.getDataRow("../database/MAB.js",options[0].id,0,1)-15,1);
          if(i==0){
            data.updateDataRow("../database/MAB.js","database/MAB.js",options[0].id,0,data.getDataRow("../database/MAB.js",options[0].id,0,1),1);
          }else{
            data.updateDataRow("../database/MAB.js","database/MAB.js",options[0].id,0,data.getDataRow("../database/MAB.js",options[0].id,0,3),3);
          }
          return message.channel.send(`Tu as gagné ${tab[i][1]} ${tab[i][0]}`);
        }
      })
      .catch(() => {
        return message.channel.send("Pour confirmer l'achat, tapez `oui` !");
      });
	},
	parametres: {
		verification: false,
		unique: true,
		help: "Achete un coffre",
		utilisation: '!MAcoffre'
	}
};