

module.exports = {
  name: 'comment',

  cooldown: 5,
  guildOnly: true,
  group: 'fun',
  description: 'get a youtube-like comment',
  botPermissions: ['ATTACH_FILES'],
  usage: 'comment <text>',
  examples: [
    'comment I never thought this would be the effect.'
  ],
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