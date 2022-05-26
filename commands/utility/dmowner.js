const { Client, Message, MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json")
module.exports = {
  name: "dmowner",
  aliases: ['mailowner', 'mail-owner', 'dm-owner', 'report'],
  description: 'dm owner for suggestion or bug report',
  cooldown: 10,
  usage: 'dmowner <message>',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const owner = client.users.cache.get('673846605920600068')
    const dm = new MessageEmbed()
      .setTitle(`${message.author.tag} sent a message!`)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .addField('Server:', `${message.guild.name}`)
      .addField('Message:', `${args.join(" ")}`)
      .setTimestamp()
      .setColor(`${ee.color}`)

    message.channel.send("Message sent!")

    owner.send({ embeds: [dm] }).catch({})
  },
};