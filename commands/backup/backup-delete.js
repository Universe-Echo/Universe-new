const Discord = require('discord.js')
const backup = require('discord-backup')
module.exports = {
name: 'backup-delete',
cooldown: 10,
description: 'delete server backup',
run: async(client, message, args) => {
    const OWNERIDISME = "673846605920600068";
    const ownerEmbed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription("you are not my owner (._.)")
    .setTitle("An error has occured!")
    if(message.author.id !== OWNERIDISME) return message.reply({embeds: [ownerEmbed], allowedMentions: {repliedUser: false}})
const backupID = args.join(' ')

const RemovedBackupEmbed = new Discord.MessageEmbed()
.setColor("#FEE4FA")
.setTitle("Successfully removed the Backup.")
.setDescription("I have successfully deleted the backup information")
const NoBackupFound = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("This backup doesnt exist or can not be found. Please make sure the backup's ID is correct.**")

if(!backupID) return message.reply({embeds: [NoBackupFound], ephemeral: true })

backup.remove(backupID).then((backupInfos) => {

    message.reply({embeds: [RemovedBackupEmbed]})

}).catch((err) => {
    // if the backup wasn't found

return message.reply({embeds: [NoBackupFound], ephemeral: true })

 })
}

}