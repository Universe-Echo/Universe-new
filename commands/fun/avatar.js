  
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'avatar',
    cooldown: 5,
    aliases: ['av', 'icon', 'pfp'],
    run: (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
       
     const avatar =   new MessageEmbed()
            .setTitle(`${member.user.tag}'s avatar`)
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor('BLACK')
            .setTimestamp()
            message.channel.send({embeds: [avatar]});
    }
}