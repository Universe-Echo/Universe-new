const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "bug",
  aliases: ['suggest', 'error'],
  description: 'report a bug',
  cooldown: 10,
  usage: 'bug',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const bugEmbed = new MessageEmbed()
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setTitle('Found a bug or wanna suggest something?')
      .setDescription('do `>dmowner <message>` this will send a dm to my owner with your message')
      .addField('Example:', `>dmowner found bug in help command`)
      .setFooter(client.user.tag)

    message.reply({ embeds: [bugEmbed] })
  },
};