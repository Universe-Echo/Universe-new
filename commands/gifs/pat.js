const cooldown = new Set();
const fetch = require('node-fetch')
module.exports = {
    name: 'pat',
    cooldown: 5,
   run: async(client, message, args) => {
       
      if (cooldown.has(message.author.id)) {
        message.channel.send('Pls wait 10 secs before using that command....').then(msg=>msg.delete({timeout:"1000"/*Time until delete in milliseconds*/})
       
        )}
    else {
      let url = 'https://g.tenor.com/v1/search?q=anime_pat&key=EURH7SHHRLJW&limit=8'
        
      let response = await fetch(url);
  
      let json = await response.json();
     // console.log(json);
  
      const index = Math.floor(Math.random() * json.results.length);
     
  let huggedperson = message.mentions.members.first()
  let hugperson = message.author || await message.guild.members.fetch(args[0]);
  if (!huggedperson) return message.channel.send('**Provide me a person to pat re .__.**') 
  if (huggedperson === message.member)
   message.channel.send('**You wanna pat yourself fine..**');
  try {
      
 huggedperson.send(`**You got a nice pat from ${message.author.username} :)**`).catch(err => message.channel.send(`Can't dm ${huggedperson}`));

message.channel.send(`**${message.author.username} pats ${huggedperson.user.username}, cute uwu**`)
message.channel.send(json.results[index].url)


  }
  catch (e) {
      return message.channel.send(`there was an error:\n${e.message}`)
}
    }
      cooldown.add(message.author.id);
        setTimeout(() => {
            cooldown.delete(message.author.id)
        }, 10000);

     
      }
    }
  
