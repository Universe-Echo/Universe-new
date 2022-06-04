

module.exports = {
  name: 'grey',

  cooldown: 5,
 
  description: 'grey effect on pfp',
  botPermissions: ['ATTACH_FILES'],
  usage: 'grey, grey <user>',
 
  run: async (client, message, args) => {

    const member = message.mentions.members.first() || message.member;

    message.channel.send({
      files: [{
        name: 'grey.png',
        attachment: [
          'https://some-random-api.ml/canvas/greyscale?avatar=',
          member.user.displayAvatarURL({ format: 'png', size: 1024 })


        ].join('')
      }]
    })
  }
}