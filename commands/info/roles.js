const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'roles',
    cooldown: 5,
    description: 'get roles list of the server',
    run: async (client, message, args) => {
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());

        
       
        role1 = `${roles.slice().join(' | ')}`
        const embed = new MessageEmbed()
        .setDescription(`Roles [${roles.length}]\n ${role1}`)
       // message.channel.send(`Roles [${roles.length}]\n ${role1}`);

       message.reply({embeds: [embed]})
      }
    }
    

