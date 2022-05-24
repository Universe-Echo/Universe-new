const { MessageEmbed } = require('discord.js')
const ee = require('../../config/embed.json')

module.exports = {
    name: 'anna',
    aliases: ['dumbo'],
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
                iconURL: `${ee.footerav}`

            })
            .setColor(ee.color)

        message.channel.send({ embeds: [embed] })

    }
}