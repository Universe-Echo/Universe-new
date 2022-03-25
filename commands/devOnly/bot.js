const Discord = require("discord.js")
const { version } = require("discord.js");
const moment = require("moment");
const m = require("moment");
let os = require('os')
let cpuStat = require("cpu-stat")
const ms = require("ms")

module.exports = {
    name: "bot",
    category: "utility",
    cooldown: 5,
  description: "get info of the bot",
  usage: "[command]",
  run: async (client, message, args) => {
  
    if (message.author.id !== '673846605920600068') return message.channel.send('**This command can be only used by my owner**')

  let cpuLol;
  cpuStat.usagePercent(function(err, percent, seconds) {
      if (err) {
          return console.log(err);
      }
    //  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
      const botinfo = new Discord.MessageEmbed()
          .setAuthor(client.user.username)
          .setTitle("__**Stats:**__")
          .setColor("RANDOM")
          .addField("Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
         // .addField("⌚️ Uptime ", `${duration}`, true)
          .addField("Users", `${client.users.cache.size}`, true)
          .addField("Servers", `${client.guilds.cache.size}`, true)
          .addField("Channels ", `${client.channels.cache.size}`, true)
          .addField("Discord.js", `v${version}`, true)
          .addField("Node", `${process.version}`, true)
          .addField("CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
          .addField("CPU usage", `\`${percent.toFixed(2)}%\``, true)
          .addField("Arch", `\`${os.arch()}\``, true)
          .addField("Platform", `\`\`${os.platform()}\`\``, true)
          .addField("API Latency", `${(client.ws.ping)}ms`)  
      message.channel.send({embeds: [botinfo]})
  });
  }
  };