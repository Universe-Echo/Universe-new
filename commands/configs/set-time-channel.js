const Schema = require('../../models/time-channel')

const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'set-time',
    description: 'set time channel',
    aliases: ['time-set', 'timeset', 'settime', 'timechannelset', 'set-time'],
    cooldown: 5,
    userPermissions: ['ADMINISTRATOR'],
    usage: 'set-time <channel>',

      /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */ 

    run: async (client, message, args) => {

        const channel = message.mentions.channels.first() || client.channels.cache.get(args[0])

        if (!channel) return message.channel.send('**Please provide a channel!**')


        Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (data) {
                data.Channel = channel.id;
                data.save();
            } else {
                new Schema({
                    Guild: message.guild.id,
                    Channel: channel.id
                }).save();

            }
            message.reply(`**${channel} is now set as the time channel!**`)



        })

    }
}