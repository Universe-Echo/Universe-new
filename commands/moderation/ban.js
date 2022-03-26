const { Client, message, MessageActionRow, MessageButton, ButtonInteraction, MessageEmbed, Message } = require('discord.js')
module.exports = {
    name: 'ban',
    description: 'BAN a member',
    cooldown: 5,
    userPermissions: ['BAN_MEMBERS'],
    botPermissions: ['BAN_MEMBERS'],
    usage: 'ban <user>',
    run: async (client, message, args) => {
      
        try {
            const reason = args.slice(1).join('  ') || 'no reason provided'
          
const syntaxErr = new MessageEmbed()
.setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
.setTitle('Syntax Error!')
.addField('Uses:', '>ban <user> <reason>\n>ban <user-id> <reason>')
.addField('Example:', '>ban @EcHO idk')

            if (!args[0]) return message.channel.send({embeds: [syntaxErr]});
            const banMember = message.mentions.members.first() || await message.guild.members.fetch(args[0]);
            if (!banMember) return message.channel.send('**Please provide a valid member!**');
            if (banMember === message.member) return message.channel.send('**You dumb, you cannot BAN yourself**');
            if (!banMember.bannable) return message.channel.send('**I am unable to ban that user!**');
            const row = new MessageActionRow().addComponents(
                button1 = new MessageButton()
                .setCustomId('yes')
                .setLabel('YES')
                .setStyle('SUCCESS'),
       
                button2 = new MessageButton()
                .setCustomId('no')
                .setLabel('NO')
                .setStyle('DANGER')
                );
    const banConfirmation = new MessageEmbed()
      .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setTitle('Confirmation!')
      .addField('Do you want to ban', `<a:arrow_arrow:940504275606470707> \`${banMember.user.tag}\``)
  //    .setFooter(`Requested By: ${message.author.tag}`)
     const bannedMessage = await message.channel.send({embeds: [banConfirmation], components: [row]})
         
      const filter = (interaction) => {
        if(interaction.user.id === message.author.id) return true;
        return interaction.reply({content: '**you cant use this button!**'})
    }
             const collector = message.channel.createMessageComponentCollector({
                 filter,
                  max: 1})

                  collector.on('end', (ButtonInteraction) => {
                      
                      const id = ButtonInteraction.first().customId;
    
                      if(id === 'yes') {
                        banMember.send(`You were banned from **${message.guild.name}**\nReason: ${reason || 'no reason provided'}`).catch(() => { })
                        banMember.ban({ days: 7 });
                              
                      const bannedEmbed = new MessageEmbed()
                        
                      bannedEmbed.setTitle('Banned!')
                      bannedEmbed.addField('User:', `<a:arrow_arrow:940504275606470707> \`${banMember.user.tag}\``)
                      bannedEmbed.addField('Reason', `<a:arrow_arrow:940504275606470707> \`${reason}\` `)
                      bannedEmbed.setColor('BLACK')
                      bannedMessage.delete()
                      message.channel.send({embeds: [bannedEmbed]})
                      message.react('<a:tick:940504379339993128>')
                     
                        ButtonInteraction.first().deferUpdate()
                      }

                      if (id === 'no') return ButtonInteraction.first().reply('Cancelled!').catch()
                      
                  })
           


        }
        catch (e) {
            return message.channel.send(`there was an error:\n${e.message}`)
        }

    }
}