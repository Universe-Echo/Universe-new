const { Message, Client, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
const ms = require('ms')
module.exports = {
    name: "unmute",
    aliases: ['uto', 'untimeout'],
    cooldown: 5,
    description: "Untimeout a member from the server!",
    userPermissions: ['MANAGE_MESSAGES'],
    botPermissions: ['MANAGE_MESSAGES'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        try{

            const syntaxErr = new MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setTitle('Syntax Error!')
            .addField('Uses:', '>unmute <user> <reason>\n>ban <user-id> <reason>')
            .addField('Example:', '>unmute @EcHO idk')  
        const aut = message.author;
        const user = message.mentions.members.first() || message.guild.members.fetch(args[0])
        if(!user) return message.channel.send("**Specify a user!**")
        const reason = args.slice(1).join(" ") || 'no reason provided'
        const member = message.guild.members.cache.get(user.id)
        
        await member.timeout(null)
     
        const embed = new MessageEmbed()
        .setAuthor(`${client.user.username}`, client.user.displayAvatarURL())
        .setThumbnail(user.user.displayAvatarURL({dynamic: true}))
        .setTitle(`Success!`)
        .setDescription(`Removed timeout from ${member}`)
        .addField("Moderator :", `${aut}`)
        .addField("Reason :", `${reason}`)
        message.channel.send({ embeds: [embed]})
    } catch(e) {
         message.channel.send({ content: `${e}`})   
         return console.log(e)
    }
} 
}