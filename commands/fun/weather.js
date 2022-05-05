const weather = require('weather-js');
const discord = require('discord.js')

module.exports = {
  name: "weather",
  description: "Get the weather of anywhere",
  cooldown: 5,
  category: "fun",
  usage: "weather <location>",


  run: async (client, message, args) => {
    const p = await client.prefix(message);

    const syntaxErr = new discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
      .setTitle('Syntax Error!')
      .addField('Uses:', '>weather <location>')
      .addField('Example:', '>weather london')
    if (!args.length) return message.channel.send({ embeds: [syntaxErr] })

    weather.find({ search: args.join(" "), degreeType: 'C' }, function (err, result) {
      try {

        let embed = new discord.MessageEmbed()
          .setTitle(`Weather - ${result[0].location.name}`)
          .setColor("RANDOM")
          .setDescription("Temperature units can maybe differ some time")
          .addField("Temperature", ` \`\`\`\css\n ${result[0].current.temperature}°C \`\`\`\ `, true)
          .addField("Sky Text", ` \`\`\`\  ${result[0].current.skytext} \`\`\`\ `, true)
          .addField("Humidity", ` \`\`\`\css\n ${result[0].current.humidity} \`\`\`\ `, true)
          //.addField("Wind Speed", ` \`\`\`\ result[0].current.windspeed \`\`\`\ `, true)//What about image
          .addField("Observation Time", ` \`\`\`\css\n ${result[0].current.observationtime} \`\`\`\ `, true)
          //.addField("Wind Display", result[0].current.winddisplay, true)
          .setThumbnail(result[0].current.imageUrl);
        message.channel.send({ embeds: [embed] })
      } catch (err) {
        return message.channel.send("**Unable To Get the data of Given location**")
      }
    });
    //LETS CHECK OUT PKG

  }
}