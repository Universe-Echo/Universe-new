const weather = require('weather-js');
const discord = require('discord.js')
const axios = require('axios')
const { MessageEmbed } = require('discord.js')
const ee = require("../../config/embed.json")
module.exports = {
  name: "weather",
  description: "Get the weather of anywhere",
  cooldown: 5,
  usage: "weather <location>",
/**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    const p = await client.prefix(message);

    const syntaxErr = new discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
      .setTitle('Syntax Error!')
      .addField('Uses:', '>weather <location>')
      .addField('Example:', '>weather london')
    if (!args.length) return message.channel.send({ embeds: [syntaxErr] })

    const location = args.join(" "); 
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=353bb5da3e214ddaaa025918221405&q=${location}&days=1&aqi=no&alerts=no`
    ).catch(e => {
      message.channel.send('**There was an error! please try a different location...**')
    })


    const info = response.data
    const forcastarr = info.forecast.forecastday
    const [first] = forcastarr;
   
    if (info.location) {
      const e = new MessageEmbed();
      e.setTitle(`${info.location.name}'s weather`);
      e.setColor(`${ee.color}`)
     
     
      e.addField("Current temp", ` \`\`\` ${info.current.temp_c}°C \`\`\` ` );
      e.addField('Max temp', ` \`\`\` ${first.day.maxtemp_c}°C \`\`\` `, true)
      e.addField('Min temp', ` \`\`\` ${first.day.mintemp_c}°C \`\`\` `, true)
      // e.addField("Feels Like", ` \`\`\` ${info.current.feelslike_c}°C \`\`\` `);
     
      // e.addField("Temperature (F):", `${info.current.temp_f}`, true);
      e.addField("Condition", ` \`\`\`\ ${info.current.condition.text} \`\`\`\ `, true);
      e.addField("Wind speed", ` \`\`\` ${info.current.wind_kph}kph \`\`\` `, true);
      // e.addField("Wind speed (kph):", `${info.current.wind_kph}`, true);
      e.addField("Humidity", ` \`\`\` ${info.current.humidity}% \`\`\` `, true);
      e.addField("Local Time", ` \`\`\`${info.location.localtime} \`\`\` `);
      e.addField('Location', ` \`\`\` ${info.location.name}, ${info.location.region}, ${info.location.country} \`\`\` `)
      e.addField('Time of observation', `${info.current.last_updated}`)

      e.setThumbnail("https:" + info.current.condition.icon);
      e.setFooter({
        text: `${ee.footertext}`,
        iconURL: `${ee.footericon}`
      })
      message.reply({ embeds: [e] });
     
    } else {
      message.reply({ content: "Please provide a valid location!" });
    }
  
   

  }
}