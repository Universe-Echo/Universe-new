const { Client, Message, MessageEmbed } = require("discord.js");
const emoji = require('../../config/emojis.json')
const ee = require('../../config/embed.json')
const q = require('../../config/would-you-rather.json')
module.exports = {
  name: "wyr",
  aliases: ['would-you-rather', 'would-you', 'wouldyourather', 'would'],
  cooldown: 10,
  description: 'would-you-rather what?',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {

const replys = q.wouldyourather
    let result = Math.floor(Math.random() * replys.length);

    console.log(replys[result])

  },
};