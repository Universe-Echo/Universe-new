const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "returns websocket ping",
    type: 'CHAT_INPUT',

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        var states = "🟢 Excellent";
        var states2 = "🟢 Excellent";


        var api = `${Math.round(client.ws.ping)}`;


        if (Number(api) > 70) states2 = "🟢 Good";
        if (Number(api) > 170) states2 = "🟡 Not Bad";
        if (Number(api) > 350) states2 = "🔴 Soo Bad";

        let pingEmbed = new MessageEmbed()
        pingEmbed.setThumbnail(interaction.client.user.displayAvatarURL())
        pingEmbed.setColor("#2F3136");
        pingEmbed.setDescription(`**Pong🏓!**
  📱${client.user.username} Ping `);

        pingEmbed.addField("**WebSocket:**", `\`${api + " ms 📶 | " + states2}\``, true)

        pingEmbed.setTimestamp();




        interaction.followUp({ embeds: [pingEmbed] });
    },
};
