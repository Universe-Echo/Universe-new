const db = require('../../models/warns')

const { Message, MessageEmbed } = require('discord.js')


module.exports = {
    name: 'warn',
    cooldown: 5,
    userPermissions: ['BAN_MEMBERS'],
    description: 'warn a member',
   run: async (client, message, args) => {


        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (user === message.member) return message.channel.send('**You wanna warn yourself nice :)**');
        if(!user) return message.channel.send('**Please provide a user!**')
const reason = args.slice(1).join(" ") || 'No reason'
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(!data) {
                data = new db({
                    guildid: message.guild.id, 
                    user: user.user.id,

                    content : {
                        moderator: message.author.id,
                        reason: reason
                    }


                })
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason: reason
                }
                     
                data.content.push(obj)
            }
            data.save()
        })
        const userEmbed = new MessageEmbed()
        .addField(`**You were warned in ${message.guild.name}**`, `**Reason: \`${reason}\`**`)
        .setColor('BLURPLE')
        user.send({embeds: [userEmbed]}).catch(() => { })
        const newEmbed = new MessageEmbed()
        .setTitle('Warned!')
        .addField(`User`, `<a:arrow_arrow:940504275606470707> \`${user.user.tag}\``)
        .addField(`Reason`, `<a:arrow_arrow:940504275606470707> \`${reason}\``)
        .setThumbnail(user.user.displayAvatarURL({dynamic: true}))

       // .setDescription(`Warned ${user} for ${reason}`)
        .setColor('RED')
        message.channel.send({embeds: [newEmbed]})
    }
}