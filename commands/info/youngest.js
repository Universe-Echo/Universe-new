const { formatDate } = require('../../function');
const { MessageEmbed } = require('discord.js')
const moment = require('moment')
module.exports = {
  name: 'youngest',
  description: 'Shows the youngest account in the server',
  cooldown: 5,
usage: 'youngest',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    let mem = message.guild.members.cache.filter(m => !m.user.bot).sort( (a,b) => b.user.createdAt - a.user.createdAt).first()

    const embed = new MessageEmbed()
    .setTitle(`Youngest member in ${message.guild.name}`)
    .setColor("RANDOM")
    .setDescription(`**${mem.user.tag}** is the youngest member in **${message.guild.name}**\n**Account Creation Date:** ${formatDate(mem.user.createdAt)}\n**Join Date:** ${moment(mem.joinedAt).format("MMMM Do YYYY, HH:mm:ss")}`)

    message.channel.send({ embeds: [embed] })
  }
}