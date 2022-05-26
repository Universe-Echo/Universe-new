const { MessageEmbed } = require('discord.js')
const ee = require('../../config/embed.json')
module.exports = {
    name: '8ball',
    cooldown: 5,
    description: 'ask questions get answers',
    usage: '8ball <query>',
    run: (client, message) => {
        const args = message.content.split(' ').slice(1);
        const replys = [
            "Yes.",
            "It is certain.",
            "It is decidedly so.",
            "Without a doubt.",
            "Yes definelty.",
            "You may rely on it.",
            "As I see it, yes.",
            "Most likely.",
            "Outlook good.",
            "Signs point to yes.",
            "Reply hazy, try again.",
            "Ask again later.",
            "Better not tell you now...",
            "Cannot predict now.",
            "Concentrate and ask again.",
            "Don't count on it.",
            "My reply is no.",
            "My sources say no.",
            "Outlook not so good...",
            "Very doubtful.",
        ];

        let result = Math.floor(Math.random() * replys.length);
        let question = args.join(" ");
        if (!question) return message.channel.send('**pls provide a question**')
        const embed = new MessageEmbed()
            .setColor("#00000")
            .addField(`**${message.author.username}'s question**`, question)
            .addField('**the 8ball says**', replys[result])
            .setThumbnail(message.author.displayAvatarURL())
            .setFooter({
                text: `${ee.footertext}`,
                iconURL: `${ee.footericon}`
              })
              .setColor(`${ee.color}`)
        message.channel.send({ embeds: [embed] });

    }
} 