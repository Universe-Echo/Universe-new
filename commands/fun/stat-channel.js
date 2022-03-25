const Discord = require('discord.js'); 
const fetch = require('node-superfetch')
//const config = require('../../config.json')


module.exports = {
    name : 'stat-channel',
    aliases: ['stat'], 
    timeout: 5,
    description: "Shows information about the specified channel.",
    usage: "<channel name>",
  run: async(client, message, args) => { 

    let name =  'sahil gaming ff'
    if (!name) return message.reply("please provide a valid channel name."); 



        try{
            const channel =  await fetch.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&key=AIzaSyCcS_PXKf4ISubu1cAM4Xn1EiWMThhH2ZU&maxResults=1&type=channel`)
            
    
        

            const data =  await fetch.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${channel.body.items[0].id.channelId}&key=AIzaSyCcS_PXKf4ISubu1cAM4Xn1EiWMThhH2ZU`)
        

            const embed = new Discord.MessageEmbed()
            
           
           
         
            
           const subs = parseInt(data.body.items[0].statistics.subscriberCount).toLocaleString()
            
          message.guild.channels.create(`Subscribers: ${subs}`, {
                type: 'GUILD_VOICE',
                permissionOverwrites: [{
                    id: message.guild.id,
                    allow: ['VIEW_CHANNEL'],
                    deny: ['CONNECT'],


                }]
                
            }).then(channel => {
                channel.setName(`Subscribers: ${subs}`, {timout: 10000})
            })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
               
    
            console.info(`name channel: ${subs} | type: voice`)
        
        } catch(err) {
            const channel =  await fetch.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&key=AIzaSyCcS_PXKf4ISubu1cAM4Xn1EiWMThhH2ZU&maxResults=1&type=channel`)
            console.log(err)
            message.channel.send('**There was an error!**')
            if (!channel.body.items[0]) return message.reply("No channel result. Try again.");
        }
    }
}