const Discord = require('discord.js');
const calculator = require('easy-calculation');
const ee = require('../../config/embed.json')
module.exports = {
    name: 'calc',
    aliases: ['cal', 'calculate', 'math', 'calculator'],
    cooldown: 5,

   /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    run: (client, message, args) => {

        const cal = calculator.calculate(args.join(" "), true).toString()
const calc = String(cal)
        console.log(calc)
       
        const calembed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${calc}`)
            .setColor('LIGHT_GREY')
            .setFooter({
                text: `${ee.footertext}`,
                iconURL: `${ee.footericon}`
              })
           message.reply({embeds: [calembed]})
    }
}