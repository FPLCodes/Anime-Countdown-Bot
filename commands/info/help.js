const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  category: "info",
  permissions: [],
  devOnly: false,
  run: async ({ client, message, args }) => {
    const embed = new MessageEmbed()
      .setColor("#808080")
      .setTitle("INSTRUCTIONS")
      .setDescription(
        "After the prefix `ani`, type `cd` followed by the anime title"
      )
      .addField("Example", "`ani cd spy x family`")
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};
