const client = require('../index')
const { MessageEmbed } = require('discord.js')
const logSchema = require('../models/logs')
client.on("messageDelete", async (message) => {
    if (message.author.bot) return;
    const data = await logSchema.findOne({ Guild: message.guild.id });
    if (!data) return;

    const channel = message.guild.channels.cache.get(data.Channel)

    const embed = new MessageEmbed()

        .setTitle('Message Deleted')
        .setDescription(`Message deleted in <#${message.channel.id}> by **${message.author.tag}** \n ${message.content}`)
        .setTimestamp()
        .setColor('GREEN')

    channel.send({ embeds: [embed] })
})