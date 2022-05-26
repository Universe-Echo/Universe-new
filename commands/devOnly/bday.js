const b = require("../../config/bday.json")
const { Client, Message, MessageEmbed } = require("discord.js");
const emoji = require('../../config/emojis.json')
const ee = require('../../config/embed.json')
module.exports = {
    name: "bday",
    aliases: ['birthday'],
    devOnly: true,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const query1 = args[0]

        if (!query1) return message.reply('**whose bday do you want?**')

        const query = query1.toLowerCase()
        try {
            if (query === 'piyush') {
                const embed = new MessageEmbed()
                    .setTitle(`${query}'s bday ${emoji.msg.butterfly_1}`)

                    .setDescription(`**${b.piyush}**`)
                    .setImage('https://cdn.discordapp.com/attachments/849306112694943804/979091113673625690/bday1.png')
                    .setColor(`${ee.color}`)
                    .setFooter({
                        text: `bdays of special ppl :)\n${ee.footertext}`,
                        iconURL: `${ee.footericon}`
                    })
                message.channel.send({ embeds: [embed] })
            }
            else if (query === 'ananya') {
                const embed = new MessageEmbed()
                    .setTitle(`${query}'s bday ${emoji.msg.butterfly_1}`)
                    .setDescription(`**${b.ananya}**`)
                    .setImage('https://cdn.discordapp.com/attachments/849306112694943804/979091113673625690/bday1.png')
                    .setColor(`${ee.color}`)
                    .setFooter({
                        text: `bdays of special ppl :)\n${ee.footertext}`,
                        iconURL: `${ee.footericon}`
                    })
                message.channel.send({ embeds: [embed] })
            }
            else if (query === 'harsh') {
                const embed = new MessageEmbed()
                    .setTitle(`${query}'s bday ${emoji.msg.butterfly_1}`)
                    .setDescription(`**${b.harsh}**`)
                    .setImage('https://cdn.discordapp.com/attachments/849306112694943804/979091113673625690/bday1.png')
                    .setColor(`${ee.color}`)
                    .setFooter({
                        text: `bdays of special ppl :)\n${ee.footertext}`,
                        iconURL: `${ee.footericon}`
                    })
                message.channel.send({ embeds: [embed] })
            }
            else if (query === 'puneet') {
                const embed = new MessageEmbed()
                    .setTitle(`${query}'s bday ${emoji.msg.butterfly_1}`)
                    .setDescription(`**${b.puneet}**`)
                    .setImage('https://cdn.discordapp.com/attachments/849306112694943804/979091113673625690/bday1.png')
                    .setColor(`${ee.color}`)
                    .setFooter({
                        text: `bdays of special ppl :)\n${ee.footertext}`,
                        iconURL: `${ee.footericon}`
                    })
                message.channel.send({ embeds: [embed] })
            }
        } catch (error) {
            message.channel.send('**NO bday is set!**')
        }

    }
};