const { MessageEmbed } = require('discord.js')
const ee = require('../../config/embed.json')

module.exports = {
    name: 'dumbo',
    aliases: ['anna'],
    devOnly: true,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */

    run: async (client, message, args) => {

        const embed = new MessageEmbed()
            .setDescription('is ananya')
            .setFooter({
                text: `${ee.footertext}`,
                iconURL: `${ee.footericon}`

            })
            .setColor(ee.color)

        message.channel.send({ embeds: [embed] })

    }
}