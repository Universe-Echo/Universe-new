const client = require("../index");
const cooldowns = new Map()
const { Discord, Collection, MessageEmbed, Embeds } = require("discord.js");
const prefixSchema = require('../models/prefix');
const prefix = require('../models/prefix');
const { botdata } = require('../utility')
const Schema = require('../models/web');
const config = require('../config.json')
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


client.on("messageCreate", async (message) => {
  const clientInfo = {
    guilds: client.guilds.cache.size,
    users: client.users.cache.size,
    channels: client.channels.cache.size,

  }


 
  const p = await client.prefix(message)

  //console.log(p)
  const prefixMention = new RegExp(`^<@!?${client.user.id}> `);

  const prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : p;
  module.exports = prefix

  if (
    message.author.bot ||
    !message.guild ||
    !message.content.toLowerCase().startsWith(prefix)
  )
    return;

  const [cmd, ...args] = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

    const user_id = '6275595f155457c1c0997771' 
    Schema.findByIdAndUpdate(user_id, {$set:{ Guilds: client.guilds.cache.size, Users: client.users.cache.size, Channels: client.channels.cache.size}},{new:true}).then((docs)=>{
      if(docs) {
        console.log({success:true,data:docs});
      } else {
        console.log({success:false,data:"no such data"});
      }
   }).catch((err)=>{
       console.log(err);
   })
  const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

  if (!command) return;

  //owner check
  if (command.devOnly == true && !config.developerIDs.includes(message.author.id)) return message.reply({
    embeds: [new MessageEmbed({

      title: "You are not the developer.",
      description: "This command can only be run by the developer",
      footer: { text: `${client.user.tag} `, iconURL: client.user.displayAvatarURL() }
    })]
  })

  //nsfw check
  if (command.nsfw == true && !message.channel.nsfw) return message.reply({
    embeds: [
      new Embeds({

        description: "This command is only for NSFW enabled channels.",
        title: "NSFW Command"
      })
    ]
  })

  //member permssions check
  if (!message.member.permissions.has(command.userPermissions || [])) return message.reply({
    embeds: [
      new MessageEmbed({

        title: "You are missing some permissions.",
        fields: [{ name: "Needed Permissions", value: `\`\`\`${command.userPermissions.join("\n")}\`\`\`` }],
        footer: { text: `${client.user.tag} `, iconURL: client.user.displayAvatarURL() }
      })
    ]
  })

  //bot permissions checking
  if (!message.guild.me.permissions.has(command.botPermissions || [])) return message.reply({
    embeds: [
      new MessageEmbed({

        title: "I am missing some permissions.",
        fields: [{ name: "Needed Permissions", value: `\`\`\`${command.botPermissions.join("\n")}\`\`\`` }],
        footer: { text: `${client.user.tag} `, iconURL: client.user.displayAvatarURL() }
      })
    ]
  })


  //cooldown
  try {
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }
    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = (command.cooldown) * 1000

    if (time_stamps.has(message.author.id)) {
      const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

      if (current_time < expiration_time) {
        const time_left = (expiration_time - current_time) / 1000;

        return message.reply(`Too fast... wait \`${time_left.toFixed(1)}\` more seconds before using \`>${command.name}\` `).then(msg => {
          setTimeout(() => msg.delete(), expiration_time - current_time)
        })
          .catch(console.error);
      }
    }

    time_stamps.set(message.author.id, current_time)
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount)
  }
  catch (error) {
    const coolerror = new MessageEmbed()
      .setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
      .setDescription(`${error}`)
    // .setFooter('Cooldown error')
    message.channel.send({ embeds: [coolerror] })
  }


  

  await command.run(client, message, args);
});
