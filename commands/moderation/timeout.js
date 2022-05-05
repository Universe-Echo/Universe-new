const { Message, Client, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
const ms = require('ms')
module.exports = {
  name: "mute",
  aliases: ['to', 'timeout'],
  cooldown: 5,
  description: "Timeout (mute) a member",
  userPermissions: ['MANAGE_MESSAGES'],
  botPermissions: ['MANAGE_MESSAGES'],
  usage: 'mute <user> <duration> <reason>',
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {


    try {


      const syntaxErr = new MessageEmbed()
        .setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        .setTitle('Syntax Error!')
        .addField('Uses:', '>mute <user> <reason>\n>ban <user-id> <reason>')
        .addField('Example:', '>mute @EcHO idk')
      const aut = message.author;
      const user = message.mentions.members.first() || message.guild.members.fetch(args[0])
      if (!user) return message.channel.send({ embeds: [syntaxErr] })
      const time = args[1]
      if (!time) return message.channel.send({ embeds: [syntaxErr] })
      const reason = args.slice(2).join(" ") || "No reason provided"
      const member = message.guild.members.cache.get(user.id)
      const timeInMs = ms(time);
      if (!timeInMs) return message.channel.send({ content: `**Provide a valid time**` })
      const id = message.guild.members.cache.get(user.id)
      if (message.author.id == id)
        return message.reply({
          content: "You can't timeout yourself!",
        });
      if (message.guild.me.id == id)
        return message.reply({
          content: "I can't timeout myself!",
        });
      if (message.guild.ownerId == id)
        return message.reply({
          content: "The guild owner can't be timedout!",
        });
      if (
        message.author.id != message.guild.ownerId &&
        user.permissions.has("ADMINISTRATOR")
      )
        return message.reply({
          content: "You can't timeout an Administrator!",
        });

      if (
        message.author.id != message.guild.ownerId &&
        message.member.roles.highest.position <
        user.roles.highest.position
      )
        return message.reply({
          content:
            "You can't timeout someone that has a higher role than yours!",
        });
      if (
        message.author.id != message.guild.ownerId &&
        message.member.roles.highest.position ==
        user.roles.highest.position
      )
        return message.reply({
          content:
            "You can't timeout someone that has your same higher role!",
        });
      if (
        message.guild.me.roles.highest.position <
        user.roles.highest.position
      )
        return message.reply({
          content:
            "I can't timeout someone that has a higher role than mine!",
        });
      if (
        message.guild.me.roles.highest.position ==
        user.roles.highest.position
      )
        return message.reply({
          content: "I can't timeout someone that has mine same higher role!",
        });

      await member.timeout(timeInMs, reason)

      const embed = new MessageEmbed()
        .setAuthor(`${client.user.username}`, client.user.displayAvatarURL())
        .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`Successfully timed out ${user.user.tag}`)
        .setDescription(`Timed out ${user} for ${time}`)
        .addField("Moderator :", `${aut}`)
        .addField("Reason :", `${reason}`)
      message.channel.send({ embeds: [embed] })
    } catch (e) {
      message.channel.send({ content: `${e}` })
      return console.log(e)
    }
  }
}