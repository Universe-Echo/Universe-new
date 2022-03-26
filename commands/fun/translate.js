const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require('discord.js')
const translate = require("@iamtraction/google-translate");

module.exports = {
  name: "translate",
  aliases:["t"],
  category: 'translate',
  cooldown: 5,
  usage: 'translate <lang> <text>',
  description: 'translate something',
  run: async(client, message, args) =>  {
    const query = args.slice(1).join(" ")
    const syntaxErr = new MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
    .setTitle('Syntax Error!')
    .addField('Uses:', '>translate <lang> <query>')
    .addField('Examples:', '>translate english namaste')
    if (!query) return message.reply({embeds: [syntaxErr]});
    if (!args[0]) return message.reply({embeds: [syntaxErr]});
    const translated = await translate(query, {to: args[0] });
    const e = new Discord.MessageEmbed()
    .setColor("GREEN")

    .setDescription("**Content**: " + "`" + query + "`"+ "\n**Translated**: " + "`" + `${translated.text}` + "`" )
    .setTimestamp()
  message.reply({embeds: [e]});
  },
};