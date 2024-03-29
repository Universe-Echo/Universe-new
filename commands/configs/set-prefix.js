const prefixSchema = require('../../models/prefix')
const { Message } = require('discord.js')
module.exports = {
    name: 'set-prefix',
    description: 'set custom prefix',
    aliases: ['prefix-set'],
    userPermissions: ['ADMINISTRATOR'],
    usage: 'set-prefix <prefix>',
    /**
     * @param {Message} message
     */
    run: async (client, message, args) => {
        const ar = await args.join(" ")
        
        if (!ar) return message.reply('Please specify a prefix to change to.')
        if (
            ar.match(/^(?:<@!?)?(\d{16,22})>/gi) ||
            ar.match(/^(?:<#?)?(\d{16,22})>$/gi) ||
            ar.match(/^(?:<:(?![\n])[()#$@-\w]+:?)?(\d{16,22})>$/gi)
          ) {
            return message.reply({content: `if u break me i will kill you`});
          }
        prefixSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (err) throw err;
            if (data) {
                prefixSchema.findOneAndDelete({ Guild: message.guild.id })
                data.delete()
                data = new prefixSchema({
                    Guild: message.guild.id,
                    Prefix: ar
                })
                data.save()
                message.reply(`Your prefix has been updated to **${ar}**`)
            } else {
                data = new prefixSchema({
                    Guild: message.guild.id,
                    Prefix: ar
                })
                data.save()
                message.reply(`Custom prefix in this server is now set to **${ar}**`)
            }
        })
    }
}