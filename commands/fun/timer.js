const { Client, Message, MessageEmbed } = require('discord.js');

const ms = require('ms');
const ee = require("../../config/embed.json")
module.exports = {
    name: 'timer',
    aliases: ['count', 'countdown', 'cd'],
    description: 'Set a countdown/timer',
    usage: 'timer <duration> <reason>',
    run: async (client, message, args) => {
        const user = client.users.cache.get(message.author.id)
        let time = args[0]

        const syntaxErr = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setTitle('Syntax Error!')
            .addField('Use', '>timer <duration> <reason>')
            .addField('Example:', '>timer 10s idk\n>timer 1h still idk')
        if (!time) return message.channel.send({ embeds: [syntaxErr] })
        const errorembed = new MessageEmbed()
            .setColor("AQUA")
            .setDescription("You can't set your alarm more than 1 day. :x:")
        if (ms(time) > ms("Id")) return message.channel.send({ embeds: [errorembed] })

        let reason = args.slice(1).join(' ') || "No reason provided.";

        const embed = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            
            .setDescription(`Time: \`${time}\`\nReason: \`${reason}\``)
            .setTimestamp()
            .setFooter({
                text: `${ee.footertext}`,
                iconURL: `${ee.footericon}`
              })
              .setColor(`${ee.color}`)
        message.channel.send({ embeds: [embed] })

        setTimeout(() => {
            const embed = new MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                
                .setDescription(`Time: \`${time}\`\nReason: \`${reason}\`\nTimer was set in server: \`${message.guild.name}\``)
                .setTimestamp()
                .setFooter({
                    text: `${ee.footertext}`,
                    iconURL: `${ee.footericon}`
                  })
                  .setColor(`${ee.color}`)
            user.send({ embeds: [embed] })
        }, ms(time))
    }
}