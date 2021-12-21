let { dependencies } = require("../../package.json");
let { prefix, FLAGS } = require("../../parametres.json");

module.exports = (client) => {
  console.log(`Connection du bot en temps que ${client.user.tag}`);
  console.log(`Prefix: ${prefix}`);
  //console.log(`FLAGS:\n${FLAGS.join('\n')}`)
  console.log(`Discord: ${dependencies["discord.js"]}`);
  console.log(`Canvas: ${dependencies["canvas"]}`);
  console.log(`ffmpeg-static: ${dependencies["ffmpeg-static"]}`);
  console.log(`@discordjs/voice: ${dependencies["@discordjs/voice"]}`);
  console.log(`libsodium-wrappers: ${dependencies["libsodium-wrappers"]}`);
  console.log(`opusscript: ${dependencies["opusscript"]}`);
  console.log(`ytdl-core: ${dependencies["ytdl-core"]}`);
  console.log("Go !");
}