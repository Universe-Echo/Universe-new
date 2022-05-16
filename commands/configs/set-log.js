const { MessageEmbed, Permissions } = require('discord.js');
const Schema = require('../../models/logs');

module.exports = {
  name: 'messageLogs',
  description: 'set message logs',
  aliases: ['setlog', 'setlogs', 'logsset', 'log-set', 'logs-set', 'set-log', 'set-messagelogs'],
  cooldown: 5,
  usage: 'set-messageLogs <channel>',
  userPermissions: ['ADMINISTRATOR'],
  run: async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send({ content: 'You cant use this command' })
    const channel = message.mentions.channels.first()

    if (!channel) return message.channel.send({ content: 'mention a channel to set the logs' })

    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (data) data.delete();
      new Schema({
        Guild: message.guild.id,
        Channel: channel.id,
      }).save();
      message.channel.send({ embeds: [new MessageEmbed().setDescription(`<a:tick:940504379339993128> ${channel} has been successfully set as messagelogs channel. All logs will be sent there`).setColor('BLUE')] })
    })
  }
}