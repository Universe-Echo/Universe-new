const { Client, Message, MessageEmbed } = require("discord.js");


module.exports = {
  name: "status-reset",
  aliases: ['reset-status'],
  cooldown: 10,
  devOnly: true,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
// STREAMING, WATCHING, CUSTOM_STATUS, PLAYING, COMPETING
const servers = client.guilds.cache.size;
const users = client.users.cache.size;

let totalSeconds = (client.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
totalSeconds %= 86400;
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds % 60);
let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

let statuses = [`${servers} servers | >help`, `${users} users | >help`, `Up since: ${minutes}mins` ]

// const status = Math.floor(Math.random() * statuses.length)

let index = 0
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * (statuses.length ) );
      const newActivity = statuses[randomIndex];
      client.user.setPresence({
        activities: [{
            name: `${newActivity}`,
            type: "WATCHING",
            // url: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
        }], 
        status: "online",
      }) 
    }, 5000)
    

  }

}