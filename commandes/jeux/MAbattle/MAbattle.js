let data = require("../../../fonctions/database.js");

module.exports = {
  nom: "MAbattle",
  execute: (message, Discord, options) => {
    let { chevalier } = require("./profil.json");
    let { ennemis } = require("./ennemis.json");
    let player = options[0];
    let chemin = "../database/MAB.js";
    let tab = data.getAllDataRow(chemin,player.id,0);
    let { XP } = require("../../../parametres.json");
    let mechant;

    let index = Math.round(Math.random()*ennemis.length);
    mechant = ennemis[index];

    message.client.user.setActivity("Middle Age Battle", { type: "PLAYING" });

    let add = data.getAllDataRow("../database/MAshop.js",player.id,0);

    let profil = new Discord.MessageEmbed()
      .setTitle("Profil")
      .setColor("ORANGE")
      .setAuthor(`${chevalier.nom}`,`${chevalier.images}`)
      .setDescription(chevalier.description)
      .addField("**Infos:**",`*Nom:* ${chevalier.nom}\n*Force:* ${chevalier.force}\n*Vitesse:* ${chevalier.vitesse}\n*Vie:* ${chevalier.vie}\n*Endurance:* ${chevalier.endurance}\n`)
      .addField("**Joueur**",`*XP:* ${tab[3]}\n${add[1].split('|').join('\n')}`)
      .addField("**Equipements:**",`*Armes:*\n${(chevalier.equipement.armes).join('\n')}\n\n*Protection:*\n${(chevalier.equipement.protection).join('\n')}`)
      .setFooter("#battle");
    message.channel.send({embeds: [profil]});

    let adversaire = new Discord.MessageEmbed()
      .setTitle("Profil")
      .setColor("ORANGE")
      .setAuthor(`${mechant.nom}`,`${mechant.images}`)
      .setDescription(mechant.description)
      .addField("**Infos:**",`*Nom:* ${mechant.nom}\n*Force:* ${mechant.force}\n*Vitesse:* ${mechant.vitesse}\n*Vie:* ${mechant.vie}\n*Endurance:* ${mechant.endurance}\n`)
      .addField("**Equipements:**",`*Armes:*\n${(mechant.equipement.armes).join('\n')}\n*Protection:*\n${(mechant.equipement.protection).join('\n')}`)
      .setFooter("#battle");
    message.channel.send({embeds: [adversaire]});

    let a = Number();
    let t = add[1].split('|');
    let shop = require("./shop/MAB.json");
    for(i=0;i<t.length;i++){
      let article = shop[shop.map(n => n.name).indexOf(t[i])];
      console.log(article);
      (article.add).forEach(e => {
        if(e.substring(0,5)==="Force"){
          chevalier.force += Number(e.substring(e.length-1));
        }else{
          a += Number(e.substring(e.length-1));
        }
      });
    }

    let m_ressource = chevalier.force + chevalier.vie + chevalier.endurance + chevalier.vitesse + Math.floor(tab[3]/10) + a;
    let e_ressource = mechant.force + mechant.vie + mechant.endurance + mechant.vitesse + Math.floor(tab[3]/XP);

    message.channel.send(`${chevalier.nom}: ${m_ressource} XP\n${mechant.nom}: ${e_ressource} XP`);
    for(i=0;e_ressource > 0 && m_ressource > 0;i++){
      m_ressource -= mechant.force;
      e_ressource -= chevalier.force;
      if(e_ressource <= 0){
        message.reply(`Bravo ${player} !!!\nTu as gagné ton combat contre ${mechant.nom}, il te reste ${m_ressource} XP. Tu as gagné ${mechant.recompenses.gemmes} gemme(s), ${mechant.recompenses.pieces} pièces d'or et ${mechant.recompenses.XP + Math.floor((m_ressource - e_ressource) / 5)} XP.`);
        tab[1] += mechant.recompenses.pieces;
        tab[2] += mechant.recompenses.gemmes;
        tab[3] += mechant.recompenses.XP + Math.floor((m_ressource - e_ressource) / 5);

        data.updateDataRow(chemin,"database/MAB.js",player.id,0,tab[1],1);
        data.updateDataRow(chemin,"database/MAB.js",player.id,0,tab[2],2);
        data.updateDataRow(chemin,"database/MAB.js",player.id,0,tab[3],3);
        data.updateDataRow(chemin,"database/MAB.js",player.id,0,tab[4]+1,4);

        return message.channel.send(`**__Infos__:**\nPièces: ${tab[1]}\nGemmes: ${tab[2]}\nXP: ${tab[3]}`);
      }else if(m_ressource <= 0){
        data.updateDataRow(chemin,"database/MAB.js",player.id,0,data.getDataRow(chemin,player.id,0,3)-1,3);
        data.updateDataRow(chemin,"database/MAB.js",player.id,0,tab[5]+1,5);
        return message.reply(`Dommage ${player}, tu as perdu ta bataille`);
      }else{
        message.channel.send(`Tour ${i+1}: Le combat est acharné, ${mechant.nom} attaque mais ${chevalier.nom} réponds par une frappe puissante.\n${mechant.nom}: ${e_ressource} XP\n${chevalier.nom}: ${m_ressource} XP`);
      }
    }
  },
  parametres: {
    verification: true,
    unique: false,
    help: "Jeu de bataille et de chance",
    utilisation: "!MAbattle"
  }
}