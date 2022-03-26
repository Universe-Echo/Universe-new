const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'role',
    cooldown: 5,
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
        if(!roleTarget) return message.reply({embeds: [syntaxErr]})
        const role1 = message.mentions.roles.first() || await message.guild.roles.fetch(args[1]);
        if(!role1) return message.reply({embeds: [syntaxErr]})
        await roleTarget.roles.add(role1).catch(() => { })
        
        const roleEmbed = new MessageEmbed()
        .setDescription(`Added ${role1} to ${roleTarget.user.username}`)
        .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send({embeds: [roleEmbed]})
    } 
}