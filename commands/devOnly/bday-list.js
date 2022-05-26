const b = require("../../config/bday.json")
const { Client, Message, MessageEmbed } = require("discord.js");
const emoji = require('../../config/emojis.json')
const ee = require('../../config/embed.json')
const fs = require('fs');

module.exports = {
    name: "bday-list",
    aliases: ['birthday-list'],
    //   cooldown: 10,
    devOnly: true,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const fs = require("fs");

        fs.readFile("config/bday.json", function (err, data) {

            if (err) throw err;

            const bdays = JSON.parse(data);

            const description = JSON.stringify(bdays)

            let text = "";
            for (const x in bdays) {
                text += x + `: ${bdays[x]}\n`;
            }

            const embed = new MessageEmbed()
                .setTitle("Bday-list")
                .setDescription(`**${text}**`)
                .setFooter({
                    text: `Only special ppl are listed here\n${ee.footertext}`,
                    iconURL: `${ee.footericon}`
                })
                .setTimestamp()
                .setImage('https://cdn.discordapp.com/attachments/849306112694943804/979091113673625690/bday1.png')
                .setColor(`${ee.color}`)
            // .setThumbnail('https://cdn.discordapp.com/attachments/849306112694943804/979246883891466241/532-5323945_party-computer-icons-clip-art-confetti-birthday-transparent.png')
            message.reply({ embeds: [embed] })

        });
    }
};