
const { MessageEmbed } = require('discord.js')
const ee = require('../../config/embed.json')
module.exports = {
    name: 'avatar',
    cooldown: 5,
    aliases: ['av', 'icon', 'pfp'],
    description: 'get avatar of user',
    usage: 'avatar, avatar <user>',
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        const avatar = new MessageEmbed()
            .setTitle(`${member.user.tag}'s avatar`)
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setTimestamp()
            .setFooter({
                text: `${ee.footertext}`,
                iconURL: `${ee.footericon}`
              })
        message.channel.send({ embeds: [avatar] });
    }
}