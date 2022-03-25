const { MessageEmbed, version: djsversion } = require("discord.js");
const moment = require("moment");
const momentDurationFormatSetup = require("moment");
const version = require("../../package.json").version;
const { utc } = require("moment");
const os = require("os");
const ms = require("ms")
module.exports = {
  name: "botinfo",
  aliases: ['bi', 'info'],
  cooldown: 5,
  description: "Check the info of the bot",
  category: "Information",
  type: "CHAT_INPUT",


  run: async (client, message, args) => {
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

    const core = os.cpus()[0];
    const embed = new MessageEmbed()
      .setURL(client.web)
      .setThumbnail(client.user.displayAvatarURL())
      .setColor('GREEN')
      .addField(
        "__General__",
        `**❯ Client:** ${client.user.tag} (${client.user.id})
        **❯ Commands:** ${client.commands.size}
        **❯ Servers:** ${client.guilds.cache.size.toLocaleString()} 
        **❯ Users:** ${client.guilds.cache
          .reduce((a, b) => a + b.memberCount, 0)
          .toLocaleString()}
        **❯ Channels:** ${client.channels.cache.size.toLocaleString()}
        **❯ Creation Date:** ${utc(client.user.createdTimestamp).format(
            "Do MMMM YYYY HH:mm:ss"
          )}
        **❯ Node.js:** ${process.version}
        **❯ Version:** v${version}
        **❯ Discord.js:** v${djsversion}
        **❯Up Since**  ${uptime}
        \u200b`
      )
      .setColor('GREEN')
      .addField(
        "__System__",

        `**❯ Platform:** ${process.platform}
        
        **❯ CPU:**
        \u3000 Cores: ${os.cpus().length}
        \u3000 Model: ${core.model}
        \u3000 Speed: ${core.speed}MHz`
      )
      .addField('Developer:', '**EcHO#7298**')
      .setTimestamp();
    message.channel.send({ embeds: [embed] });
  },
};