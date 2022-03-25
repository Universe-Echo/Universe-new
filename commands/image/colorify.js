const { MessageEmbed } = require("discord.js")

  module.exports = {
        name: "colorify",
        cooldown: 5,
        description: 'colorify pfp',
        run: async (client, message, args) => {
            if(!args.length) return message.channel.send("Usage: `>colorify @user color` or `>colorify color`")
            const user = message.mentions.users.first()
            if(user && !args[1]) return message.channel.send("Usage: `>colorify @user color` or `>colorify color`")
      const avatar = user ? user.displayAvatarURL({ format: "png", size: 4096 }) : message.author.displayAvatarURL({ format: "png", size: 4096})
            const color = user ? args[1] : args[0]
            const img = `https://api.popcat.xyz/colorify?image=${encodeURIComponent(avatar)}&color=${color}`
      const em = new MessageEmbed()
      .setColor(color.toUpperCase())
      .setImage(img)
      message.channel.send({embeds: [em]})
        }
    }