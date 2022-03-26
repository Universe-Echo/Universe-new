const { Client, Message, MessageEmbed } = require("discord.js");
const prefixSchema = require('../../models/prefix');
const prefix = require('../../models/prefix');
const client = require('../../index')
client.prefix = async function(message) {
    let custom;
  
    const data = await prefix.findOne({ Guild : message.guildId })
        .catch(err => console.log(err))
    
    if(data) {
        custom = data.Prefix;
    } if(!data) {
        const prefix = ">"
            
        
        custom = prefix
    }
    return custom;
  }
module.exports = {
  name: "prefix",
  aliases: [''],
  cooldown: 10,
  description: 'Check the custom prefix in the server',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    
    const p = await client.prefix(message)
const prefixEmbed = new MessageEmbed()
.setTitle('Prefix!')
.setThumbnail(client.user.displayAvatarURL())
.addField('**The prefix is set to:**', `\`${p}\``)
.setFooter(`${p}set-prefix <prefix>  ||  ${p}reset-prefix `)

message.reply({embeds: [prefixEmbed]})
    },
};