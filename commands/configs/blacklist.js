const { Client, Message, MessageEmbed, Collection } = require('discord.js')

const Schema = require('../../models/blacklist')
const { blacklistedwords, filter } = require('../../collections')



module.exports = {
    name: 'blacklist',
    aliases: ['bl'],
userPermissions: ['ADMINISTRATOR'],

    run: async(client, message, args) => {
       

        const query = args[0]?.toLowerCase();
        const syntax = new MessageEmbed()
        .setTitle('Wrong Syntax!')
        .setThumbnail(client.user.displayAvatarURL())

        .setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
        .setDescription('Usage:-\n>blacklist add <word>\n>blacklist remove <word>\n>blacklist list')
        .addField('Ex:-', `>blacklist add hello, >blacklist remove hello`)
        if(!query) return message.reply({embeds: [syntax]})
const guild = { Guild: message.guild.id}
        if(query === 'add') {
const word = args[1]?.toLowerCase();
if(!word) return message.channel.send('**Please provide a word to blacklist!**')

Schema.findOne(guild, async(err, data) => {
    if(data) {
        if(data.Words.includes(word)) return message.reply('**That word is already there in the database!**')
data.Words.push(word)
data.save()
blacklistedwords.get(message.guild.id).push(word)

    }
     else {
         new Schema({
             Guild: message.guild.id,
             Words: word
         }).save();

         blacklistedwords.set(message.guild.id, [ word ])
     }

     message.reply(`**${word} is now blacklisted!**`)
});
        } else if(query === 'remove') {
           
            const word = args[1]?.toLowerCase();
            if(!word) return message.channel.send('**Please provide a word to blacklist!**')
            
            Schema.findOne(guild, async(err, data) => {
                if(!data) return message.channel.send('**The guild has no saved data!**')

                if(!data.Words.includes(word)) return message.channel.send("**That word doesnt exist in the database!**")

                const filtered = data.Words.filter((target) => target !== word);

                await Schema.findOneAndUpdate(guild, {
                    Guild: message.guild.id,
                    Words: filtered,

                }).then(message.channel.send('**Word removed!**'))
            blacklistedwords.get(message.guild.id).filter((target) => target !== word)
            blacklistedwords.set(message.guild.id, filtered)
            });

            
        } else if(query === 'list') {
            Schema.findOne(guild, async(err, data) => {
                if(!data) return message.reply('**No data found!**')

                const displayEmbed = new MessageEmbed()

                .setTitle('Blacklisted words')

                .setDescription(data.Words.join(', '))

                message.channel.send({embeds: [displayEmbed]})
            })
        } else if(query === 'collection') {
            const getCollection = blacklistedwords.get(message.guild.id);
            const collectionEmbed = new MessageEmbed()
            .setTitle(`Blacklisted words in ${message.guild.name}`)
            .setDescription(`${getCollection}`)
            if(getCollection) return message.channel.send({embeds: [collectionEmbed]})
            message.channel.send('**NO data**')


        } else return message.channel.send('**That query doesnt exist!**')
        

    } 
}