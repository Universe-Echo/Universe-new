const { Client, message, MessageActionRow, MessageButton, ButtonInteraction, MessageEmbed, Message } = require('discord.js')


module.exports = {
  name: "invite",
  description: 'invite bot in your server!',
  usage: 'invite',
  cooldown: 10,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
 run: async (client, message, args) => {
    const row = new MessageActionRow().addComponents(
        button1 = new MessageButton()
        //.setCustomId('yes')
        .setLabel('NORMAL')
        .setStyle('LINK')
        .setURL('https://discord.com/api/oauth2/authorize?client_id=934034791702081546&permissions=1103206148215&scope=bot%20applications.commands'),
        
        button2 = new MessageButton()
        //.setCustomId('no')
        .setLabel('ADMINISTRATOR')
        .setStyle('LINK')
        .setURL('https://discord.com/api/oauth2/authorize?client_id=934034791702081546&permissions=8&scope=bot%20applications.commands'),
        
        button3 = new MessageButton()
        //.setCustomId('no')
        .setLabel('Support Server')
        .setStyle('LINK')
        .setURL('https://discord.gg/ygMYsUGasv')
        );

const Message = await message.channel.send({content: '**Click the buttons below to invite me!**', components: [row]})
  },
};