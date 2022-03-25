const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'invite(old)',
    cooldown: 10,
    description: 'Invite bot in your server!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: (client, message, args) => {
        const icon2 = client.user.avatarURL({ dynamic: true })
        const embed = new MessageEmbed()
        .setAuthor({ name: "INVITE LINKS!", iconURL: `${icon2}`})
        .setDescription('[Invite Me](https://discord.com/api/oauth2/authorize?client_id=934034791702081546&permissions=1103206148215&scope=bot%20applications.commands)')
        .setColor("WHITE")
        .setTimestamp()
        message.channel.send({embeds: [embed]})
    }
}