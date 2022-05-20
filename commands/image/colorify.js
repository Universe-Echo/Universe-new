const { MessageEmbed } = require("discord.js")

module.exports = {
      name: "colorify",
      cooldown: 5,
      description: 'colorify pfp',
      usage: 'colorify, colorify <user>',
      run: async (client, message, args) => {
            if (!args.length) return message.channel.send("Usage: `>colorify @user color` or `>colorify color`")
            const user = message.mentions.users.first()
            if (user && !args[1]) return message.channel.send("Usage: `>colorify @user color` or `>colorify color`")
            const avatar = user ? user.displayAvatarURL({ format: "png", size: 4096 }) : message.author.displayAvatarURL({ format: "png", size: 4096 })
            let color = user ? args[1] : args[0]

            if (color === 'yellow') {
                  color === 'f5dd2c';
            }
            else if (color === 'blue') {
                  color = '054afa';
            }
            else if (color === 'purple') {
                  color = 'd105fa';
            }
            else if (color === 'pink') {
                  color = 'fa11cf';
            }
            else if (color === 'violet') {
                  color = '8F00FF';
            }
            else if (color === 'green') {
                  color = '02d110';
            }
            else if (color === 'magenta') {
                  color = 'fc0581';
            }
            else if (color === 'brown') {
                  color = '964B00';
            }
            else if (color === 'red') {
                  color = 'ff1500';
            }
            else if (color === 'orange') {
                  color = 'ff6a00';
            }
            const img = `https://some-random-api.ml/canvas/color?avatar=${encodeURIComponent(avatar)}&color=${color}`
            const em = new MessageEmbed()
                  .setColor(color.toUpperCase())
                  .setImage(img)
            message.channel.send({ embeds: [em] })
      }
}