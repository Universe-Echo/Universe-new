
const Discord = require('discord.js')
const {
  MessageEmbed
} = require('discord.js')



var superagent = require('superagent'); 
/**
* @param {Client} client
* @param {Message} message
* @param {String[]} args
*/
module.exports = {
  name: "hi1",
 devOnly: true,
  run: async (client, message, args) => {

  if(!message.author.id === '673846605920600068') return;

    superagent.get('https://nekobot.xyz/api/image').query({
      type: 'pgif'
    }).end((err, response) => {
      message.reply({
        content: `${response.body.message}`
      });
    });
  }
}