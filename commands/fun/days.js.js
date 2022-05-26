const moment = require('moment')
const { MessageEmbed } = require('discord.js')
const ee = require('../../config/embed.json')
module.exports = {
  name: 'days',
  cooldown: 5,
  description: 'get days or years till today from a specific date',
  usage: 'days dd/mm/yyyy',
  run: (client, message, args) => {
    //  const args = message.content.split(' ').slice(1);

    days = args.join(" ");
    if (!days) return message.reply('Please provide a date(dd/mm/yyyy)')
    var mydate = moment(`${days}`, 'DD/MM/YYYY');

    //format that date into a different format
    const days1 = moment(mydate).format("MM/DD/YYYY");


    var day2 = new Date(days1);
    var check = new Date();

    var milliDay = 1000 * 60 * 60 * 24; 

    var ageInDays = (check - day2) / milliDay;

    var ageInYears = Math.floor(ageInDays / 365);
    var age = ageInDays / 365;
    var age2 = Math.round(ageInDays)

    const daysEmbed = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL())
      .setTitle('Days/years -')
      .addField('In years:', `${ageInYears}`)
      .addField('In days:', `${age2}`)
      .setFooter({
        text: `From:- ${days1}\n${ee.footertext}`,
        iconURL: `${ee.footericon}` 
      })
      .setColor(`${ee.color}`)
    message.reply({ embeds: [daysEmbed] })

  }
}
