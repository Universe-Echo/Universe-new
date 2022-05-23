const { MessageEmbed } = require("discord.js");
const moment = require('moment');
const ee = require("../../config/embed.json")

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

module.exports = {
    name: 'whois',
    aliases: ['userinfo', 'ui', 'ws'],
    cooldown: 5,
    description: 'get info of a user',
    usage: 'whois <user>',
    run: async (client, message, args) => {


        var permissions = [];
        var acknowledgements = [];
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        const roles = member.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        
          
        if (member.permissions.has("KICK_MEMBERS")) {
            permissions.push("Kick Members");
        }

        if (member.permissions.has("BAN_MEMBERS")) {
            permissions.push("Ban Members");
        }

        if (member.permissions.has("ADMINISTRATOR")) {
            permissions.push("Administrator");
        }

        if (member.permissions.has("MANAGE_MESSAGES")) {
            permissions.push("Manage Messages");
        }

        if (member.permissions.has("MANAGE_CHANNELS")) {
            permissions.push("Manage Channels");
        }

        if (member.permissions.has("MENTION_EVERYONE")) {
            permissions.push("Mention Everyone");
        }

        if (member.permissions.has("MANAGE_NICKNAMES")) {
            permissions.push("Manage Nicknames");
        }

        if (member.permissions.has("MANAGE_ROLES")) {
            permissions.push("Manage Roles");
        }

        if (member.permissions.has("MANAGE_WEBHOOKS")) {
            permissions.push("Manage Webhooks");
        }

        if (permissions.length == 0) {
            permissions.push("No Key Permissions Found");
        }

        if (member.user.id == message.guild.ownerID) {
            acknowledgements.push = 'Server Owner';
        }
      


    const response = await fetch(
        `https://japi.rest/discord/v1/user/${member.id}`
      );
      const data = await response.json();
      const badges = data.data.public_flags_array.join(' | ') || "No Badges";

        const embed = new MessageEmbed()
            .setDescription(`<@${member.user.id}>`)
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
            .setColor('RANDOM')
            // .setFooter(`ID: ${message.author.id}`)
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()  
            .addField('__Joined at:__ ', ` \`\`\`\ ${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")} \`\`\`\ `)
            // .addField('__Joined at:__ ', ` \`\`\`\ ${member.user.joinedAt.toLocaleString()} \`\`\`\ `)
            .addField('__Created On:__', ` \`\`\`\ ${moment(member.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")} \`\`\`\ `)
            .addField("__Nickname__", ` \`\`\`\ ${member.nickname !== null ? `${member.nickname}` : 'None'} \`\`\`\ `)
            .addField(`__Bot__`, ` \`\`\`\ ${member.user.bot ? "Yes" : "No"}\`\`\`\ `)
            .addField('__User Bio__', `${data.data.bio || "No bio is set or unable to fetch "}`)
            .addField(`__Roles [${roles.length}]__`, roles.length < 15 ? roles.join(' ') : roles.length > 15 ? `${roles.slice(0, 15).join(' ')}\n+${roles.length - 15} roles...` : 'None')
            .addField('__Highest Role__', `${
                member.roles.highest.id === message.guild.id
                  ? "No Highest Role."
                  : member.roles.highest
                }`)
            .addField('__Badges__', `${badges}`)    
            .addField("\n__Permissions:__ ", `${permissions.join(` | `)}`)
            .setFooter({
                text: `ID: ${message.author.id}\n${ee.footertext}`,
                iconURL: `${ee.footericon}`
              })
        message.channel.send({ embeds: [embed] });

    }
}

