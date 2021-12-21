let fs = require("fs");
let Discord = require("discord.js");
let client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});

//Infos
let { prefix, log } = require("./parametres.json");

//Ajout commandes
client.commands = new Discord.Collection();
let commandes = fs.readdirSync("./commandes").filter(file => file.endsWith(".js"));

for (const commande of commandes) {
    let file = require(`./commandes/${commande}`);
    client.commands.set(file.nom, file);
    console.log(`la commande ${file.nom} est chargé`);
}

//Evenements
client.once("ready", () => require("./evenements/ready.js")(client));

client.on("messageCreate", (message) => require("./evenements/messageCreate.js")(message, prefix, Discord, client, log));

client.login(process.env.TOKEN);