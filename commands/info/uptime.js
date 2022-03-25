
const moment = require("moment");


const { MessageEmbed } = require('discord.js')


module.exports = {
    name:'uptime',
    cooldown: 5,
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
    .setColor('RANDOM')
    .setDescription(`\`\`\`prolog\n${uptime}\`\`\``)

    message.reply({embeds: [embed]})
    }
}