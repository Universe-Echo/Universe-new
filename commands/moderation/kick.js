const { Client, message, MessageActionRow, MessageButton, ButtonInteraction, MessageEmbed, Message } = require('discord.js')

module.exports = {
    name: 'kick',
    description: 'KICK a member',
    cooldown: 5,
    userPermissions: ['KICK_MEMBERS'],
    botPermissions: ['KICK_MEMBERS'],
    usage: 'kick <user>',
    run: async (client, message, args) => {

        try {
            const reason = args.slice(1).join('  ') || 'no reason provided'
            const syntaxErr = new MessageEmbed()
                .setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
                .setTitle('Syntax Error!')
                .addField('Uses:', '>kick <user> <reason>\n>kick <user-id> <reason>')
                .addField('Example:', '>kick @EcHO idk')
            if (!args[0]) return message.channel.send({ embeds: [syntaxErr] });
            const kickMember = message.mentions.members.first() || await message.guild.members.fetch(args[0]);
            if (!kickMember) return message.channel.send('**Please provide a valid member!**');
            if (kickMember === message.member) return message.channel.send('You dumb, you cannot KICK yourself');
            if (!kickMember.kickable) return message.channel.send('**I am unable to kick that user!**');
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
            const kickConfirmation = new MessageEmbed()
                .setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true, size: 512 }))
                .setTitle('Confirmation!')
                .addField('Do you want to kick', `<a:arrow_arrow:940504275606470707> \`${kickMember.user.tag}\``)
            //    .setFooter(`Requested By: ${message.author.tag}`)
            const kickedMessage = await message.channel.send({ embeds: [kickConfirmation], components: [row] })

            const filter = (interaction) => {
                if (interaction.user.id === message.author.id) return true;
                return interaction.reply({ content: '**you cant use this button!**' })
            }
            const collector = message.channel.createMessageComponentCollector({
                filter,
                max: 1
            })

            collector.on('end', (ButtonInteraction) => {

                const id = ButtonInteraction.first().customId;

                if (id === 'yes') {
                    kickMember.send(`You were kicked from **${message.guild.name}**\nReason: ${reason || 'no reason provided'}`).catch(() => { })
                    kickMember.kick();

                    const kickedEmbed = new MessageEmbed()

                    kickedEmbed.setTitle('Kicked!')
                    kickedEmbed.addField('User:', `<a:arrow_arrow:940504275606470707> \`${kickMember.user.tag}\``)
                    kickedEmbed.addField('Reason:', `<a:arrow_arrow:940504275606470707> \`${reason}\``)
                    kickedEmbed.setColor('BLACK')
                    kickedMessage.delete()
                    message.channel.send({ embeds: [kickedEmbed] })
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

