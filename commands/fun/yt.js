const Discord = require('discord.js'); 
const fetch = require('node-superfetch')
//const config = require('../../config.json')


module.exports = {
    name : 'ytstats',
    aliases: ['yt', 'ytinfo'], 
    timeout: 5,
    description: "get information of a specific yt channel.",
    usage: "<channel name>",
    run: async(client, message, args) => { 

    let name = args.slice(0).join(" ").replace(/ -/g, " ") // it gonna replace " " by -
    const syntaxErr = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
    .setTitle('Syntax Error!')
    .addField('Uses:', '>yt <channel-name>')
    
    if (!name) return message.reply({embeds: [syntaxErr]}); 



        try{
            const channel =  await fetch.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&key=AIzaSyCcS_PXKf4ISubu1cAM4Xn1EiWMThhH2ZU&maxResults=1&type=channel`)
            
    
        

            const data =  await fetch.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${channel.body.items[0].id.channelId}&key=AIzaSyCcS_PXKf4ISubu1cAM4Xn1EiWMThhH2ZU`)
        

            const embed = new Discord.MessageEmbed()
            
            .setTitle('Youtube Stats')
            .setThumbnail(channel.body.items[0].snippet.thumbnails.high.url)
            .setTimestamp(new Date())
            .addField("Channel Name", channel.body.items[0].snippet.channelTitle)
            .addField("Channel Description", channel.body.items[0].snippet.description)
            .addField("Subscribers Count", parseInt(data.body.items[0].statistics.subscriberCount).toLocaleString(), true)
            .addField("Total Views", parseInt(data.body.items[0].statistics.viewCount).toLocaleString())
            .addField("Total Video(s)", parseInt(data.body.items[0].statistics.videoCount).toLocaleString())
            .addField("Date Created", new Date(channel.body.items[0].snippet.publishedAt).toDateString())
            .addField("Country", data.body.items[0].snippet.country ? `${data.body.items[0].snippet.country}`  : "No Country Provided")
            .addField("Link", `[${channel.body.items[0].snippet.channelTitle}](https://www.youtube.com/channel/${channel.body.items[0].id.channelId})`)
           
            
             message.reply({embeds: [embed]});
        
        } catch(err) {
            const channel =  await fetch.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&key=AIzaSyCcS_PXKf4ISubu1cAM4Xn1EiWMThhH2ZU&maxResults=1&type=channel`)
            console.log(err)
            message.channel.send('**There was an error!**')
            if (!channel.body.items[0]) return message.reply("No channel result. Try again.");
        }
    }
}