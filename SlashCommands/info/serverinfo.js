const Discord = require('discord.js');
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
module.exports = {
    name: 'serverinfo',
    aliases: ['si', 's', 'server-info'],
    cooldown: 5,
    description: "Get server's info",
    usage: 'serverinfo',

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
    const guild = interaction.guild

    const verificationLevels = {
      NONE: 'None',
      LOW: 'Low',
      MEDIUM: 'Medium',
      HIGH: 'High',
      VERY_HIGH: 'Very High'
  };
    const channels = interaction.guild.channels.cache;
    const members = interaction.guild.members.cache;
    const roles = interaction.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
    const vanityCode = interaction.guild.vanityURLCode;
        let vanityInvite = `https://discord.gg/${vanityCode}`;
        if (vanityCode === null) vanityInvite = 'No custom URL';
   
      const embed = new Discord.MessageEmbed()
      .setTitle(`Server info for ${interaction.guild.name}`)
      .setThumbnail(guild.iconURL({ dynamic: true, size: 512 }))
      .addField("Owner", `<@${interaction.guild.ownerId}>`)
      .addField("Member Count", ` \`\`\`\css\n${interaction.guild.memberCount} \`\`\`\ `)
      .addField("Emojis", ` \`\`\`\css\n${interaction.guild.emojis.cache.size} \`\`\`\ `, true)
      .addField(`Animated`, ` \`\`\`\css\n${interaction.guild.emojis.cache.filter(emoji => emoji.animated).size.toString()} \`\`\`\ `, true)
      .addField("Created On", ` \`\`\`\css\n [${interaction.guild.createdAt.toDateString()}] \`\`\`\ `)
      .addField('Verification level', ` \`\`\`\css\n [${verificationLevels[interaction.guild.verificationLevel]}] \`\`\`\ `, true)
      
      .addField('Total Channels',  ` \`\`\`\css\n${interaction.guild.channels.cache.size} \`\`\`\ `)
      .addField(`Text`, ` \`\`\`\css\n${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size.toString()} \`\`\`\ `, true )
      .addField(`Voice`, ` \`\`\`\css\n${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size.toString()} \`\`\`\ ` , true ) 
 
      .addField(" Roles", ` \`\`\`\css\n${interaction.guild.roles.cache.size} \`\`\`\ `, true)
      .addField('Boosts', ` \`\`\`\css\n${interaction.guild.premiumSubscriptionCount || '0'} \`\`\`\ `, true)
      .addField(`Boost Level`,` \`\`\`\css\n${interaction.guild.premiumTier.toString()} \`\`\`\ `, true)
      .addField(`Vanity`,` \`\`\`\css\n [${vanityInvite}] \`\`\`\ `)
      .addField(`Roles [${roles.length}]`, roles.length < 15 ? roles.join(' ') : roles.length > 15 ? `${roles.slice(0, 15).join(' ')}\n+${roles.length-15} roles...` : 'None')
      .setTimestamp()
      .setFooter(`Requested By: ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
     

    interaction.followUp({ embeds: [embed]})
  
    }}