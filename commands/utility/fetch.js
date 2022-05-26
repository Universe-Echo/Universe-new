const { MessageEmbed } = require('discord.js')
const prettyMs = require('pretty-ms')
const ee = require("../../config/embed.json")
module.exports = {
  name: 'fetch',
  aliases: ['fetch-user', 'find-user', 'fetchuser', 'finduser'],
  cooldown: 5,
  description: 'Fetch a user using id',
  usage: 'fetch <user-id>',
  run: async (client, message, args) => {
    const id = args[0];

    try {
      await client.users.fetch(id);
    } catch (e) {
      return message.reply(`Couldn't look up in discord database for id \`${id}\` because user does not exist in discord database.`);
    }

    const statuses = {
      "online": "Online (User is online)",
      "dnd": "Do Not Disturb (User is in Do not Disturb)",
      "idle": "Idle (User is AFK)",
      "offline": "Offline/Invisible (User is Offline or Invisible)"
    };

    const bot = {
      true: "Yes",
      false: "No"
    };

    const user = await client.users.fetch(id);



    const uEmbed = new MessageEmbed()
      .setTitle(`${user.tag}`)
      .addField("[User]:", `▫ Username: ${user.username}\n▫ Tag: ${user.tag}\n▫ ID: ${id}\n▫ Bot: ${bot[user.bot]}`)
      //    .addField("[Presence]:", `▫ Status: ${statuses[user.presence.status]}`)
      .addField("[Joined Discord:]", `${prettyMs(message.createdTimestamp - user.createdTimestamp)} ago`)
      .setThumbnail(user.displayAvatarURL())
      .setColor(`${ee.color}`)
      .setTimestamp()
      .setFooter({
        text: `${ee.footertext}`,
        iconURL: `${ee.footericon}`
      })
    message.reply({ embeds: [uEmbed] });
  }
}

