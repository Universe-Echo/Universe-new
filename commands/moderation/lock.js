const { Discord, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'lock',
    cooldown: 5,
    userPermissions: ['MANAGE_CHANNEL'],
    botPermissions: ['MANAGE_CHANNEL'],
    run: async (client, message, args) => {
       
    const role = message.guild.roles.cache.find( r => r.name === '@everyone')
  
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    
    if (!channel) channel = message.channel;

   
    try {
        if (channel.permissionsFor(message.guild.id).has('SEND_MESSAGES') === false) 
             return message.channel.send(`${channel} is already locked lol`);

    await channel.permissionOverwrites.edit(message.guild.id, {SEND_MESSAGES: false}).catch(() => { })

    await channel.permissionOverwrites.edit(role, {SEND_MESSAGES: false}).catch(() => { })

    message.channel.send(`🔒Locked ${channel}!`)
  
    } 
    catch (e) {
            return message.channel.send(`there was an error:\n${e.message}`)
        }
    }



} 

