const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'list-bans',
    aliases: ['bans'],
    category: 'moderation',
    description: 'Check who is banned from the server',
    cooldown: 10,
    userPermissions: ['BAN_MEMBERS'],
    botPermissions: ['ADMINISTRATOR'],


run: async(client, message, args) => {
        

        const fetchBans = message.guild.bans.fetch();
        if (!fetchBans) {
            const NoBannedUsersEmbed = new Discord.MessageEmbed()
                .setColor('#3300EE')
                .setDescription('This server does not have any banned members.')
                .setFooter(client.user.username, client.user.displayAvatarURL())
            return message.channel.send(NoBannedUsersEmbed);
        } else {

            const bannedMembers = (await fetchBans)

            .map((member) => ` User Tag: - \`${member.user.tag}\``)
            .join(" ")
            const bans = new Discord.MessageEmbed()
            .setTitle('Bans')
            .setDescription(bannedMembers)

            message.channel.send(bannedMembers)


    

}
}
}