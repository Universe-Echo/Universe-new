const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'membercount',
    description: 'get member count',
    aliases: ['mc', 'memberscount'],
    cooldown: 5,
    usage: 'membercount',
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
        .setTitle(`${message.guild.name}`)
        .setDescription(`**__Total members__ **: **${message.guild.memberCount}**`)
        .setColor("FF9700")
      //  .setThumbnail(message.guild.iconURL({ size: 4096, dynamic: true }))
  
      //  .setTimestamp()
        message.channel.send({ embeds: [embed] })
    }
}