const { MessageEmbed } = require('discord.js')


module.exports = {
    name: 'time',
    cooldown: 5,
    description: 'get the current date and time in IST',
    usage: 'time',
run: (client, message, args) => {
   const date = new Date().toLocaleString("en-US", {timeZone: "IST"})

   //const hour = date.getHours()
  // const min = date.getMinutes()
 //  const sec = date.getSeconds()
    const time = new MessageEmbed()
    .setDescription(`${date}`)
    message.reply({embeds: [time]})
}
}