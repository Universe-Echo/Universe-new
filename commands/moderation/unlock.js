module.exports = {
    name: 'unlock',
    cooldown: 5,
    userPermissions: ['MANAGE_CHANNELS'],
    botPermissions: ['MANAGE_CHANNELS'],
    description: 'Unlock the specified channel',
    usage: 'unlock, unlock <channel>',
    run: async (client, message, args) => {

    const role = message.guild.roles.cache.find( r => r.name === '@everyone')

    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    
    if (!channel) channel = message.channel;
   
    try {
        if (channel.permissionsFor(message.guild.id).has('SEND_MESSAGES') === true) 
             return message.channel.send(`${channel} is already unlocked lol`);

    await channel.permissionOverwrites.edit(message.guild.id, {SEND_MESSAGES: true}).catch(() => { })

    await channel.permissionOverwrites.edit(role, {SEND_MESSAGES: true}).catch(() => { })

    message.channel.send(`🔓Unlocked ${channel}!`)
  
    } 
    catch (e) {
            return message.channel.send(`there was an error:\n${e.message}`)
        }
    }



} 

