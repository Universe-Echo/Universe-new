const { Client, message, MessageActionRow, MessageButton, ButtonInteraction, MessageEmbed, Message, Discord, MessageSelectMenu, Interaction } = require('discord.js');
const prefixSchema = require('../../models/prefix');
const prefix = require('../../models/prefix');
const client = require('../../index')
client.prefix = async function (message) {
    let custom;

    const data = await prefix.findOne({ Guild: message.guildId })
        .catch(err => console.log(err))

    if (data) {
        custom = data.Prefix;
    } if (!data) {
        const prefix = ">"


        custom = prefix
    }
    return custom;
}
module.exports = {
    name: "help",

    cooldown: 60,
    description: 'help! help!',
    usage: 'help',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const emojis = {
            backup: '🎒',
            configs: '⚙️',
            devonly: '🛠️',
            fun: '🎈',
            gifs: '🎞️',
            image: '🖼️',
            info: 'ℹ️',
            moderation: '🔨',
            utility: '⚡'
        }
        const commands = client.commands.filter(x => x.showHelp !== false);
        const p = await client.prefix(message)
        const directories = [...new Set(client.commands.map(cmd => cmd.directory))]

        const formatString = (str) => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

        const categories = directories.map((dir) => {
            const getCommands = client.commands.filter((cmd) => cmd.directory === dir
            ).map(cmd => {
                return {
                    name: cmd.name || 'no name',
                    description: cmd.description || 'no description',

                }
            })

            return {
                directory: formatString(dir),
                commands: getCommands,
            }
        })


        //console.log(categories)


        const embed = new MessageEmbed()
            .setDescription("Please select a category in the dropdown menu below")

        const components = (state) => [
            new MessageActionRow()
                .addComponents(new MessageSelectMenu().setCustomId("help-menu")
                    .setPlaceholder('Please select a category')
                    .setDisabled(state)
                    .addOptions(
                        categories.map((cmd) => {
                            return {
                                label: cmd.directory,
                                value: cmd.directory.toLocaleLowerCase(),
                                description: `Commands from ${cmd.directory} category`,
                                emoji: emojis[cmd.directory.toLocaleLowerCase()] || null,
                                
                            }
                        })
                    )
                )
        ]


        const initialMessage = await message.channel.send({
            embeds: [embed],
            components: components(false),

        })

        const filter = (interaction) => interaction.user.id === message.author.id

        const collector = message.channel.createMessageComponentCollector(
            {
                filter,
                componentType: 'SELECT_MENU',
                time: 120000
            })

        collector.on("collect", (interaction) => {
            const [directory] = interaction.values;
            const category = categories.find(x => x.directory.toLocaleLowerCase() === directory
            );

            const categoryEmbed = new MessageEmbed()
                .setTitle(`${directory} commands,  Total Commands - ${commands.size},  Prefix: **${p}**`)
                .setDescription('Here is the list of commands')
                .addFields(
                    category.commands.map((cmd) => {
                        return {
                            name: `\`${cmd.name}\``,
                            value: cmd.description,
                            inline: true,

                        }
                    })
                )
                .setFooter('Do  >cmd-info <command-name>  for more info on the command')

            interaction.update({ embeds: [categoryEmbed] })
        })

        collector.on('end', () => {
            initialMessage.edit({
                components: components(true)
            })
        })
    },
};

