const { CommandInteraction, Client } = require('discord.js');
const moment = require('moment');
const tz = require('moment-timezone');
const Schema = require('../../models/time-channel')
module.exports = {
  name: 'set-time',
  description: 'Initialize the time channel',
  aliases: ['time-channel', 'channel-time'],
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
    Schema.findOne({ Guild: message.guild.id }, async (e, data) => {
      if (!data) return


      let TIMEZONE = "Asia/Calcutta"; // Example: EST - Read more: [ https://en.wikipedia.org/wiki/List_of_tz_database_time_zones# ]
      let FORMAT = "ddd, hA"; // Example: EST - Read more: [ https://momentjs.com/docs/#/displaying/format/ ]
      let CHANNEL_ID = "975313178131054603"; // Example: 823605956348608512
      let UPDATE_INTERVAL = "6000"; // is in ms!!!


      const timeNow = moment().tz(TIMEZONE).format(FORMAT);
      //define clockChannel
      const clockChannel = client.channels.cache.get(data.Channel);
      //initial update
      clockChannel.edit({ name: `Day/time - ${timeNow}` }, 'Clock update')
        .catch(console.error);
      //set the interval
      setInterval(() => {
        const timeNowUpdate = moment().tz(TIMEZONE).format(FORMAT);
        clockChannel.edit({ name: `Day/Time - ${timeNowUpdate}` }, 'Clock update')
          .catch(console.error);
      }, 3600000);
      //tells if it is ready
      console.log("updated")

    }
    )
  }
}