const { Client, message, MessageActionRow, MessageButton, ButtonInteraction, MessageEmbed, Message } = require('discord.js')
const { CommandInteraction } = require("discord.js");
module.exports = {
    name: 'ban',
    description: 'BAN a member',
    cooldown: 5,
    userPermissions: ['BAN_MEMBERS'],
    botPermissions: ['BAN_MEMBERS'],
    usage: 'ban <user>',
    options: [{
        name: "member",
        description: "select a member",
        type: "USER",
        required: true,
    },
{
    name: 'reason',
    description: 'Provide a reason',
    type: 'STRING',
    required: false,
}],
/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 * @param {String[]} args 
 * @returns 
 */
    run: async (client, interaction, args) => {
      
        try {
            const reason = interaction.options.getString('reason') || 'no reason provided'
          
/*const syntaxErr = new MessageEmbed()
.setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
.setTitle('Syntax Error!')
.addField('Uses:', '>ban <user> <reason>\n>ban <user-id> <reason>')
.addField('Example:', '>ban @EcHO idk')*/

         //   if (!args[0]) return message.channel.send({embeds: [syntaxErr]});
            const banMember = interaction.options.getMember('member')
         //   if (!banMember) return message.channel.send('**Please provide a valid member!**');
            if (banMember === interaction.user) return interaction.followUp('**You dumb, you cannot BAN yourself**');
            if (!banMember.bannable) return interaction.followUp('**I am unable to ban that user!**');
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
      //.setAuthor(banMember.user.displayAvatarURL())
    //  .setTitle('Confirmation!')
      .addField('Do you want to ban:', `${banMember.user.tag}`)
  //    .setFooter(`Requested By: ${message.author.tag}`)
     const bannedMessage = await interaction.followUp({embeds: [banConfirmation], components: [row]})
         
      const filter = (interaction) => {
        if(interaction.user.id === interaction.user.id) return true;
        return interaction.reply({content: '**you cant use this button!**',  ephemeral: true})
    }
             const collector = interaction.channel.createMessageComponentCollector({
                 filter,
                  max: 1})

                  collector.on('end', (ButtonInteraction) => {
                      
                      const id = ButtonInteraction.first().customId;
    
                      if(id === 'yes') {
                        banMember.send(`You were banned from **${interaction.guild.name}**\nReason: ${reason || 'no reason provided'}`).catch(() => { })
                        banMember.ban({ days: 7 });
                              
                      const bannedEmbed = new MessageEmbed()
                        
                      bannedEmbed.setTitle('Banned!')
                      bannedEmbed.addField('User:', ` \`\`\`\ ${banMember.user.tag} \`\`\`\ `)
                      bannedEmbed.addField('Reason', `\`\`\`\ ${reason} \`\`\`\ `)
                      bannedEmbed.setColor('BLACK')
                      bannedMessage.delete()
                      interaction.followUp({embeds: [bannedEmbed]})
                   //   message.react('<a:tick:940504379339993128>')
                     
                        ButtonInteraction.first().deferUpdate()
                      }

                      if (id === 'no') return ButtonInteraction.first().reply('Cancelled!').catch()
                      
                  })
           


        }
        catch (e) {
            return interaction.followUp(`there was an error:\n${e.message}`)
        }

    }
}