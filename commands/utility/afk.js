const db = require('../../reconDB')

const { MessageEmbed } = require('discord.js')
const { Client, Message, MessageSelectMenu } = require('discord.js')
module.exports = {
    name: 'afk',
    description: 'set afk in the server',
    usage: 'afk <reason>',
    run: async (client, message, args) => {

        const content = args.join(" ") || 'no reason provided'
     
    
        await db.set(`afk - ${message.author.id}+${message.guild.id}`, content)
        const embed = new MessageEmbed()
        .addField('You have been set to afk!', `**Reason:** ${content}`)
      
        .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({ dynamic: true})


        )
        message.channel.send(` ${message.author} **Your afk is set to:** \`${content}\` `)
        message.member.setNickname(`[AFK] ${message.author.username}`).catch(() => { })
    }
}