const ms = require(`ms`);
var ee = require('../../config/embed.json')
const emoji = require('../../config/emojis.json')
const map = new Map();
const {
    MessageEmbed,
    Permissions
} = require(`discord.js`)

/**
  * @param {Client} client
  * @param {CommandInteraction} interaction
  * @param {String[]} args
  */
module.exports = {
    name: `addroletoeveryone`,
    aliases: [`roleaddtoeveryone`, "add-role-to-everyone", "role-add-to-everyone", "addrole2everyone", "addroleeveryone"],
    cooldown: 10,
    usage: `addroletoeveryone @Role`,
    description: `Adds a Role to every User in this Guild`,
    botPermissions: ['MANAGE_ROLES'],
    userPermissions: ['MANAGE_ROLES'],

    run: async (client, message, args) => {

        try {
            let role = message.mentions.roles.filter(role => role.guild.id == message.guild.id).first() || message.guild.roles.cache.get(args[0]);
            if (!role || role == null || role == undefined || role.name == null || role.name == undefined)
                return message.reply({
                    embeds: [new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setFooter(ee.footertext, ee.footericon)
                        .setTitle('Syntax Error!')
                        .addField('Uses:', '>addroletoeveryone <role>\n>addroletoeveryone <role-id>')
                        .addField('Example:', '>addroletoeveryone @members')
                    ]
                });
            if (message.member.roles.highest.position <= role.position)
                return message.reply({
                    embeds: [new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setFooter(ee.footertext)
                        .setTitle('Your role is lower than the given role!')
                    ]
                });
            const members = message.guild.members.cache.filter(member => !member.roles.cache.find(role => role == role.id)).size


            const embed1 = await message.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.color).setThumbnail(ee.thumb ? ee.footericon && (ee.footericon.includes("http://") || ee.footericon.includes("https://")) ? ee.footericon : client.user.displayAvatarURL() : null)
                    .setFooter(ee.footertext, ee.footericon, `requested by: ${message.author.tag}`)
                    .setAuthor(`Changing roles for ${members} Members...`, "https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif", "https://discord.gg/2dKrZQyaC4")
                ]
            });

            message.guild.members.cache.filter(m => !m.user.bot).forEach(member => member.roles.add(role.id))

            embed1.edit({
                embeds: [new MessageEmbed()
                    .setColor("GREEN").setThumbnail(ee.thumb ? ee.footericon && (ee.footericon.includes("http://") || ee.footericon.includes("https://")) ? ee.footericon : client.user.displayAvatarURL() : null)
                    .setFooter(ee.footertext, ee.footericon, `requested by: ${message.author.tag}`)
                    .setAuthor(`Changed roles for ${members} Members...`, "https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif", "https://discord.gg/2dKrZQyaC4")

                ]
            })

        }
        catch (e) {
            map.set(message.guild.id, false)
            console.log(String(e.stack))
            return message.reply({
                embeds: [new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setFooter(ee.footertext)
                    .setDescription(`${e}`)

                ]
            });
        }
    }
};