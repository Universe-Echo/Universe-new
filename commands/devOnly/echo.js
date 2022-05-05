const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'echo',
    aliases: ['owner'],
    description: 'Owner info',
    devOnly: true,
    usage: 'echo',
    run: async (client, message, args) => {


        const echouser = message.guild.members.cache.get('673846605920600068')
        //     console.log(echouser)
        const echo = new MessageEmbed()
            .setTitle('EcHO♡#7298')
            .setThumbnail(echouser.user.displayAvatarURL())
            .addField('__Owner of__', `${client.user.tag}`)
            .addField('__Name__', `Piyush`)
            .addField('__Age__', '16')
            .addField('__Started coding__', '19 July 2021')
            .addField("__Fav language__", 'Javascript')
            .addField('__Hobbies__', 'Talking with best friends XD, coding, electronics, piano')
        message.channel.send({ embeds: [echo] })
    }
}