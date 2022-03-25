const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "dmowner",
  aliases: ['mailowner', 'mail-owner', 'dm-owner', 'report'],
  cooldown: 10,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
 run: async (client, message, args) => {
    const owner = client.users.cache.get('673846605920600068')
    const dm = new MessageEmbed()
        .setTitle(`${message.author.tag} sent a message!`)
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .addField('Server:', `${message.guild.name}`)
        .addField('Message:', `${args.join(" ")}`)
      //  .setDescription(args.join(" "))
        .setTimestamp()
        .setColor("BLACK")

      message.channel.send("Message sent!")
      

    owner.send({embeds: [dm]}).catch({ })
  },
};