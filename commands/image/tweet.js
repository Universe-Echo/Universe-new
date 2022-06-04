

module.exports = {
  name: 'tweet',
  cooldown: 5,
  description: 'get a fake tweet',
  botPermissions: ['ATTACH_FILES'],
  usage: 'tweet <text>',
  
  run: async (client, message, args) => {
    message.channel.send({
      files: [{
        name: 'tweet.png',
        attachment: [
          'https://some-random-api.ml/canvas/tweet?avatar=',
          message.author.displayAvatarURL({ format: 'png', size: 1024 }),
          `&displayname=${message.member.displayName}`,

          `&comment=${args.join(' ')}`,

        ].join('')
      }]
    })
  }
}