const Discord = require('discord.js')
const ee = require("../../config/embed.json")
module.exports = {
    name: 'poll',
    cooldown: 5,
    description: 'poll a message in a specific channel',
    usage: 'poll <channel> <message>',
    run: async (client, message, args) => {
        const pollchannel = message.mentions.channels.first()
        const syntaxErr = new Discord.MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setTitle('Syntax Error!')
            .addField('Use', '>poll <channel> <message>')
            .addField('Example:', '>poll #general hello')

        if (!pollchannel) return message.channel.send({ embeds: [syntaxErr] })

        const question = args.join(' ').slice(21)
        if (!question) return message.channel.send({ embeds: [syntaxErr] })



        const embed = new Discord.MessageEmbed()
            .setTitle('Poll')
            .addField('Author', `${message.author}`)
            .setDescription(` \`\`\`\ ${question} \`\`\`\ `)
            .setColor(`${ee.color}`)

        let msg = await pollchannel.send({ embeds: [embed] })
        await msg.react('👍')
        await msg.react('👎')
        //message.channel.send('**Poll Created!**')



    }




}