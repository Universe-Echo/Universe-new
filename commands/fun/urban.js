const { Client, Message, MessageEmbed } = require('discord.js');
const urban = require('relevant-urban');
const ee = require("../../config/embed.json")

module.exports = {
    name: 'urban',
    aliases: ['urb'],
    cooldown: 5,
    description: 'search something from urban dictionary!',
    usage: 'urban <query>',
    category: 'fun',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args, err, color) => {

        if (!args.length) {

            const word = await urban.random()

            message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(color)
                        .setTimestamp()
                        .setTitle(`"${word.word}"`)
                        .setURL(`${word.urbanURL}`)
                        .setDescription(`\`\`\`${word.definition}\`\`\``)
                        .addField(`Example`, `*${word.example}*`)
                        .setFooter({
                            text: `${ee.footertext}`,
                            iconURL: `${ee.footericon}`
                          })
                ]
            })

        } else {
            try {
                const word = await urban(`${args.join(" ")}`)
                message.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(color)
                            .setTimestamp()
                            .setTitle(`"${word.word}"`)
                            .setURL(`${word.urbanURL}`)
                            .setDescription(`\`\`\`${word.definition}\`\`\``)
                            .addField(`Example`, `*${word.example}*`)
                            .setFooter({
                                text: `${ee.footertext}`,
                                iconURL: `${ee.footericon}`
                              })
                    ]
                })
            } catch (error) {
                message.channel.send('**No results from the urban dictionary.. sry**')
            }

        }

    }
}