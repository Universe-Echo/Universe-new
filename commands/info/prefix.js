const { Client, Message, MessageEmbed } = require("discord.js");
const prefixSchema = require('../../models/prefix');
const prefix = require('../../models/prefix');
const client = require('../../index')
const ee = require("../../config/embed.json")
client.prefix = async function (message) {
    let custom;

    const data = await prefix.findOne({ Guild: message.guildId })
        .catch(err => console.log(err))

    if (data) {
        custom = data.Prefix;
    } if (!data) {
        const prefix = ">"


        custom = prefix
    }
    return custom;
}
module.exports = {
    name: "prefix",
    usage: 'prefix',
    cooldown: 10,
    description: 'Check the custom prefix in the server',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const p = await client.prefix(message)
        const prefixEmbed = new MessageEmbed()
            .setTitle('Prefix!')
            .setThumbnail(client.user.displayAvatarURL())
            .addField('**The prefix is set to:**', `\`${p}\``)
            .setFooter(``)
            .setFooter({
                text: `${p}set-prefix <prefix>  ||  ${p}reset-prefix\n${ee.footertext}`,
                iconURL: `${ee.footericon}`
              })
              .setColor(`${ee.color}`)
        message.reply({ embeds: [prefixEmbed] })
    },
};