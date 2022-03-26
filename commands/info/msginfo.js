const { MessageEmbed } = require('discord.js'); // npm i discord.js

module.exports = {
    name: 'messageinfo',
    aliases: ['msginfo'],
    description: 'shows info about a message',
    cooldown: 5,
    usage: 'messageinfo <message-id>',

    run: async (client, message, args) => {

        

        if(!args[0]) return message.reply('Provide a message ID!')

        if(isNaN(args[0])) return message.reply("That's not a valid message ID! `Eg- 1234567890`");

        await message.channel.messages.fetch(args[0]).catch(err => {

            return message.reply('Message not found in this channel..')

        })

        const message1 = await message.channel.messages.cache.get(args[0]);

        const hasImage = message1.attachments.size && message1.attachments.first().width;

        const embed = new MessageEmbed()
            .setColor(message1.member ? message1.member.displayHexColor : client.color)
            .setThumbnail(message1.author.displayAvatarURL({ format: 'png', dynamic: true }))
            .setImage(hasImage ? message1.attachments.first().url : null)
            .setAuthor(message1.author.tag, message1.author.displayAvatarURL({ format: 'png', dynamic: true }))
            .setDescription(message1.content)
            .setTimestamp(message1.createdAt)
            .setFooter(`ID: ${message1.id}| `)
            .addField('Jump', `[Click Here to Jump](${message1.url})`);

        message.reply({embeds: [embed]});
    
        
    }
};