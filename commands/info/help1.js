const { Client, message, MessageActionRow, MessageButton, ButtonInteraction, MessageEmbed, Message, Discord } = require('discord.js')


module.exports = {
    name: "help(old)",
    aliases: ['h'],
    cooldown: 5,
    description: "shows a list of command",
    permissions: "SEND_MESSAGES",
    run: async (client, message, args) => {

        const commands = client.commands.filter(x => x.showHelp !== false);

        const embed = new MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .addField(`Enabled - ${commands.size}`, '**Prefix: >**')
        .addField('🛠️ __**Utility**__', ` \`\`\`\>botinfo, >cinfo, >ping, \n\n>whois, >membercount, >serverinfo, >roleinfo\n\n>nick, >afk, >uptime\`\`\`\ `)
        .setColor("AQUA")
        .setTimestamp()
        const embed2 = new MessageEmbed()
     //   .setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .addField(`Enabled - ${commands.size}`, '**Prefix: >**')
        .addField('<a:ribb:940844137660440616> __**Fun**__', ` \`\`\`\>avatar/av, >emoji, >poll, >8ball\n\n>weather, >urban, >firstmessage, >gif\n\n>translate, >trigger, >spotify, >yt\n\n>emojify, >ascii, >comment, >pokemon, >reverse\`\`\`\ `)        .setColor("AQUA")
        .setTimestamp()
        const embed3 = new MessageEmbed()
    //    .setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .addField(`Enabled - ${commands.size}`, '**Prefix: >**')
        .addField('<:imagen:944633252013047809> __**Gif/Image**__', ` \`\`\`\Gif:-\n>gif, >aa, >gm, >gn, >hug, >pat, >highfive\n\n>slap\n\nImage:-\n>trigger, >invert, >comment, >tweet\n\n>bright, >blurple, >grey\`\`\`\ `)
        .setColor("AQUA")
        .setTimestamp()

        const embed4 = new MessageEmbed()
     //   .setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .addField(`Enabled - ${commands.size}`, '**Prefix: >**')
        .addField('<a:Music1:940845731386896415> __**Music**__', ` \`\`\`\>play, >pause, >back, >clear, >filter\n\n>loop, >nowplaying, >progress, >queue, >resume\n\n>save, >search, >seek, >shuffle, >skip\n\n>stop, >volume \`\`\`\ `)
        .setColor("AQUA")
        .setTimestamp()
        const embed5 = new MessageEmbed()
     //   .setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .addField(`Enabled - ${commands.size}`, '**Prefix: >**')
        .addField('⚙️ __**Moderation**__', ` \`\`\`\>ban/unban, >kick, >lock/unlock\n\n>mute/unmute/tmute\n\n>purge, >role\n\n>warn, >clearwarns, >warns\n\n>set-logs\n\n>blacklist, >vcmove\`\`\`\ `)
        .setColor("AQUA")
        .setTimestamp()
        
// if you have more categories then add it in the same way
        let button = new MessageButton()
        .setLabel("FUN")
        .setCustomId("help1")
        .setStyle("SECONDARY")
        .setEmoji('<a:ribb:940844137660440616>');
        let button2 = new MessageButton()
        .setLabel("GIF/Image")
        .setCustomId("help2")
        .setStyle("SECONDARY")
        .setEmoji('<:imagen:944633252013047809>');
        let button3 = new MessageButton()
        .setLabel("MUSIC")
        .setCustomId("help3")
        .setStyle("SECONDARY")
        .setEmoji('<a:Music1:940845731386896415>');
        let button4 = new MessageButton()
        .setLabel("UTILITY")
        .setCustomId("help4")
        .setStyle("SECONDARY")
        .setEmoji('🛠️');
        let button5 = new MessageButton()
        .setLabel("MODERATION")
        .setCustomId("help5")
        .setStyle("SECONDARY")
        .setEmoji('⚙️');
       
        
// if you added more categories in the embed then add more buttons but change the label to the category name
        let row = new MessageActionRow()
        .addComponents(button, button2, button3, button4, button5);
        const MESSAGE =  await message.channel.send({ embeds: [embed], components: [row]});
        const collector = MESSAGE.createMessageComponentCollector({ time: 20000 });
        collector.on('collect', async b => {
            if (b.user.id !== message.author.id) {
                b.reply({content: "This is not for you", ephemeral: true});
            } else {
                if(b.customId === "help1") {
                    b.update({embeds: [embed2], components: [row]})
                }
                if(b.customId === "help2") {
                    b.update({embeds: [embed3], components: [row]})   
                }
                if(b.customId === "help3") {
                    b.update({embeds: [embed4], components: [row]})   
                }

                if(b.customId === "help4") {
                    b.update({embeds: [embed], components: [row]})   
                }
                if(b.customId === "help5") {
                    b.update({embeds: [embed5], components: [row]})   
                }
              
            }
            })
            collector.on('end', (b) =>{
                MESSAGE.edit("__This help menu has been expired, please use the command again to view it.__")
            })
    }
}
