module.exports = {
    name: 'tops',
description: 'list the servers',
    run: async (client, message, args) => {
        if (message.author.id !== '673846605920600068') return message.channel.send('**This command can be only used by my owner**')
        const guild = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).first(50);

        const description = guild.map((guild, index) => `#${index + 1}  ${guild.name} | ${guild.memberCount} Members`).join('\n');
        
        message.channel.send({ content: ` \`\`\`\css\n${description} \`\`\`\ ` });

    }
}
