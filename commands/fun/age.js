const { moment } = require('moment')
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'age',
    cooldown: 5,
    description: 'get your age in years and days',
    run: (client, message, args) => {
      //  const args = message.content.split(' ').slice(1);

        birtht = args.join(" ");
        if(!birtht) return message.reply('Please provide a date of birth... **ex: 12/10/2005(mm/dd/yy) btw mere owner ka DOB hai :)**')
      var birth = new Date(birtht);
        var check = new Date();
        
        var milliDay = 1000 * 60 * 60 * 24; // a day in milliseconds;
        
        
        var ageInDays = (check - birth) / milliDay;
        
        var ageInYears =  Math.floor(ageInDays / 365 );
        var age =  ageInDays / 365 ;
        var age2 = Math.round(ageInDays)
        console.log( 'Whole years : ' + ageInYears + '\nDays : ' + ageInDays  );
const birthEmbed = new MessageEmbed()
.setThumbnail(client.user.displayAvatarURL())
.setTitle('Age')
.addField('In years:', `${ageInYears}`)
.addField('In days:', `${age2}`)
message.reply({embeds: [birthEmbed]})
        
        }
    }
