

module.exports = {
  name: 'blurple',

  cooldown: 5,
  description: 'blurple effect on pfp',
  botPermissions: ['ATTACH_FILES'],
  usage: 'blurple, blurple <user>',
 
  run: async (client, message, args) => {

    const member = message.mentions.members.first() || message.member;

    message.channel.send({
      files: [{
        name: 'blurple.png',
        attachment: [
          'https://some-random-api.ml/canvas/blurple?avatar=',
          member.user.displayAvatarURL({ format: 'png', size: 1024 })


        ].join('')
      }]
    })
  }
}