const client = require("../index");
const chalk = require('chalk')
const path = require('path')
const { getCommand } = require('../utility')
const Schema = require('../models/time-channel')
const moment = require('moment');
const tz = require('moment-timezone');
client.on("ready", () => {
 
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
        }, 600000);
        //tells if it is ready
        console.log("updated")
  
      }
      )


})
