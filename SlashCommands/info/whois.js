const { MessageEmbed } = require("discord.js");
const moment = require('moment');
const { Client, CommandInteraction } = require("discord.js");

module.exports = {
   name: 'whois',
   aliases: ['userinfo', 'ui', 'ws'],
   cooldown: 5,
   description: 'get info of a user',
   usage: 'whois <user>',
   options: [
    {
        name: "member",
        description: "select a member",
        type: "USER",
        required: true,
    }, 
],

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
     run: async (client, interaction, args) => {
       
      
        var permissions = [];
      const member = interaction.options.getMember('member')
  
        
      
       
        const roles = member.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
      
        if(member.permissions.has("KICK_MEMBERS")){
            permissions.push("Kick Members");
        }
        
        if(member.permissions.has("BAN_MEMBERS")){
            permissions.push("Ban Members");
        }
        
        if(member.permissions.has("ADMINISTRATOR")){
            permissions.push("Administrator");
        }
    
        if(member.permissions.has("MANAGE_MESSAGES")){
            permissions.push("Manage Messages");
        }
        
        if(member.permissions.has("MANAGE_CHANNELS")){
            permissions.push("Manage Channels");
        }
        
        if(member.permissions.has("MENTION_EVERYONE")){
            permissions.push("Mention Everyone");
        }
    
        if(member.permissions.has("MANAGE_NICKNAMES")){
            permissions.push("Manage Nicknames");
        }
    
        if(member.permissions.has("MANAGE_ROLES")){
            permissions.push("Manage Roles");
        }
    
        if(member.permissions.has("MANAGE_WEBHOOKS")){
            permissions.push("Manage Webhooks");
        }
    
        if(permissions.length == 0){
            permissions.push("No Key Permissions Found");
        }
    
        if(member.user.id == interaction.guild.ownerID){
            acknowledgements.push = 'Server Owner';
        }

     
        const embed = new MessageEmbed()
            .setDescription(`<@${member.user.id}>`)
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
            .setColor('RANDOM')
            .setFooter(`Requested By: ${interaction.user.id}`)
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            .addField('__Joined at:__ ',` \`\`\`\ ${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")} \`\`\`\ `)
            .addField('__Created On:__', ` \`\`\`\ ${member.user.createdAt.toLocaleString()} \`\`\`\ `)
            .addField("__Nickname__", ` \`\`\`\ ${member.nickname !== null ? `${member.nickname}` : 'None'} \`\`\`\ `)
            .addField( `__Bot__`,` \`\`\`\ ${member.user.bot ? "Yes" : "No"}\`\`\`\ `)
            .addField(`__Roles [${roles.length}]__`, roles.length < 15 ? roles.join(' ') : roles.length > 15 ? `${roles.slice(0, 15).join(' ')}\n+${roles.length-15} roles...` : 'None')
            .addField("\n__Permissions:__ ", `${permissions.join(` | `)}`);
        interaction.followUp({embeds: [embed]});
    
    }
    }
