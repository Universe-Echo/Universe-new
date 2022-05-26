const moment = require("moment");
const { MessageEmbed } = require('discord.js')
const ee = require("../../config/embed.json")

module.exports = {
    name: 'uptime',
    cooldown: 5,
    description: "get bot's uptime",
    usage: 'uptime',
    run: async (client, message, args) => {
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

        const embed = new MessageEmbed()
            .setTitle('UPTIME STATS')
            .setColor(`${ee.color}`)
            .setDescription(`\`\`\`prolog\n${uptime}\`\`\``)
            .setFooter({
                text: `${ee.footertext}`,
                iconURL: `${ee.footericon}`
              })
        message.reply({ embeds: [embed] })
    }
}