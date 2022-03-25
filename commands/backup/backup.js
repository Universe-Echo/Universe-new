const Discord = require('discord.js')

module.exports = {
    name: 'backup',
    cooldown: 10,

   run: async(client, message, args) => {
        
        
        const ActionsEmbed = new Discord.MessageEmbed()
        .setColor("BLURPLE")
        .setTitle("I see you need help?")
        .setDescription("Heres how this system works.")
        .addField(">backup-create:", "Create's the backup")
        .addField(">backup-load:", "Load's the backup")
        .addField(">backup-info:", "Gives information on the backup")
        .addField(">backup-delete:", "Delete's the backup")

        message.reply({embeds: [ActionsEmbed]})
    }
}