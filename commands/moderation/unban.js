const { Client, message, MessageActionRow, MessageButton, ButtonInteraction, MessageEmbed, Message } = require('discord.js')

module.exports = {
    name: 'unban',
    cooldown: 5,
    userPermissions: ['BAN_MEMBERS'],
    botPermissions: ['BAN_MEMBERS'],
    run: async (client, message, args) => {

       

        const reason = args.slice(1).join(' ') || 'no reason provided'
        const syntaxErr = new MessageEmbed()
.setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
.setTitle('Syntax Error!')
.addField('Uses:', '>unban <user>\n>ban <user-id>')
.addField('Example:', '>unban <id>')
        if (!args[0]) return message.channel.send({embeds: [syntaxErr]})
        const Member = message.mentions.members.first() || client.users.cache.get(args[0])
   
        const bannedMemberInfo = await message.guild.bans.fetch();
        const bannedMember = bannedMemberInfo.get(args[0]);
        if (!bannedMember) return message.channel.send(`**That user isn't banned -__-**`)

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
const unbanConfirmation = new MessageEmbed()
 // .setThumbnail(unban.user.displayAvatarURL({ dynamic: true, size: 512 }))
  .setTitle('Confirmation!')
  .addField('Do you want to unban', `<a:arrow_arrow:940504275606470707> \`${bannedMember.user.tag}\``)
//    .setFooter(`Requested By: ${message.author.tag}`)
 const unbannedMessage = await message.channel.send({embeds: [unbanConfirmation], components: [row]})
     
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
                   
                    message.guild.members.unban(bannedMember.user.id, reason).catch(() => { message.channe.send('there was an error!'
                    )})
                          
                  const unbannedEmbed = new MessageEmbed()
                    
                  unbannedEmbed.setTitle('Unbanned!')
                  unbannedEmbed.addField('User:', `<a:arrow_arrow:940504275606470707> \`${bannedMember.user.tag}\``)
                  unbannedEmbed.addField('Reason:', `<a:arrow_arrow:940504275606470707> \`${reason}\``)
                  unbannedEmbed.setColor('BLACK')
                  unbannedMessage.delete()
                  message.channel.send({embeds: [unbannedEmbed]})
                  message.react('<a:tick:940504379339993128>')
                 
                    ButtonInteraction.first().deferUpdate()
                  }

                  if (id === 'no') return ButtonInteraction.first().reply('Cancelled!').catch()
                  
              })

            
            
        




        }
}