const backup = require("discord-backup")
const Discord = require("discord.js")
 module.exports = {
 name: 'backup-load',
 userPermissions: ['ADMINISTRATOR'],
 botPermissions: ['ADMINISTRATOR'],
 cooldown: 60,
 run: async(client, message, args) => {
    const OWNERIDISME = "673846605920600068";
    const ownerEmbed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription("you are not my owner (._.)")
    .setTitle("An error has occured!")
    if(message.author.id !== OWNERIDISME) return message.reply({embeds: [ownerEmbed], allowedMentions: {repliedUser: false}})
    const backupID = args.join(' ')
    const NoBackupFound = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("This backup doesnt exist or can not be found. Please make sure the backup's ID is correct.**")
        if(!backupID) return message.reply({embeds: [NoBackupFound], ephemeral: true })

        backup.fetch(backupID).then(async () => {

            backup.load(backupID, message.guild).then(() => {

                clearGuildBeforeRestore: true

            })

        }).catch(err => {

            message.reply({embeds: [NoBackupFound], allowedMentions: {repliedUser: false}})

        })

    }

}