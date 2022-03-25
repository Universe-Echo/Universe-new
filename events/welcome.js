const Schema = require('../models/welcomeChannel')
const client = require('../index')
const canvas = require('discord-canvas')
const { MessageAttachment } = require('discord.js')

client.on("guildMemberAdd", (member) =>{
    // console.log(member)
    Schema.findOne({ Guild: member.guild.id}, async(e, data) => {
        if(!data) return

        const user = member.user;
        const image = await new canvas.Welcome()
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setMemberCount(member.guild.memberCount)
        .setGuildName(member.guild.name)
        .setAvatar(user.displayAvatarURL({format: "png"}))
        .setColor("border", "#ffffcc")
        .setColor("username-box", "#ffffcc")
        .setColor("discriminator-box", "#ffffcc")
        .setColor("message-box", "#ffffcc")
        .setColor("title", "#ffffcc")
        .setColor("avatar", "#ffffcc")
        .setBackground("https://cdn.discordapp.com/attachments/934894088245874738/941762209846022214/sed_cat.png")
        .toAttachment();
      
        const attachment = new MessageAttachment(image.toBuffer(), "goodbye-image.png");

        const channel = member.guild.channels.cache.get(data.Channel)
         

        channel.send({files: [attachment]})
    })
})
