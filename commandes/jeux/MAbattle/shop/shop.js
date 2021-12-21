let produits = require('./MAB.json');
let data = require('../../../../fonctions/database.js');
let { prefix } = require('../../../../parametres.json');

module.exports = {
	nom: 'MAshop',
	execute: async (message, Discord, options) => {
		let contenu = options[1].split(/ +/);
		console.log(contenu.length);
		let style = new Discord.MessageEmbed().setTitle('Shop de Middle Age Battle');
		if (contenu.length > 1) {
			let i = produits
				.map((n) => n.name)
				.indexOf(contenu.join(' ').substring(prefix.length + 'MAshop'.length + 1));
			if (i != -1) {
				let n = produits[i];
				let a = n.add.join('\n');
				style.addField(n.name, `*${n.description}*\nPrix: **${n.prix}** ${n.monnaie}\n${a}`);
				message.channel.send({ embeds: [ style ] });
        message.channel.send(`Pour acheter cette objet.\nTapez \`oui\``);
        const msg_filter = (m) => m.author.id === message.author.id;
        message.channel.awaitMessages({ filter: msg_filter, max: 1 })
          .then((collected) => {
            let m = collected.first();
            if(m.content==="oui"){
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
            }
          })
          .catch(() => {
            return message.channel.send("Pour confirmer un achat, tapez `oui` !!")
          });
			} else {
				return message.channel.send("L'article demandé n'est pas valide");
			}
		} else {
			produits.map((n) => style.addField(n.name, `*${n.description}*\nPrix: **${n.prix}** ${n.monnaie}`));
			return message.channel.send({ embeds: [ style ] });
		}
	},
	parametres: {
		verification: false,
		unique: false,
		help: 'Shop du serveur',
		utilisation: '!MAshop | !MAshop article'
	}
};
