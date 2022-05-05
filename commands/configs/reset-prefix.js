const prefixSchema = require('../../models/prefix')
const { Message } = require('discord.js')
module.exports = {
    name: 'reset-prefix',
    description: 'Reset custom prefix',
    userPermissions: ['ADMINISTRATOR'],
    usage: 'reset-prefix',
    /**
     * @param {Message} message
     */
    run: async (client, message, args) => {
        //  const ar = await args.join(" ")
        //if(!ar) return message.reply('Please specify a prefix to change to.') 
        prefixSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                prefixSchema.findOneAndDelete({ Guild: message.guild.id })
                data.delete()
                message.reply(`Your prefix has been reset to \`>\``)
            } else {

                message.reply(`There was an error!`)
            }
        })
    }
}

