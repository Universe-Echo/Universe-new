const backup = require('discord.js');


module.exports = {
    name: 'backup-list',

    run: async(client, message, args) => {
        const backup = require("discord-backup");
backup.list().then((backups) => {
    console.log(backups); // Expected Output [ "BC5qo", "Jdo91", ...]
    message.channel.send(`${backups}`)
});
    }
}