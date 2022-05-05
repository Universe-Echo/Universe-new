const toHex = require("colornames");
const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "create-role",
    description: "Creates a role",
    userPermissions: ["MANAGE_ROLES"],
    options: [
        {
            name: "role-color",
            description: "Color of the role",
            required: true,
            type: "STRING"
        },
        {
            name: "role-name",
            description: "Name of the role",
            required: true,
            type: "STRING",
        },
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        const color = interaction.options.getString("role-color");
        const name = interaction.options.getString("role-name");
        const regex = !/[^a-zA-Z0-9]+/g.test(name);
        if (regex === false) {
            return interaction.followUp({
                content: "`The characters of your role is invalid. Only letters and numbers are allowed.`"
            });
        }
        if (name.length > 100) {
            return interaction.followUp({
                content: "`Role names aern't suppose to exceed 100 characters`"
            });
        }
        interaction.guild.roles.create({
            name: name,
            color: toHex(color),
            reason: `Role created by ${interaction.user}`,
        });
        const embed = new MessageEmbed()
            .setTitle("New Role Created!")
            .setDescription(`
        \`Role Name:\` ${name}
        \`Role Color:\` ${color}
        \`Role Creator:\` ${interaction.user}`)
            .setColor("BLURPLE")
            .setFooter({ text: "Universe" })
            .setTimestamp()
        interaction.followUp({
            embeds: [embed]
        });
    },
};