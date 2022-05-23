const { MessageEmbed } = require('discord.js')
const ee = require("../../config/embed.json")
module.exports = {
  name: 'roles',
  aliases: ['role-list', 'list-roles', 'rolelist', 'listrole', 'listroles', 'roles-list'],
  cooldown: 5,
  description: 'get roles list of the server',
  usage: 'roles',
  run: async (client, message, args) => {
    const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());



    role1 = `${roles.slice().join(' | ')}`
    const embed = new MessageEmbed()
      .setDescription(`Roles [${roles.length}]\n ${role1}`)
      .setFooter({
        text: `${ee.footertext}`,
        iconURL: `${ee.footericon}`
      })
    // message.channel.send(`Roles [${roles.length}]\n ${role1}`);

    message.reply({ embeds: [embed] })
  }
}


