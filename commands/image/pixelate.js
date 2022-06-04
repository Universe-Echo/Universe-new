module.exports = {
  name: 'pixelate',
  cooldown: 5,
  aliases: ['pixel'],
  description: 'pixel effect on pfp',
  botPermissions: ['ATTACH_FILES'],
  usage: 'pixelate, pixelate <user>',
 
  run: async (client, message, args) => {

    const member = message.mentions.members.first() || message.member;

    message.channel.send({
      files: [{
        name: 'pixelate.png',
        attachment: [
          'https://some-random-api.ml/canvas/pixelate?avatar=',
          member.user.displayAvatarURL({ format: 'png', size: 1024 })


        ].join('')
      }]
    })
  }
}