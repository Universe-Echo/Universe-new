const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: "dm",
    description: 'dm owner for suggestion or bug report',
    cooldown: 10,
    usage: 'dm <message>',
    devOnly: true,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        const id = args[0];

        if (!id) return message.reply('Pls provide a id')


        const me = args[1]
        if (!me) message.reply('Pls provide a message')

        try {
            await client.users.fetch(id);
        } catch (e) {
            return message.reply(`Couldn't look up in discord database for id \`${id}\` because user does not exist in discord database.`);
        }

        const user = await client.users.fetch(id);


        message.channel.send("Message sent!")

        user.send({ content: `${me}` }).catch({})
    },
};