const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const {
  MessageEmbed
} = require('discord.js')

var superagent = require('superagent');
module.exports = {
  name: "hi1",
  category: "🔞 NSFW",
  usage: "porn",
  type: "real",
  run: async (message) => {

    
  

    superagent.get('https://nekobot.xyz/api/image').query({
      type: 'pgif'
    }).end((err, response) => {
      message.reply({
        content: `${response.body.message}`
      });
    });
  }
};