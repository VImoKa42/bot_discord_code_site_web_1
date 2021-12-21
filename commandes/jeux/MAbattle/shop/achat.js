let produits = require('./MAB.json');
let data = require('../../../../fonctions/database.js');
let { prefix } = require('../../../../parametres.json');

module.exports = {
	nom: 'MAachat',
	execute: async (message, Discord, options) => {
		let contenu = options[1].split(/ +/);
		let i = produits.map((n) => n.name).indexOf(contenu.join(' ').substring(prefix.length + 'MAachat'.length + 1));
		let n = produits[i];
    let tab = data.getAllDataRow('../database/MAB.js', options[0].id, 0);
    if (n.monnaie == 'gemmes') {
      if (tab[2] > n.prix) {
        data.updateDataRow('../database/MAB.js','database/MAB.js',options[0].id,0,tab[2] - n.prix,2);
        data.updateAllDataRow('../database/MAshop.js', 'database/MAshop.js', options[0].id, 0, [options[0].id,`${data.getDataRow('../database/MAshop.js', options[0].id, 0, 1)}|${n.name}`]);
        return message.channel.send(`Vous débloquez ${n.name}`);
      } else {
        return message.reply("Tu n'as pas assez de gemmes pour acheter cette objet");
      }
    } else if (n.monnaie == 'pièces') {
      if (tab[1] > n.prix) {
        data.updateDataRow('../database/MAB.js','database/MAB.js',options[0].id,0,tab[1] - n.prix,1);
        data.updateAllDataRow('../database/MAshop.js', 'database/MAshop.js', options[0].id, 0, [options[0].id,`${data.getDataRow('../database/MAshop.js', options[0].id, 0, 1)}|${n.name}`]);
        return message.channel.send(`Vous débloquez ${n.name}`);
      } else {
        return message.reply("Tu n'as pas assez de pièces pour acheter cette objet");
      }
    }
	},
	parametres: {
		verification: false,
		unique: false,
		help: 'Achat d\'un article du shop',
		utilisation: '!MAachat article'
	}
};
