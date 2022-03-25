const backup = require("discord-backup")
backup.setStorageFolder(__dirname + "/backups/")

const Discord = require("discord.js")

module.exports = {
    name: "backup-create",
    description: 'Create server backup',
    type: "TEXT",
    userPermissions: ["ADMINISTRATOR"],
    aliases: ["bc"],
    cooldown: 10,
  
    run: async(client, message, args) => {
  
  
      const ownerEmbed = new Discord.MessageEmbed()
      .setColor("DARK_RED")
      .setDescription("you are not the server owner (._.)")
      .setTitle("An error has occured!")
      
      
      const OWNERIDISME = "673846605920600068";
  
      if(message.author.id !== OWNERIDISME) return message.reply({embeds: [ownerEmbed], allowedMentions: {repliedUser: false}})
  
  
      // Nobackup Found embed
  
      const NoBackupFound = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription("This backup doesnt exist or can not be found. Please make sure the backup's ID is correct.**")
      backup.create(message.guild, {

        jsonBeautify: true,
        doNotBackup: [ "emojis", "ban", "messages" ], // what u dont want it to save and load -> i disabled emojis and ban cause it takes most of the space and makes it slower.
       maxMessagesPerChannel: 0

    }).then(async backupdata => {
        
        const SuccessEmbed = new Discord.MessageEmbed()
        .setColor("#FEE4FA")
        .setTitle("<:Info:928913634694955058> The backup is successful!")
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setDescription(`**The backup has been successfully made!**`)
        .addField("To load the backup:", `Use \`>Backup-load ${backupdata.id}\` to load the backup.`)
        .addField("To delete the backup:", `Use \`>Backup-delete ${backupdata.id}\` to delete the backup.`)
        .setTimestamp()
     //   .setFooter({ text: "Backup made by Kaori <3"})

        message.reply({embeds: [SuccessEmbed]})

    })
}  
      
    }
