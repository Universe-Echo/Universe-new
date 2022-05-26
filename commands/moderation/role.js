const { MessageEmbed } = require('discord.js')
const ee = require("../../config/embed.json")
module.exports = {
    name: 'role',
    cooldown: 5,
    aliases: ['add-role', 'addrole'],
    userPermissions: ['MANAGE_ROLES'],
    botPermissions: ['MANAGE_ROLES'],
    description: 'add role to a member',
    usage: 'role <user> <role>',
    run: async (client, message, args) => {

        const syntaxErr = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setTitle('Syntax Error!')
            .addField('Uses:', '>role <user> <role>\n>ban <user-id> <role-id>')
            .addField('Example:', '>role @EcHO @admin')
        const roleTarget = message.mentions.members.first() || await message.guild.members.fetch(args[0]);
        if (!roleTarget) return message.reply({ embeds: [syntaxErr] })


        const role1 = message.mentions.roles.first() || await message.guild.roles.fetch(args[1]);

        const roleEmbed1 = new MessageEmbed()
        .setDescription(`Removed ${role1} from ${roleTarget.user.username}`)
        // .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setFooter({
            text: `Requested By: ${message.author.tag}\n${ee.footertext}`,
            iconURL: `${message.author.displayAvatarURL({dynamic: true})}`
          })
          .setColor(`${ee.color}`)
        if (roleTarget.roles.cache.find(role => role.id === `${role1.id}`)) {
            await roleTarget.roles.remove(role1).catch(() => { })
            message.channel.send({ embeds: [roleEmbed1] })

            return;
        }


        if (!role1) return message.reply({ embeds: [syntaxErr] })
        await roleTarget.roles.add(role1).catch(() => { })

        const roleEmbed = new MessageEmbed()
            .setDescription(`Added ${role1} to ${roleTarget.user.username}`)
            .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter({
                text: `Requested By: ${message.author.tag}\n${ee.footertext}`,
                iconURL: `${message.author.displayAvatarURL({dynamic: true})}`
              })
              .setColor(`${ee.color}`)
        message.channel.send({ embeds: [roleEmbed] })
    }
}