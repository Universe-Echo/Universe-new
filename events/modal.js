const client = require('../index');

client.on('interactionCreate', interaction => {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});
	if (!interaction.isModalSubmit()) return;
    interaction.deferReply({ ephemeral: true });
	const short = interaction.fields.getTextInputValue('short');
	const paragraph = interaction.fields.getTextInputValue('paragraph');
	console.log({ short, paragraph });
});