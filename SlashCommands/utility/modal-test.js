const { 
    Client, CommandInteraction, MessageEmbed,
    MessageActionRow, Modal, TextInputComponent 
} = require("discord.js");

module.exports = {
    name: "modal",
    description: "open a modal",
    modal: true,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */ 
    run: async (client, interaction, args) => {
        const modal = new Modal()
			.setCustomId('myModal')
			.setTitle('My Modal')
		    .addComponents(
		        new MessageActionRow().addComponents(
		            new TextInputComponent()
			        .setCustomId('short')
			        .setLabel("Text here - Short")
			        .setStyle('SHORT')
			    ),
			    new MessageActionRow().addComponents(
			        new TextInputComponent()
			        .setCustomId('paragraph')
			        .setLabel("Text here - Paragraph")
			        .setStyle('PARAGRAPH')
			    )
                
			)
		await interaction.showModal(modal);
    },
};