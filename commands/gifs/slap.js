
const { MessageFlags } = require('discord.js')
const fetch = require('node-fetch')
const cooldown = new Set()
module.exports = {
  name: 'slap',
  cooldown: 5,
  description: 'slap someone',
  usage: 'slap <user>',
  run: async (client, message, args) => {

    //  const gifs = ["https://tenor.com/view/hug-anime-gif-15793126",
    //               "https://tenor.com/view/anime-cute-sweet-hug-gif-12668681",
    //               "https://tenor.com/view/hug-anime-gif-4898650",
    //               "https://tenor.com/view/hug-anime-gif-19674705"]

    //  const randomMessage = gifs[Math.floor(Math.random() * gifs.length)];

    let url = 'https://g.tenor.com/v1/search?q=anime_slap&key=EURH7SHHRLJW&limit=8'

    let response = await fetch(url);

    let json = await response.json();
    // console.log(json);

    const index = Math.floor(Math.random() * json.results.length);



    let huggedperson = message.mentions.members.first()

    let hugperson = message.author || await message.guild.members.fetch(args[0]);
    if (!huggedperson) return message.channel.send('**Provide me a person to slap .__.**')
    if (huggedperson === message.member) return message.channel.send('**Well better clap XD**');
    //  if (huggedperson === bot) return message.channel.send('You cannot a bot -__-');
    try {



      message.channel.send(`**${message.author.username} slaps ${huggedperson.user.username}**`)
      message.channel.send(json.results[index].url)



    }
    catch (e) {
      return message.channel.send(`there was an error:\n${e.message}`)
    }




  }
}