let data = require("../../fonctions/database.js");

module.exports = (message, Discord, client) => {
  //Variables
  let contenu = message.content;
  if(message.author.bot) return;
  let options = [message.author, contenu, client];
  let { prefix } = require("../../parametres.json");
  let commande = contenu.split(/ +/);
  let { log } = require("../../parametres.json");

  //Modération placement messages
  if(message.channel.id==log) return message.delete()
    .then(() => console.log('message supprimé'))
    .catch(error => console.log(error));

  //Nombres messages
  /*let id = options[0].id;
  let chemin = "../database/messages.js";
  let n = data.getDataRow(chemin,id,0,1);
  data.updateDataRow(chemin,"database/messages.js",id,0,n+1,1);*/

  //Commande ?
  if(!commande[0].match(prefix)) return;

  //Commandes ayant plusieurs déclencheurs
  //Salut
  if(contenu.match(/!(Salut|Bonjour|Yo|Hello)/ig)){
    client.commands.get("salut").execute(message, Discord, options);
  }
  //Gros mots
  if(contenu.match(/(Merde|Con|Connard|Salaud|Putain|Nique ta mère)/ig)){
    client.commands.get("gros_mots").execute(message, Discord, options);
  }

  if(commande[0].substring(prefix.length)==="salut") return;
  if(!client.commands.has(commande[0].substring(prefix.length)) || commande[0].match(/(CR|ClashRoyale)/ig)) return message.channel.send("Nom de commande invalide");

  let command = client.commands.get(commande[0].substring(prefix.length));
  if(command.parametres.unique && contenu===`${prefix}${command.nom}`){
    if(command.parametres.verification){
      if(auteur.id==="915606269753167924" || auteur.id==="498160577294762004"){
        command.execute(message, Discord, options);
      }else{
        message.reply("Tu n'as pas les droits pour executer cette commande");
      }
    }else{
      command.execute(message, Discord, options);
    }
  }else{
    command.execute(message, Discord, options);
  }
}