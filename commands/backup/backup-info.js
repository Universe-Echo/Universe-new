const Discord = require('discord.js');
const backup = require('discord-backup');
backup.setStorageFolder(__dirname + "/backups/")

module.exports = {
    name: 'backup-info',
    
    category: 'backup',
    userPermissions: ['ADMINISTRATOR'],
    cooldown: 10,
    description: 'get server backup info',
   run: async(client, message, args) => {
    // If the member doesn't have enough permissions
   
    const backupID = args.join(' ');

    if (!backupID)
        return message.channel.send(':x: Please specify a valid backup ID!');

    backup.fetch(backupID).then((backup) => {

        const date = new Date(backup.data.createdTimestamp);
        const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
        const formattedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;

        const embed = new Discord.MessageEmbed()
            .setAuthor('Backup', backup.data.iconURL)
            .setDescription(`Server name: ${backup.data.name}\n\nSize: ${backup.size}kb\n\nCreated at: ${formattedDate}\n\n`)
            
           //.setFooter('Backup ID: +backup.id);

        return message.channel.send({embeds: [embed]});

    }).catch((err) => {

        if (err === 'No backup found')
            return message.channel.send(':x: No backup found for ID!');
        else
            return message.channel.send(err);

    });

  }
}