const { MessageEmbed } = require("discord.js");
const { interaction, MessageEmbed } = require('discord.js')
module.exports = {
	name: "say",
	description: "Say Command",
	options: [
		{
			name: "message",
			description: "Someting to say",
			type: "STRING",
			required: true,
		},
		{
			name: "embeded",
			description: "If it should be an embed",
			type: "BOOLEAN",
			required: true,
		},
		{
			name: "ephermal",
			description: "If this is set to true you are the only one who can see it",
			type: "BOOLEAN",
			required: true,
		},
	],
	type: "CHAT_INPUT",
   /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
	run: async (client, interaction, args) => {
		const message = interaction.options.getString("message");
		const embeded = interaction.options.getBoolean("embeded");
		const ephermal = interaction.options.getBoolean("ephermal");

		if (embeded == true) {
			const embed = new MessageEmbed()
				.setDescription(`${message}`)
				.setColor("RANDOM");
			return interaction.reply({ embeds: [embed], ephemeral: ephermal });
		} else {
			interaction.reply({ content: `${message}`, ephemeral: ephermal });
		}
	},
}
