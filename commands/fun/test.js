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
.setColor('#41454a')
.setTitle('test!')
.setDescription('smth smth mst stms')
               


message.channel.send({embeds: [embed]})
  },
};
