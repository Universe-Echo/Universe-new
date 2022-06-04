const { MessageActionRow, MessageButton, MessageEmbed, Client, Message } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: "instagram",
    description: "Search instagram",
    aliases: ['insta'],
    cooldown: 5,
    /**
  * @param {Client} client
  * @param {Message} message
  * @param {String[]} args
  */

    run: async (client, message, args) => {
        const username = args.slice(0)

        try {
            const headers = { 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36' };
            const result = await axios.get(`https://instagram.com/${username}/feed/?__a=1`, { headers }).then(res => res.data);

            const account = result.graphql.user;

            const button = new MessageActionRow()
                .addComponents(new MessageButton()
                    .setStyle("LINK")
                    .setLabel('Link to account')
                    .setURL(`https://instagram.com/${account.username}`));

            const embed = new MessageEmbed()
                .setColor("36393E")
                .setAuthor({ name: 'Instagram', iconURL: 'https://i.imgur.com/wgMjJvq.png', url: 'https://instagram.com/' })
                .setTitle(account.full_name)
                .setThumbnail(account.profile_pic_url_hd)
                .setDescription(`${account.biography.length === 0 ? 'No Bio' : account.biography}`)
                .addField('__Details__', [
                    `***Username:*** @${account.username}${account.is_verified ? '✅' : ''}${account.is_private ? '🔒' : ''}`,
                    `***Posts:*** ${account.edge_owner_to_timeline_media.count.toLocaleString()}`,
                    `***Followers:*** ${account.edge_followed_by.count.toLocaleString()}`,
                    `***Following:*** ${account.edge_follow.count.toLocaleString()}`
                ].join('\n'))
            return message.reply({ embeds: [embed], components: [button] });
        } catch (error) {
            console.log(error)
        }
    }
}