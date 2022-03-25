const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "purge",
  description: "Clear Messages",
  aliases: ["clear", "prune"],
  cooldown: 5,
  usage: "clear (type)",
  userPermissions: ["MANAGE_MESSAGES"],
  botPermissions: ["MANAGE_MESSAGES"],
  category: ["Moderation"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.find(
        (m) =>
          m.id === args.join(" ") ||
          m.user.username.toLowerCase() === args.join(" ").toLowerCase()
      );
    if (
      !message.channel
        .permissionsFor(message.channel.guild.me)
        .has("MANAGE_MESSAGES")
    ) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor("#81BABA")
            .setDescription(
              ` \`|\` Missing Channel Permissions \`MANAGE_MESSAGES\``
            ),
        ],
      });
    }
    try {
      if (!args[0] || !args.length) {
        return message.reply({
          embeds: [
            new MessageEmbed()
              .setColor("#81BABA")
              .setDescription(
                ` \`|\` **Missing Arguments**\n\n\`[-bots | -embeds | -users | -files | -mentions | -text | -match (Text) | -pins | -startwiths (Text)]\``
              )
              .setFooter("How to use: purge (amount) optional: (type)"),
          ],
        });
      }
      let amount = Number(args[0], 10) || parseInt(args[0]);
      if (isNaN(amount) || !Number.isInteger(amount)) {
        return message.reply({
          embeds: [
            new MessageEmbed()
              .setColor("#81BABA")
              .setDescription(
                ` \`|\` Only Numbers, No others Characters`
              ),
          ],
        });
      }
      if (!amount || amount < 2 || amount > 100) {
        return message.reply({
          embeds: [
            new MessageEmbed()
              .setColor("#81BABA")
              .setDescription(
                ` \`|\` Enter a number between \`2 - 100\``
              ),
          ],
        });
      }
      if (!args[1]) {
        try {
          await message.delete();
          await message.channel.bulkDelete(amount).then(async (m) => {
            let dou = new MessageEmbed()
              .setColor("#81BABA")
              .setDescription(
                `\`|\` Cleared  Messages \`${m.size}|${amount}\` of messages`
              );
            const peo = await message.channel.send({ embeds: [dou] });
            setTimeout(() => peo.delete().catch(() => {}), 5000);
          });
        } catch (e) {
          message.channel.send(`${e}`);
        }
      } else if (args[1]) {
        let tipos = [
          "-bots",
          "-embeds",
          "-users",
          "-files",
          "-mentions",
          "-text",
          "-match",
          "-mentions",
          "-pins",
          "-startwiths",
        ];
        if (!tipos.includes(args[1])) {
          return message.reply({
            embeds: [
              new MessageEmbed()
                .setColor("#81BABA")
                .setDescription(
                  ` \`|\` **Unknowm flag** \n\n\`[-bots | -embeds | -users | -files | -mentions | -text | -match (Text) | -pins | -startwiths (Text)]\``
                ),
            ],
          });
        }
      }
      let msg = null;
      let data = null;
      let embed = null;
      switch (args[1]) {
        case "-bots":
          {
            msg = await message.channel.messages.fetch({ limit: amount });
            data = [];
            msg
              .map((m) => m)
              .forEach((ms) => {
                if (ms.author.bot && !ms.pinned) data.push(ms);
              });
          }
          try {
            await message.delete();
            await message.channel
              .bulkDelete(data.length ? data : 1, true)
              .then(async (m) => {
                embed = new MessageEmbed()
                  .setColor("#81BABA")
                  .setDescription(
                    `\`|\` Cleared \`${m.size}|${amount}\` Bots messages`
                  );
                const y = await message.channel.send({ embeds: [embed] });
                setTimeout(() => y.delete().catch(() => {}), 5000);
              });
            break;
          } catch (e) {
            message.channel.send(`${e}`);
          }
        case "-users": {
          msg = await message.channel.messages.fetch({ limit: amount });
          data = [];
          msg
            .map((m) => m)
            .forEach((ms) => {
              if (!ms.author.bot && !ms.pinned) data.push(ms);
            });
          try {
            await message.channel
              .bulkDelete(data.length ? data : 1, true)
              .then(async (m) => {
                embed = new MessageEmbed()
                  .setColor("#81BABA")
                  .setDescription(
                    `\`|\` Cleared \`${m.size}|${amount}\` Users messages`
                  );
                const y = await message.channel.send({ embeds: [embed] });
                setTimeout(() => y.delete().catch(() => {}), 5000);
              });
            break;
          } catch (e) {
            message.channel.send(`${e}`
             
     );
          }
        }
        case "-embeds": {
          msg = await message.channel.messages.fetch({ limit: amount });
          data = [];
          msg
            .map((m) => m)
            .forEach((ms) => {
              if (ms.embeds.length && !ms.pinned) data.push(ms);
            });
          try {
            await message.channel
              .bulkDelete(data.length ? data : 1, true)
              .then(async (m) => {
                embed = new MessageEmbed()
                  .setColor("#81BABA")
                  .setDescription(
                    `\`|\` Cleared \`${m.size}|${amount}\` Embeds messages`
                  );
                const y = await message.channel.send({ embeds: [embed] });
                setTimeout(() => y.delete().catch(() => {}), 5000);
              });
            break;
          } catch (e) {
            message.channel.send(`${e}`);
          }
        }
        case "-files": {
          msg = await message.channel.messages.fetch({ limit: amount });
          data = [];
          msg
            .map((m) => m)
            .forEach((ms) => {
              if (ms.attachments.first() && !ms.pinned) data.push(ms);
            });
          try {
            await message.channel
              .bulkDelete(data.length ? data : 1, true)
              .then(async (m) => {
                embed = new MessageEmbed()
                  .setColor("#81BABA")
                  .setDescription(
                    `\`|\` Cleared \`${m.size}|${amount}\` files`
                  );
                const y = await message.channel.send({ embeds: [embed] });
                setTimeout(() => y.delete().catch(() => {}), 5000);
              });
            break;
          } catch (e) {
            message.channel.send(`${e}`);
          }
        }
        case "-mentions": {
          msg = await message.channel.messages.fetch({ limit: amount });
          data = [];
          msg
            .map((m) => m)
            .forEach((ms) => {
              if (
                (ms.mentions.users.first() ||
                  ms.mentions.members.first() ||
                  ms.mentions.channels.first() ||
                  ms.mentions.roles.first()) &&
                !ms.pinned
              )
                data.push(ms);
            });
          try {
            await message.channel
              .bulkDelete(data.length ? data : 1, true)
              .then(async (m) => {
                embed = new MessageEmbed()
                  .setColor("#81BABA")
                  .setDescription(
                    `\`|\` Cleared \`${m.size}|${amount}\` mention messages`
                  );
                const y = await message.channel.send({ embeds: [embed] });
                setTimeout(() => y.delete().catch(() => {}), 5000);
              });
            break;
          } catch (e) {
            message.channel.send(`${e}`);
          }
        }
        case "-match": {
          if (!args[2]) {
            return message.channel.send({
              embeds: [
                new MessageEmbed()
                  .setDescription(` \`|\` Must provide a text`)
                  .setColor("#81BABA"),
              ],
            });
          }
          msg = await message.channel.messages.fetch({ limit: amount });
          data = [];
          msg
            .map((m) => m)
            .forEach((ms) => {
              if (ms.content.includes(args.slice(2).join(" ")) && !ms.pinned)
                data.push(ms);
            });
          try {
            await message.channel
              .bulkDelete(data.length ? data : 1, true)
              .then(async (m) => {
                embed = new MessageEmbed()
                  .setColor("#81BABA")
                  .setDescription(
                    `\`|\` Cleared \`${
                      m.size
                    }|${amount}\` messages matching with \`${args
                      .slice(2)
                      .join(" ")}\``
                  );
                const y = await message.channel.send({ embeds: [embed] });
                setTimeout(() => y.delete().catch(() => {}), 5000);
              });
            break;
          } catch (e) {
            message.channel.send(`${e}`);
          }
        }
        case "-text": {
          msg = await message.channel.messages.fetch({ limit: amount });
          data = [];
          msg
            .map((m) => m)
            .forEach((ms) => {
              if (!ms.attachments.first() && !ms.embeds.length && !ms.pinned)
                data.push(ms);
            });
          try {
            await message.channel
              .bulkDelete(data.length ? data : 1, true)
              .then(async (m) => {
                embed = new MessageEmbed()
                  .setColor("#81BABA")
                  .setDescription(
                    `\`|\` Cleared \`${m.size}|${amount}\` text messages`
                  );
                const y = await message.channel.send({ embeds: [embed] });
                setTimeout(() => y.delete().catch(() => {}), 5000);
              });
            break;
          } catch (e) {
            message.channel.send(`${e}`);
          }
        }
        case "-pins": {
          msg = await message.channel.messages.fetch({ limit: amount });
          data = [];
          msg
            .map((m) => m)
            .forEach((ms) => {
              if (ms.pinned) data.push(ms);
            });
          try {
            await message.channel
              .bulkDelete(data.length ? data : 1, true)
              .then(async (m) => {
                embed = new MessageEmbed()
                  .setColor("#81BABA")
                  .setDescription(
                    `\`|\` Cleared \`${m.size}|${amount}\` Pins`
                  );
                const y = await message.channel.send({ embeds: [embed] });
                setTimeout(() => y.delete().catch(() => {}), 5000);
              });
            break;
          } catch (e) {
            message.channel.send(`${e}`);
          }
        }
        case "-startwiths": {
          if (!args[2]) {
            return message.channel.send({
              embeds: [
                new MessageEmbed()
                  .setDescription(` \`|\` Must provide a text`)
                  .setColor("#81BABA"),
              ],
            });
          }
          msg = await message.channel.messages.fetch({ limit: amount });
          data = [];
          msg
            .map((m) => m)
            .forEach((ms) => {
              if (ms.content.startsWith(args.slice(2).join(" ")) && !ms.pinned)
                data.push(ms);
            });
          try {
            await message.channel
              .bulkDelete(data.length ? data : 1, true)
              .then(async (m) => {
                embed = new MessageEmbed()
                  .setColor("#81BABA")
                  .setDescription(
                    `\`|\` Cleared \`${
                      m.size
                    }|${amount}\` Starts with \`${args.slice(2).join(" ")}\``
                  );
                const y = await message.channel.send({ embeds: [embed] });
                setTimeout(() => y.delete().catch(() => {}), 5000);
              });
            break;
          } catch (e) {
            message.channel.send(`${e}`);
          }
        }
      }
    } catch (e) {
      await message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("#81BABA")
            .setDescription(
              `\`|\` Oh no, something went wrong, try again.`
            ),
        ],
      });
      console.log(e);
    }
  },
};