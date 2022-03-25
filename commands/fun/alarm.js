const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'alarm',
    run: (client, message, args) => {

        const user = client.users.cache.get(message.author.id)
const hour = args[0]

/*const min = args[1]

const reason = args[2]
const hour1 = parseInt(hour)
const min1 = parseInt(min)
const syntaxErr = new MessageEmbed()
.setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
.setTitle('Syntax Error!')
.addField('Use', '>alarm <hour> <min> <reason>')
.addField('Example:', '>alarm 20 30 dinner\n>alarm 10 00 lunch') 


if(!hour) return message.channel.send({embeds: [syntaxErr]})
if(!min) return message.channel.send({embeds: [syntaxErr]})
const embed = new MessageEmbed()
.setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
.setColor("BLACK")
.setDescription(`Time: \`${hour}:${min}\`\nReason: \`${reason || 'no reason'}\``)
.setTimestamp()
message.channel.send({embeds: [embed]})

        setInterval(() => {
            const date = new Date().toLocaleString("en-US", {timeZone: "IST"})
            if (date.getHours() === hour1 && date.getMinutes() === min1 ) {
             const userEmbed = new MessageEmbed()
             .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
             .setColor("AQUA")
             .setDescription(`Time: \`${hour}:${min}\`\nReason: \`${reason || 'no reason'}\`\nAlarm was set in server: \`${message.guild.name}\``)
             .setTimestamp()
              user.send({embeds: [userEmbed]}).catch(() => {})
            }
          }, 60000)*/
    }
 
 }