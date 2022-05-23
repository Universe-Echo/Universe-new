const discord = require("discord.js");
const imdb = require("imdb-api");
const ee = require('../../config/embed.json')
module.exports = {
  name: "imdb",
  description: "Get the information about a series or movie",
  category: "info",
  usage: "imdb <query>",
  cooldown: 5,
  run: async (client, message, args, color) => {

    if (!args.length) {
      return message.channel.send("**Please give the name of movie or series!**")
    }

    const imob = new imdb.Client({ apiKey: "5e36f0db" }) //You need to paste you imdb api

    let movie = await imob.get({ 'name': args.join(" ") })

    let embed = new discord.MessageEmbed()
      .setTitle(movie.title)
      .setColor("RANDOM")
      .setThumbnail(movie.poster)
      .setDescription(movie.plot)
      .addField("Country", movie.country, true)
      .addField("Languages", movie.languages, true)
      .addField("Type", movie.type, true)
      .setFooter({
        text: `Ratings: ${movie.rating}\n${ee.footertext}`,
        iconURL: `${ee.footericon}`
      })

    message.channel.send({ embeds: [embed] })



  }

}