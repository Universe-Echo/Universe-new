const { CommandInteraction, Client } = require('discord.js');
const moment = require('moment');
const tz = require('moment-timezone');
const Schema = require('../../models/time-channel')
module.exports = {
  name: 'set-time',
  description: 'Initialize the time channel',
  aliases: ['time-channel', 'channel-time'],
  cooldown: 10,
  userPermissions: ['ADMINISTRATOR'],
  botPermissions: ['MANAGE_CHANNELS'],
  /**
   * 
   * @param {Client} client 
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    
  }
}