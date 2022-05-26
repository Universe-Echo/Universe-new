const { MessageEmbed, Client, Message, MessageSelectMenu } = require('discord.js')
const ee = require("../../config/embed.json")

module.exports = {
        name: 'nickname',
        aliases: ['nick'],
        cooldown: 5,
        userPermissions: ['MANAGE_NICKNAMES'],
        botPermissions: ['MANAGE_NICKNAMES'],
        description: 'Change nick of a user',
        usage: 'nickname <user> <text>',
        run: async (client, message, args) => {

                const member = message.mentions.members.first() || await message.guild.members.fetch(args[0]);

                if (!member) member = message.author;

                const syntaxErr = new MessageEmbed()
                        .setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
                        .setTitle('Syntax Error!')
                        .addField('Uses:', '>nick <user> <nick>\n>ban <user-id> <nick>')
                        .addField('Example:', '>ban @EcHO idk')
                if (!member) return message.reply({ embeds: [syntaxErr] })


                const argument = args.slice(1).join(" ");

                try {
                        member.setNickname(argument).catch(() => { message.channel.send('**Cannot change the nickname of user!**') })
                        const nickNameembed = new MessageEmbed()
                                .setDescription(`Changed nickname of ${member} to ${argument}`)
                                .setFooter({
                                        text: `${ee.footertext}`,
                                        iconURL: `${ee.footericon}`
                                      })
                                      .setColor(`${ee.color}`)
                        message.channel.send({ embeds: [nickNameembed] })
                } catch (err) {

                        message.reply("Cant change the nickname" + member.toString())


                }
        }
}