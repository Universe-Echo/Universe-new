const Schema = require('../../models/welcomeChannel')

const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'welcome-channel-set',
    aliases: ['welcome-set', 'welcomeset', 'setwelcome', 'welcomechannelset', 'set-welcome'],
    cooldown: 5,
    userPermissions: ['ADMINISTRATOR'],
    run: async (client, message, args) => {
      
const channel = message.mentions.channels.first()

if(!channel) return message.channel.send('**Please provide a channel!**')


        Schema.findOne({ Guild: message.guild.id}, async(err, data) => {
            if(data) {
                data.Channel = channel.id;
                data.save();
            } else {
               new Schema({
                   Guild: message.guild.id,
                   Channel: channel.id
               }).save();

            }
message.reply(`**${channel} is now set as the welcome channel!**`)



        })

    }
}