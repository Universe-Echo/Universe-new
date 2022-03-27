const { Client, CommandInteraction, SelectMenuInteraction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const purge = require('discord-purger')
const purger = new purge({
    handle: true,
    rejectEmoji: "❎", // emoji to show on error.
    acceptEmoji: "✅", // Emoji to show on success.
});

module.exports = {
    name: "purge",
    description: 'Purge messages',
userPermissions: ['MANAGE_MESSAGES'],
    options: [
        {
            name: "messages",
            description: "Purge messages in this channel.",
            type: `SUB_COMMAND`,
            options: [
                {
                    name: "number",
                    type: `INTEGER`,
                    description: "Number of messages to purge",
                    required: true
                }
            ]
        },
        {
            name: "bot-messages",
            description: "Purge all messages sent by bots in this channel",
            type: `SUB_COMMAND`
        },
        {
            name: "links",
            description: "Purge messages which contain links",
            type: `SUB_COMMAND`,
            options: [
                {
                    name: "number",
                    type: `INTEGER`,
                    description: "Number of messages to purge",
                    required: true
                }
            ]
        },
        {
            name: "emojis",
            description: "Purge messages which contain emojis",
            type: `SUB_COMMAND`,
            options: [
                {
                    name: "number",
                    type: `INTEGER`,
                    description: "Number of messages to purge",
                    required: true
                }
            ]
        },
        {
            name: "attachments",
            description: "Purge messages which contain attachments",
            type: `SUB_COMMAND`,
            options: [
                {
                    name: "number",
                    type: `INTEGER`,
                    description: "Number of messages to purge",
                    required: true
                }
            ]
        },
        {
            name: "user",
            description: "Purge messages of a specific user",
            type: `SUB_COMMAND`,
            options: [
                {
                    name: "number",
                    type: `INTEGER`,
                    description: "Number of messages to purge",
                    required: true
                },
                {
                    name: "user",
                    type: `USER`,
                    description: "The user whose messages you want to purge",
                    required: true
                }
            ]
        },
        {
            name: "match",
            description: "Purge messages which match specified content in the channel",
            type: `SUB_COMMAND`,
            options: [
                {
                    name: "number",
                    type: `INTEGER`,
                    description: "Number of messages to purge",
                    required: true
                },
                {
                    name: "text",
                    type: `STRING`,
                    description: "The message content to match with.",
                    required: true
                }
            ]
        },
        {
            name: "includes",
            description: "Purge messages which includes specified content in this channel",
            type: `SUB_COMMAND`,
            options: [
                {
                    name: "number",
                    type: `INTEGER`,
                    description: "Number of messages to purge",
                    required: true
                },
                {
                    name: "text",
                    type: `STRING`,
                    description: "The text to search",
                    required: true
                }
            ]
        },
        {
            name: "starts-with",
            description: "Purge all messages which starts with specified text in this channel",
            type: `SUB_COMMAND`,
            options: [
                {
                    name: "number",
                    type: `INTEGER`,
                    description: "Number of messages to purge",
                    required: true
                },
                {
                    name: "text",
                    type: `STRING`,
                    description: "The text with which the messages start with.",
                    required: true
                }
            ]
        },
        {
            name: "ends-with",
            description: "Purge all messages which ends with something",
            type: `SUB_COMMAND`,
            options: [
                {
                    name: "number",
                    type: `INTEGER`,
                    description: "Number of messages to purge",
                    required: true
                },
                {
                    name: "text",
                    type: `STRING`,
                    description: "The text with which the messages end with",
                    required: true
                }
            ]
        },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        //await interaction.deferReply().catch(() => {});
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.reply({ content: `You don't have the permissions to purge, die.` });
        
        const messages = interaction.options.getInteger("number"),
            user = interaction.options.getUser("user"),
            string = interaction.options.getString("text");
            if (messages <= 1 || !(messages <= 100)) return interaction.reply({content: `You cannot purge less than 2 messages, or more than 100 messages at once.`})
        const s = interaction.options.getSubcommand();

        let sus;
        if (s === 'messages') sus = 'messages';
        else if (s === 'links') sus = 'link-messages';
        else if (s === 'bot-messages') sus = 'bot-messages';
        else if (s === 'emojis') sus = 'emoji-messages';
        else if (s === 'attachments') sus = 'attachment-messages';
        else if (s === 'user') sus = 'user-messages';
        else if (s === 'match') sus = 'messages-equal';
        else if (s === 'includes') sus = 'messages-includes';
        else if (s === 'starts-with') sus = 'messages-starts';
        else if (s === 'ends-with') sus = 'messages-ends';
        const num = messages - 1

        await interaction.reply({ content: "Purging!", ephemeral: true });
        
        purger.purge(sus, interaction, interaction.channel, num, user || string);
    },
};

