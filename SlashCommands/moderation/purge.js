const { Client, Interaction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "purge",
    description: 'Deletes X ammount of messages',
    userPermissions: ["MANAGE_MESSAGES"],
    botPermissions: ["MANAGE_MESSAGES"],
    cooldown: 10,
    type: "CHAT_INPUT",
    options: [
        {
            name: 'amount',
            description: 'Amount of messages you want to delete.',
            type: 'NUMBER',
            required: true,
            maxValue: 100,
            minValue: 1,
        },
    ],
    /**
     * @param {Client} client
     * @param {Interaction} interaction
     * @param {String[]} args
     */
     run: async (client, interaction, args) => {
         try{
            await interaction.deleteReply()
            const amount = interaction.options.getNumber('amount')
            const fetch = await interaction.channel.messages.fetch({ limit: amount });
            const deletedMessages = await interaction.channel.bulkDelete(fetch, true);

            const results = {};
            for (const [, deleted] of deletedMessages) {
                const user = `${deleted.author.username}#${deleted.author.discriminator}`;
                if (!results[user]) results[user] = 0;
                results[user]++;
            }

            const userMessageMap = Object.entries(results);

            const finalResult = `${deletedMessages.size} message${deletedMessages.size > 1 ? 's' : ''} were deleted`;
            const deleteCount = `${userMessageMap.map(([user, messages]) => `**${user}**: ${messages}`).join('\n')}`

            const embed = new MessageEmbed()
            .setColor('DARKER_GREY')
            .setTitle(finalResult)
            .setDescription(deleteCount)
            .setFooter({ text: 'this embed will be deleted in 5s' })

            await interaction.followUp({ embeds: [embed] }).then(async (msg) => setTimeout(() => msg.delete(), 5000))
        } catch (err) {
            if (String(err).includes('Unknown Message')) return console.log('[ERROR!] Unknown Message');
        }
    }
}