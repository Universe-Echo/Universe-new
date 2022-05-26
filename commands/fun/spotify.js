const { MessageEmbed } = require('discord.js');
const ee = require("../../config/embed.json")
module.exports = {
  name: 'spotify',
  cooldown: 5,
  description: `Check the specified user's spotify status`,
  usage: 'spotify, spotify <user>',
  run: async (client, message, args) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
    const activities = user.presence.activities;
    const array = [];
    for (let i = 0; i < activities.length; i++) {
      if (activities[i].name === 'Spotify') {
        array.push(activities[i].syncID);
        const data = user.presence.activities[i];
        let trackAuthor = data.state;

        let trackURL = `https://open.spotify.com/track/${data.syncId}`;

        trackAuthor = trackAuthor.replace(/;/g, ",")

        const embed = new MessageEmbed()
          .setAuthor('Spotify Track Info', 'https://cdn.discordapp.com/emojis/408668371039682560.png')
          .setColor(`${ee.color}`)
          .setThumbnail(`https://i.scdn.co/image/${data.assets.largeImage.slice(8)}`)
          .addField('Song Name', `\`\`\`css\n [ ${data.details} ] \n\`\`\``, true)
          .addField('Album', `\`\`\`css\n [ ${data.assets.largeText} ]\n\`\`\``, true)
          .addField('Author', `\`\`\`css\n [ ${trackAuthor} ] \n\`\`\``, true)
          .setTimestamp()
          .addField('Listen to Track', `${`\`\`\`css\n [ ${trackURL} ] \`\`\``}`, false)
          .setFooter(user.displayName, user.user.displayAvatarURL({ dynamic: true }))
          .setFooter({
            text: `${user.displayName}\n${ee.footertext}`,
            iconURL: `${ee.footerav}`
          })
        message.reply({ embeds: [embed] });
      }
    }
    if (array.length === 0) return message.reply('**This member is not listening to Spotify (they must have a spotify activity)**');

  }
}

