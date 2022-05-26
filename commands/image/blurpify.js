const client = require('nekos.life');
const Discord = require('discord.js')

const {
  MessageEmbed
} = require('discord.js')

const ee = require("../../config/embed.json")

var superagent = require('superagent'); 
/**
* @param {Client} client
* @param {Message} message
* @param {String[]} args
*/
module.exports = {
  name: "blurpify",
  cooldown: 10,
  description: 'add a blurple sketch effect to pfp',
  botPermissions: ['ATTACH_FILES'],

  run: async (client, message, args) => {

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    superagent.get('https://nekobot.xyz/api/imagegen').query({
      type: 'blurpify',
      image: member.user.displayAvatarURL({ size: 512 })
    }).end((err, response) => {


    const embed = new MessageEmbed()
    .setImage(response.body.message)
    .setFooter({
        text: `${ee.footertext}`,
        iconURL: `${ee.footericon}`
    })
    .setColor(`${ee.color}`)
    .setTimestamp()
      message.reply({
        embeds: [embed]
      });
    });
  }
}