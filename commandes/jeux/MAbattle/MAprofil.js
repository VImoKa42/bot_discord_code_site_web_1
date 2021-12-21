let Canvas = require('canvas');
let data = require("../../../fonctions/database.js");
let { XP } = require("../../../parametres.json");

module.exports = {
  nom: "MAprofil",
  execute: async (message, Discord, options) => {
    let joueur = message.mentions.members.first() || options[0];
    let nom = message.mentions.members.first() || options[0];
    let tab = data.getAllDataRow("../database/MAB.js",joueur.id,0);
    let equipement = data.getAllDataRow("../database/MAshop.js",joueur.id,0);
    let width = Math.floor(400 * (tab[3] / ((Math.floor(tab[3] / XP) + 1) * XP)));

    let canvas = Canvas.createCanvas(850, 550 + (equipement[1].split('|').length * 80));
    let ctx = canvas.getContext('2d');
    //Arrière-plan
	  let background = await Canvas.loadImage('https://www.pixelstalk.net/wp-content/uploads/2016/05/Photos-Download-Black-Backgrounds.jpg');
	  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    //Avatar
    let avatar = await Canvas.loadImage(joueur.displayAvatarURL({ format: 'jpg' }));
	  ctx.drawImage(avatar, 50, 50, 200, 200);
    //Nom
    ctx.font = "80px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText(nom.username,300,100);
    //Niveau
    ctx.font = "40px sans-serif";
    ctx.fillText(`Joueur de niveau ${Math.floor(tab[3] / XP)}`, 315, 175);
    //Barre de progression
    ctx.strokeStyle = "#fff";
    ctx.strokeRect(320, 210, 410, 75);
    ctx.fillStyle = "orange";
    ctx.fillRect(325, 215, width, 65);
    ctx.font = "40px Calibri"
    ctx.fillStyle = "#fff";
    ctx.fillText(`${tab[3]}/${(Math.floor(tab[3] / XP) + 1) * XP}`, (325 + (width / 2)) - 50, 260);
    //Statistiques
    ctx.font = "50px Arial";
    ctx.fillText("Trophée:", 50, 345);
    ctx.font = "40px Calibri";
    ctx.fillText(`XP: ${tab[3]}\nPièces d'or: ${tab[1]}\nGemmes: ${tab[2]}`, 60, 400);
    ctx.font = "50px Arial";
    ctx.fillText("Combat:", 360, 345);
    ctx.font = "40px Calibri";
    ctx.fillText(`Participation: ${tab[4] + tab[5]}\nGagné: ${tab[4]}\nPerdu: ${tab[5]}`, 370, 400);
    //Equipement
    if(equipement[1].split('|').length!=0){
      ctx.font = "50px Arial";
      ctx.fillText("Equipement:",50,570);
      ctx.font = "40px Calibri";
      ctx.fillText(equipement[1].split('|').join('\n'),50,615);
    }

    let attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'profil.png');

    message.channel.send({ files: [attachment] });
  },
  parametres: {
    verification: false,
    unique: true,
    help: "Profil de l'utilisateur",
    utilisation: "!MAprofil"
  }
}