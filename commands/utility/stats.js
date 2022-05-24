const { Client, Message, MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json")
module.exports = {
  name: "stats",
  cooldown: 10,
  devOnly: true,

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {

    
    
const embed = new MessageEmbed()
.setTitle('Bot Stats')
.setThumbnail(client.user.displayAvatarURL())
.addField('Servers:', `${client.guilds.cache.size}`)
.addField('Users:', `${client.users.cache.size}`)
.addField('Channels:', `${client.channels.cache.size}`)
.setFooter({
  text: `${ee.footertext}`,
  iconURL: `${ee.footericon}`
})
message.reply({embeds: [embed]})


  },
};
