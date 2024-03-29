const { MessageEmbed } = require('discord.js')
const { formatDate } = require('../../function')
const moment = require('moment');
const ee = require("../../config/embed.json")
module.exports = {
  name: 'oldest',
  description: 'Shows the oldest account in the server',
  cooldown: 5,
  usage: 'oldest',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    let mem = message.guild.members.cache.filter(m => !m.user.bot).sort((a, b) => a.user.createdAt - b.user.createdAt).first()

    const embed = new MessageEmbed()
      .setTitle(`Oldest member in ${message.guild.name}`)
      .setColor(`${ee.color}`)
      .setDescription(`**${mem.user.tag}** is the oldest member in **${message.guild.name}**\n**Acount Creation Date:** ${formatDate(mem.user.createdAt)}\n**Join Date:** ${moment(mem.joinedAt).format("MMMM Do YYYY, HH:mm:ss")}`)
      .setFooter({
        text: `${ee.footertext}`,
        iconURL: `${ee.footericon}`
      })
    message.channel.send({ embeds: [embed] })
  }
}