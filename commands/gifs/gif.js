const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');


module.exports = {
    name: 'gif',
    aliases: ['g', 'gifs'],
    cooldown: 15,

    run: async(client, message, args) => {

   
       
        
            let msgArray = message.content.split(" ");
            let nargs = msgArray.slice(1);
            if(!nargs) return message.channel.send('**Please provide a query!**')
            let query = nargs.toString()
           if(query === 'sex') return message.delete() && message.channel.send('**Please refrain from using blacklisted queries!**')
           if(query === 'sexy') return message.delete() && message.channel.send('**Please refrain from using blacklisted queries!**')
           if(query === 'bitch') return message.delete() && message.channel.send('**Please refrain from using blacklisted queries!**')
           if(query === 'hot') return message.delete() && message.channel.send('**Please refrain from using blacklisted queries!**')
           if(query === 'fuck') return message.delete() && message.channel.send('**Please refrain from using blacklisted queries!**')
           if(query === 'kiss') return message.delete() && message.channel.send('**Please refrain from using blacklisted queries!**')
           if(query === 'kiss me') return message.delete() && message.channel.send('**Please refrain from using blacklisted queries!**') 
           if(query === 'fuc u') return message.delete() && message.channel.send('**Please refrain from using blacklisted queries!**')
           if(query === 'fuc') return message.delete() && message.channel.send('**Please refrain from using blacklisted queries!**')
           if(query === 'suck') return message.delete() && message.channel.send('**Please refrain from using blacklisted queries!**')
           if(query === 'phuck') return message.delete() && message.channel.send('**Please refrain from using blacklisted queries!**')
           if(query === 'phak') return message.delete() && message.channel.send('**Please refrain from using blacklisted queries!**')
           if(query === 'piyush') return message.delete() && message.channel.send('**Please refrain from using blacklisted queries!**')
           if(query === 'echo') return message.delete() && message.channel.send('**Hes my owner!**')
           if(query === 'Piyush') return message.delete() && message.channel.send('**Please refrain from using blacklisted queries!**')
           let url = `https://g.tenor.com/v1/search?q=${nargs}&key=EURH7SHHRLJW&limit=8`
    
            let response = await fetch(url);
        
            let json = await response.json();
          //  console.log(json);
        
            const index = Math.floor(Math.random() * json.results.length);
        
        
            message.channel.send(json.results[index].url);
        }
        
    
}