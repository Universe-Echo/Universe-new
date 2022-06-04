

module.exports = {
  name: 'comment',

  cooldown: 5,
  description: 'get a youtube-like comment',
  botPermissions: ['ATTACH_FILES'],
  usage: 'comment <text>',

  run: async (client, message, args) => {
    message.channel.send({
      files: [{
        name: 'youtube.png',
        attachment: [
          'https://some-random-api.ml/canvas/youtube-comment?avatar=',
          message.author.displayAvatarURL({ format: 'png', size: 1024 }),
          `&username=${message.member.displayName}`,
          `&comment=${args.join(' ')}`,

        ].join('')
      }]
    })
  }
}