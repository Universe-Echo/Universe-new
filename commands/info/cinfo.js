const { MessageEmbed } = require('discord.js');
const { execute } = require('./whois');

module.exports = {
    name: "cinfo",
    aliases: ['channelinfo', 'channel'],
    cooldown: 5,
    description: "Shows Informations About Mentioned Channel",
    run: async (client, message, args) => {
        let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.channel;
        const syntaxErr = new MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
.setTitle('Syntax Error!')
.addField('Uses:', '>cinfo <channel>')
.addField('Example:', '>cinfo #general')

        if (!channel) return message.channel.send({embeds: [syntaxErr]});

        let channelembed = new MessageEmbed()
            .setTitle(`Channel Information for ${channel.name}`)
            .setThumbnail(message.guild.iconURL())
            .addField("**NSFW**", ` \`\`\`\ ${channel.nsfw} \`\`\`\ `)
            .addField("**Channel ID**", ` \`\`\`\ ${channel.id} \`\`\`\ `)
            .addField("**Channel Type**", ` \`\`\`\ ${channel.type} \`\`\`\ `)
            .addField("**Channel Description**", ` \`\`\`\ ${channel.topic || "No Description"} \`\`\`\ `)
            .addField("**Channel Created At**", ` \`\`\`\ ${channel.createdAt} \`\`\`\ `)
            .setColor("RANDOM")
        message.channel.send({embeds: [channelembed]});
    }
}