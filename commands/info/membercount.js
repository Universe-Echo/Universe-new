const { MessageEmbed } = require('discord.js');
const ee = require("../../config/embed.json")
module.exports = {
  name: 'membercount',
  description: 'get member count',
  aliases: ['mc', 'memberscount'],
  cooldown: 5,
  usage: 'membercount',
  run: async (client, message, args) => {
    let embed = new MessageEmbed()
      .setTitle(`${message.guild.name}`)
      .setDescription(`**__Total members__ **: **${message.guild.memberCount}**`)
      .setColor(`${ee.color}`)
      .setFooter({
        text: `${ee.footertext}`,
        iconURL: `${ee.footericon}`
      })
    //  .setThumbnail(message.guild.iconURL({ size: 4096, dynamic: true }))

    //  .setTimestamp()
    message.channel.send({ embeds: [embed] })
  }
}