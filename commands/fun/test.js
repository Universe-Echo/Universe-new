const { Client, Message, MessageEmbed } = require("discord.js");
const emoji = require('../../config/emojis.json')
const ee = require('../../config/embed.json')
module.exports = {
  name: "test",
  aliases: ['-'],
  cooldown: 10,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {

    const embed = new MessageEmbed()
    .setTitle(`fdf's bday!`)
    .setDescription(`smthhhhh`)
    .setImage('https://cdn.discordapp.com/attachments/849306112694943804/979091113673625690/bday1.png')
   .setColor(`${ee.color}`)


message.channel.send({embeds: [embed]})
  },
};
