const { MessageEmbed } = require('discord.js');
const { execute } = require('./whois');
const ee = require("../../config/embed.json")
module.exports = {
    name: "cinfo",
    aliases: ['channelinfo', 'channel', 'info-channel', 'channel-info'],
    cooldown: 5,
    description: "Shows information about mentioned channel",
    usage: 'cinfo <channel>',
    run: async (client, message, args) => {
        let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.channel;
        const syntaxErr = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setTitle('Syntax Error!')
            .addField('Uses:', '>cinfo <channel>')
            .addField('Example:', '>cinfo #general')

        if (!channel) return message.channel.send({ embeds: [syntaxErr] });

        let channelembed = new MessageEmbed()
            .setTitle(`Channel Information for ${channel.name}`)
            .setThumbnail(message.guild.iconURL())
            .addField("**NSFW**", ` \`\`\`\ ${channel.nsfw} \`\`\`\ `)
            .addField("**Channel ID**", ` \`\`\`\ ${channel.id} \`\`\`\ `)
            .addField("**Channel Type**", ` \`\`\`\ ${channel.type} \`\`\`\ `)
            .addField("**Channel Description**", ` \`\`\`\ ${channel.topic || "No Description"} \`\`\`\ `)
            .addField("**Channel Created At**", ` \`\`\`\ ${channel.createdAt} \`\`\`\ `)
            .setColor(`${ee.color}`)
            .setFooter({
                text: `${ee.footertext}`,
                iconURL: `${ee.footericon}`
              })
        message.channel.send({ embeds: [channelembed] });
    }
}