const { Client, Message, MessageEmbed } = require("discord.js");
const ee = require('../../config/embed.json')
module.exports = {
  name: "firstmessage",
  description: "get the first message in the channel",
  aliases: ["firstmsg"],
  cooldown: 5,
  usage: 'firstmessage',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const fetchMessages = await message.channel.messages.fetch({
      after: 1,
      limit: 1,
    });
    const msg = fetchMessages.first();

    message.reply(
      {
        embeds: [new MessageEmbed()
          .setAuthor(message.guild.name)
          .setTitle(`First Messsage in ${message.guild.name}`)
          .setURL(msg.url)
          .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
          .setDescription("Content: " + msg.content)
          .addField("Author", msg.author.tag, true)
          .addField('Message ID', msg.id, true)
          .addField('Created At', msg.createdAt.toLocaleDateString(), true)
          .setFooter({
            text: `${ee.footertext}`,
            iconURL: `${ee.footericon}`
          })]
      }

    );
  },
};
