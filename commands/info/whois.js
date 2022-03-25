const { MessageEmbed } = require("discord.js");
const moment = require('moment');

const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline/Invisible"
};
const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

module.exports = {
   name: 'whois',
   aliases: ['userinfo', 'ui', 'ws'],
   cooldown: 5,
   description: 'get info of a user',
     run: async (client, message, args) => {
       
      
        var permissions = [];
       var acknowledgements = [];
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let activities = [];
        member?.presence?.activities.forEach(a => {
            if (a.id !== 'custom') {
                if (a.name === 'Spotify') activities.push(`**•** Listening to **${a.details}** by **${a.state}**`);
                else activities.push(`**•** ${capitalizeFirstLetter(a.type)} **${a.name}**`);
            }
        })
    //    const status = `${statuses[member.presence?.status]} ${member.presence?.status}`
      
       
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
    
        if(member.user.id == message.guild.ownerID){
            acknowledgements.push = 'Server Owner';
        }

        let memberPermissons = `${member.permissions.toArray().map(p => `\`${p}\``).join(", ")}`;
      //  const rolePermissions = role.permissions.toArray();
     // if (activities === 0) activities = 'no activity'
     // const playing = member.presence.activities[0] ? member.presence.activities[0].state : `User isn't have a custom status!`
        const embed = new MessageEmbed()
            .setDescription(`<@${member.user.id}>`)
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
            .setColor('RANDOM')
            .setFooter(`ID: ${message.author.id}`)
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            .addField('__Joined at:__ ',` \`\`\`\ ${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")} \`\`\`\ `)
            .addField('__Created On:__', ` \`\`\`\ ${member.user.createdAt.toLocaleString()} \`\`\`\ `)
         //   .addField(`Status -`, `${status}`)
      //   .addField("__Status__", ` \`\`\`\ ${playing} \`\`\`\ `, true)
         .addField("__Nickname__", ` \`\`\`\ ${member.nickname !== null ? `${member.nickname}` : 'None'} \`\`\`\ `)
        .addField( `__Bot__`,` \`\`\`\ ${member.user.bot ? "Yes" : "No"}\`\`\`\ `)
       //   .addField('__Activity__', `${activities.length > 0 ? `\n\n${activities.join('\n')}\n` : ``}`)
            .addField(`__Roles [${roles.length}]__`, roles.length < 15 ? roles.join(' ') : roles.length > 15 ? `${roles.slice(0, 15).join(' ')}\n+${roles.length-15} roles...` : 'None')
         //   .addField("\n__Acknowledgements:__ ", `${acknowledgements}`, true)
         // .addField(`Permissions -`, `${memberPermissons}`)
    //   .addField('Permissions', `\`\`\`diff\n${permissions.join(' | ')}\`\`\``)
   // .addField("\n__Acknowledgements:__ ", `${acknowledgements}` || 'null', true)
    .addField("\n__Permissions:__ ", `${permissions.join(` | `)}`);
        message.channel.send({embeds: [embed]});
    
    }
    }
