const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

const figlet = require("figlet");
const { promisify } = require("util");
const figletAsync = promisify(figlet);
const ee = require('../../config/embed.json')
module.exports = {
  name: "ascii",

  cooldown: 5,
  description: "Ascii Art!",
  usage: "ascii <text>",
  run: async (client, message, args) => {




    let Content = args.join(" ");

    if (!Content) return message.channel.send(`**Please Give Me Text!**`);

    let Result = await figletAsync(Content);

    let embed = new MessageEmbed()



      .setDescription("```" + Result + "```")
      .setTimestamp()
      .setFooter({
        text: `${ee.footertext}`,
        iconURL: `${ee.footericon}`
      })
      .setColor(`${ee.color}`)
    if (Content.length > 20)
      return message.channel.send(`**Please Make Shorter! | Limit : 20**`);

    message.channel.send({ embeds: [embed] });



    //End
  }
}