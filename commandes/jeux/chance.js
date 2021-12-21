module.exports = {
  nom: "chance",
  execute: (message, Discord, options) => {
    let n_alea = Math.floor(Math.random()*10);
    let texte = options[1].split(/ +/);
    if(texte.length==1){
      if(n_alea==1){
        message.channel.send(`**Bravo !!!!**\n${message.author} tu as de la chance`);
      }else{
        message.channel.send(`Le nombre est ${n_alea}`);
      }
    }else{
      for(i=0;i<texte[1];i++){
        n_alea = Math.floor(Math.random()*10);
        if(n_alea==1){
          message.channel.send(`**Bravo !!!!**\n${message.author} tu as de la chance`);
        }else{
          message.channel.send(`Le nombre est ${n_alea}`);
        }
      }
    }
  },
  parametres: {
    verification: false,
    unique: false,
    help: "Renvoie un ou plusieurs nombres au hasard",
    utilisation: "!chance | !chance nombre_itération"
  }
}