const { MessageEmbed } = require('discord.js')
const ee = require("../../config/embed.json")
module.exports = {

    name: 'cmd-help',
    aliases: ["commandhelp", "command-help", "cmdhelp", "commandinfo", "command-info", "cmd-info"],
    description: "gives information on a command",
    userPermissions: "SEND_MESSAGES",
    botPermissions: "SEND_MESSAGES",
    cooldown: 5,
    usage: 'cmd-help <command-name>',
    run: async (client, message, args) => {
        const p = '>'



        const cmd = client.commands.find(cmd => cmd.name == args[0].toLowerCase()) || client.commands.find(a => a.aliases && a.aliases.includes(args[0].toLowerCase()))
        if (!cmd) return message.reply(`There is no such command!`)

        let cmdInfoEmbed = new MessageEmbed()

            .setAuthor({ name: `${cmd.name} Help Menu`, iconURL: `${client.user.displayAvatarURL()}` })

            .addField("Description:", `\`\`\`\ ${cmd.description || "None"} \`\`\`\ `, true)
            .addField("Cooldown:", `\`\`\`\js\n ${cmd.cooldown || "None"} \`\`\`\ `, true)
            .addField("Aliases:", ` \`\`\`\ ${cmd.aliases || "None"} \`\`\`\ `, true)
            .addField("Usage", `\`\`\`\ ${p}${cmd.usage || "None"} \`\`\`\ `)
            .addField("Permissions:", `**__User:__**\n\`${cmd.userPermissions || "None"}\`\n  **__bot__**\n\`${cmd.botPermissions || "None"}\``)
            .setFooter({
                text: `${ee.footertext}`,
                iconURL: `${ee.footericon}`
              })
        message.channel.send({ embeds: [cmdInfoEmbed] })

    }
}