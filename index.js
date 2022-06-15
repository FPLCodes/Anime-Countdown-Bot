const Discord = require("discord.js");
require("dotenv").config();

const TOKEN =
  "ODU0MjIwMTg3MTAwNTEyMjY2.G1Bdr-.7OkGGxo6G9Eh4tlc5lVMrxUE5Z1PD4tDpnc2rY";

const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES"],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.content == "hi") {
    message.reply("Hello world!");
  }
});

client.login(process.env.TOKEN);
