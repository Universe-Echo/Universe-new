
const { MessageFlags } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
  name: 'hug',
  cooldown: 5,
  description: 'hug someone',
  usage: 'hug <user>',
  run: async (client, message, args) => {

    //  const gifs = ["https://tenor.com/view/hug-anime-gif-15793126",
    //               "https://tenor.com/view/anime-cute-sweet-hug-gif-12668681",
    //               "https://tenor.com/view/hug-anime-gif-4898650",
    //               "https://tenor.com/view/hug-anime-gif-19674705"]

    //  const randomMessage = gifs[Math.floor(Math.random() * gifs.length)];


    let url = 'https://g.tenor.com/v1/search?q=anime_hug&key=EURH7SHHRLJW&limit=8'

    let response = await fetch(url);

    let json = await response.json();
    // console.log(json);

    const index = Math.floor(Math.random() * json.results.length);



    let huggedperson = message.mentions.members.first()

    let hugperson = message.author || await message.guild.members.fetch(args[0]);
    if (!huggedperson) return message.channel.send('**Provide me a person to hug re .__.**')
    if (huggedperson === message.member) return message.channel.send('**You wanna hug yourself ._.**');
    //  if (huggedperson === bot) return message.channel.send('You cannot a bot -__-');
    try {

      huggedperson.send(`**You got a hug from ${message.author.username} :)**`).catch(err => message.channel.send(`Can't dm ${huggedperson}`));

      message.channel.send(`**${message.author.username} hugs ${huggedperson.user.username}, cute uwu**`)
      message.channel.send(json.results[index].url)



    }
    catch (e) {
      return message.channel.send(`there was an error:\n${e.message}`)
    }



  }
}
