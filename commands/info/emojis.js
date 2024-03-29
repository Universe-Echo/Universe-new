const { MessageEmbed } = require("discord.js");
const ee = require("../../config/embed.json")
module.exports = {
  name: "emojis",
  description: "View all emojis in the guild",
  category: "utility",
  cooldown: 5,
  usage: 'emojis',
  run: async (client, message, args) => {
    let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;
    function Emoji(id) {
      return client.emojis.cache.get(id).toString();
    }
    message.guild.emojis.cache.forEach((emoji) => {
      OverallEmojis++;
      if (emoji.animated) {
        Animated++;
        EmojisAnimated += Emoji(emoji.id);
      } else {
        EmojiCount++;
        Emojis += Emoji(emoji.id);
      }
    });
    let Embed1 = new MessageEmbed()
      .setTitle(`Emojis in ${message.guild.name}.`)
      .setDescription(
        `**Animated [${Animated}]**:\n${EmojisAnimated}\n\n\n**Standard [${EmojiCount}]**:\n${Emojis}\n\n\n**Over all emojis [${OverallEmojis}]**`
      )
      .setColor(`${ee.color}`)
      .setFooter({
        text: `${ee.footertext}`,
        iconURL: `${ee.footericon}`
      })
    message.channel.send({ embeds: [Embed1] });
  },
};