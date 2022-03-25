const { MessageEmbed } = require('discord.js')

module.exports = {

    name: 'cmd-help',
    aliases: ["commandhelp", "command-help", "cmdhelp", "commandinfo", "command-info", "cmd-info"], 
    description: "gives information on a command",
    userPermissions: "SEND_MESSAGES",
    botPermissions: "SEND_MESSAGES",
    cooldown: 5,

    run: async(client, message, args) => {
const p = '>'

        const fs = require('fs')
        const directories = []
        fs.readdirSync('../commands').forEach(dir => { // if u know JS or just basic knowledge at the very least you know how to fix simple path fix
          directories.push(dir)
      })
      directories.forEach(dir => {
        fs.readdirSync(`../commands/${dir}`)
        .filter(file => file.endsWith('.js'))
        /**
         * @type {Command[]}
         */
                    })
      
                    const cmd = client.commands.find(cmd => cmd.name == args[0].toLowerCase()) || client.commands.find(a => a.aliases && a.aliases.includes(args[0].toLowerCase()))
                    if(!cmd) return message.reply(`There is no such command!`)
      
                    let cmdInfoEmbed = new MessageEmbed()
                    
                    .setAuthor({ name: `${cmd.name} Help Menu`, iconURL: `${client.user.displayAvatarURL()}`})
                    
                    .addField("Description:", `\`\`\`\ ${cmd.description  || "None"} \`\`\`\ `, true)
                    .addField("Cooldown:", `\`\`\`\js\n ${cmd.cooldown || "None"} \`\`\`\ `, true)
                    .addField("Aliases:", ` \`\`\`\ ${cmd.aliases || "None"} \`\`\`\ `, true)
                    .addField("Usage", `\`\`\`\ ${p}${cmd.usage || "None"} \`\`\`\ `)
                    .addField("Permissions:", `**__User:__**\n\`${cmd.userPermissions || "None"}\`\n  **__bot__**\n\`${cmd.botPermissions || "None"}\``)
                    message.channel.send({embeds: [cmdInfoEmbed]})
                  
    }
}