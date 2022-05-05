const { Client, Message, MessageEmbed } = require('discord.js');
const urban = require('relevant-urban');


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
                    //.setFooter(`👍 ${word.thumbsUp} | 👎 ${word.thumbsDown} | ✍ ${word.author}`)
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
                        //  .setFooter(`👍 ${word.thumbsUp} | 👎 ${word.thumbsDown} | ✍ ${word.author}`)
                    ]
                })
            } catch (error) {
                message.channel.send('**No results from the urban dictionary.. sry**')
            }

        }

    }
}