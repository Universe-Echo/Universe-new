const Discord = require('discord.js');
const superagent = require('superagent')

module.exports = {
    name: 'ppussy',
    aliases: ['ppussy'],
    category: 'Nsfw 🔞',
    utilisation: '{prefix}ppussy',


  run: async (client, message, args) => { 
    if (message.author.id !== '673846605920600068') return message.channel.send('**This command can be only used by my owner**')

  if (message.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
    .query({ type: 'pussy'})
    .end((err, response) => {
      message.channel.send(response.body.message);
    });
  } else {
    message.channel.send(":x: channel is not nsfw") 
  }
}
}