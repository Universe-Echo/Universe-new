const client = require("../index");
const db = require('../reconDB')
const { Discord, Collection, MessageEmbed, Embeds } = require("discord.js");

    client.on("messageCreate", async (message) => {
        
        if (message.author.bot) return
        if (await db.get(`afk - ${message.author.id}+${message.guild.id}`)) {
            const info = await db.get(`afk - ${message.author.id}+${message.guild.id}`)
            await db.delete(`afk - ${message.author.id}+${message.guild.id}`)
            message.reply(`**Afk removed! (\`${info}\`)**`)
            //member = message.author.id
            message.member.setNickname(null).catch(() => { })
        }
        if (message.mentions.members.first()) {
            if (
                await db.get(
                    `afk - ${message.mentions.members.first().id}+${message.guild.id}`
                    )
    
    
            ) {
              info2 = await db.get(`afk - ${message.mentions.members.first().id}+${message.guild.id}`)
                message.channel.send(`**${message.mentions.members.first().user.tag} is afk, reason: \` ${info2} \` **`
             
     
                )
            }
    
                } else return;
    });
