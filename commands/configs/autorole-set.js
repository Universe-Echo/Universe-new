const { Client, MessageEmbed, Message } = require('discord.js')
const Schema = require('../../models/autorole')
module.exports = {
  name: 'autorole-set',
  description: 'set autorole',
  aliases: ['autorole-add', 'set-autorole'],
  cooldown: 5,
  userPermissions: ['MANAGE_ROLES'],
  botPermissions: ['ADMINISTRATOR'],
  usage: 'autorole-set <role>',
  run: async (client, message, args) => {


    const role = message.mentions.roles.first() || await message.guild.roles.fetch(args[0]);

    if (!role) return message.reply('**Please specify a valid role!**')

    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (data) data.delete();
      new Schema({
        Guild: message.guild.id,
        ROLE: role.id,
      }).save();
      message.channel.send({ embeds: [new MessageEmbed().setDescription(`<a:tick:940504379339993128> ${role} has been successfully set for autorole.`).setColor('BLUE')] })
    })
    //await db.save(`autorole-${message.guild.id}, ${role.id}`)







  }
}
