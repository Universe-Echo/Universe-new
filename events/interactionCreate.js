const client = require("../index");
const { MessageEmbed } = require('discord.js')
client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        if (cmd.devOnly == true && !client.config.developerIDs.includes(interaction.user.id)) return interaction.reply({
            embeds: [new MessageEmbed({
              color: "RED",
              title: "You are not the developer.",
              description: "This command can only be run by the developer",
              footer: { text: `${client.user.tag} `, iconURL: client.user.displayAvatarURL() }
            })]
          })
            
          if (!interaction.memberPermissions.has(cmd.userPermissions || [])) return interaction.reply({
            embeds: [new MessageEmbed({
              color: "RED",
              title: "You are missing some permissions.",
              fields: [{ name: "Needed Permissions", value: `\`\`\`${cmd.userPermissions.join("\n")}\`\`\`` }],
              footer: { text: `${client.user.tag} `, iconURL: client.user.displayAvatarURL() },
            })]
          })
        
          if (!interaction.guild.me.permissions.has(cmd.botPermissions || [])) return interaction.reply({
            embeds: [new MessageEmbed({
              color: "RED",
              title: "I am missing some permissions.",
              fields: [{ name: "Needed Permissions", value: `\`\`\`${cmd.botPermissions.join("\n")}\`\`\`` }],
              footer: { text: `${client.user.tag} `, iconURL: client.user.displayAvatarURL() }
            })]
          })


        cmd.run(client, interaction, args);
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }

    

});
