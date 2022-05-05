const Discord = require('discord.js');

module.exports = {
  name: 'serverinfo',
  aliases: ['si', 's', 'server-info'],
  cooldown: 5,
  description: "Get server's info",
  usage: 'serverinfo',
  run: async (client, message, args) => {
    const { guild } = message

    const { name, region, memberCount, afkTimeout } = guild
    const icon = guild.iconURL()

    const verificationLevels = {
      NONE: 'None',
      LOW: 'Low',
      MEDIUM: 'Medium',
      HIGH: 'High',
      VERY_HIGH: 'Very High'
    };
    const channels = message.guild.channels.cache;
    const members = message.guild.members.cache;
    const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
    const vanityCode = message.guild.vanityURLCode;
    let vanityInvite = `https://discord.gg/${vanityCode}`;
    if (vanityCode === null) vanityInvite = 'No custom URL';

    const embed = new Discord.MessageEmbed()
      .setTitle(`Server info for ${message.guild.name}`)
      .setThumbnail(guild.iconURL({ dynamic: true, size: 512 }))
      .addField("Owner", `<@${message.guild.ownerId}>`)
      .addField("Member Count", ` \`\`\`\css\n${message.guild.memberCount} \`\`\`\ `)
      .addField("Emojis", ` \`\`\`\css\n${message.guild.emojis.cache.size} \`\`\`\ `, true)
      .addField(`Animated`, ` \`\`\`\css\n${message.guild.emojis.cache.filter(emoji => emoji.animated).size.toString()} \`\`\`\ `, true)
      .addField("Created On", ` \`\`\`\css\n [${message.guild.createdAt.toDateString()}] \`\`\`\ `)
      .addField('Verification level', ` \`\`\`\css\n [${verificationLevels[message.guild.verificationLevel]}] \`\`\`\ `, true)

      .addField('Total Channels', ` \`\`\`\css\n${message.guild.channels.cache.size} \`\`\`\ `)
      .addField(`Text`, ` \`\`\`\css\n${message.guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size.toString()} \`\`\`\ `, true)
      .addField(`Voice`, ` \`\`\`\css\n${message.guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size.toString()} \`\`\`\ `, true)
      //  .addField(`Text`, ` \`\`\`\css\n ${message.guild.channels.cache.filter(channel => channel.type === 'text').size} \`\`\`\ `, true)
      //   .addField(`Voice`, ` \`\`\`\css\n ${message.guild.channels.cache.filter(channel => channel.type === 'voice').size} \`\`\`\ `, true)
      .addField(" Roles", ` \`\`\`\css\n${message.guild.roles.cache.size} \`\`\`\ `, true)
      .addField('Boosts', ` \`\`\`\css\n${message.guild.premiumSubscriptionCount || '0'} \`\`\`\ `, true)
      .addField(`Boost Level`, ` \`\`\`\css\n${message.guild.premiumTier.toString()} \`\`\`\ `, true)
      .addField(`Vanity`, ` \`\`\`\css\n [${vanityInvite}] \`\`\`\ `)
      .addField(`Roles [${roles.length}]`, roles.length < 15 ? roles.join(' ') : roles.length > 15 ? `${roles.slice(0, 15).join(' ')}\n+${roles.length - 15} roles...` : 'None')
      .setTimestamp()
      .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    //.setFooter(`Id - ${message.guild.id}`)

    message.channel.send({ embeds: [embed] })

  }
}
