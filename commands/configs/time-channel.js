const { CommandInteraction, Client } = require('discord.js');
const moment = require('moment');
const tz = require('moment-timezone');

module.exports = {
    name: 'time-channel',
    description: 'Sets up the time command',
    cooldown: 10,
    userPermissions: ['ADMINISTRATOR'],
    botPermissions: ['MANAGE_CHANNELS'],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let TIMEZONE = "Asia/Calcutta"; // Example: EST - Read more: [ https://en.wikipedia.org/wiki/List_of_tz_database_time_zones# ]
        let FORMAT = "LT"; // Example: EST - Read more: [ https://momentjs.com/docs/#/displaying/format/ ]
        let CHANNEL_ID = "975285698854809630"; // Example: 823605956348608512
        let UPDATE_INTERVAL = "600000"; // is in ms!!!

        const timeNow = moment().tz(TIMEZONE);
        const timeChannel = client.channels.cache.get(CHANNEL_ID);
        timeChannel.edit({ name: `⏰ ${timeNow}` }, "Updated")
        setInterval(() => {
            const updatedTime = moment().tz(TIMEZONE).format(FORMAT);
            timeChannel.edit({ name: `⏰ ${updatedTime}` }, "Updated");
        }, UPDATE_INTERVAL);
        setTimeout(() => {
            console.log("Stopping process with the code \"0\"...");
            process.exit(0);
        }, UPDATE_INTERVAL)

        message.channel.send({ content: "Done!" })
    }
}