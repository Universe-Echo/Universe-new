module.exports = {
name: 'online',
cooldown: 5,
run: async (client, message, args) => {

const guild = message.guild
        await message.guild.members.fetch()
        guild.members.fetch().then(fetchedMembers => {
            const totalOnline = fetchedMembers.filter(member => member.presence?.status === 'online');
           
            message.reply(`There are currently **${totalOnline.size}** members online in this server 🟢`);
        });

    }
}