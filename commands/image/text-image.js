const client = require('nekos.life');
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
    name: "textimage",
    botPermissions: ['ATTACH_FILES'],
    description: 'write something on a paper',
    cooldown: 5,

    run: async (client, message, args) => {

        const arg = args.slice(0)
        if (!arg) return message.reply('**Please provide a text!**')
        superagent.get('https://nekobot.xyz/api/imagegen').query({
            type: 'kannagen',
            text: `${arg}`
        }).end((err, response) => {
            message.reply({
                content: `${response.body.message}`
            });
        });
    }
}