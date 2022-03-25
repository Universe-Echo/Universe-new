

module.exports = {
    name: 'tweet',
    aliases:[],
    cooldown: 5,
    guildOnly: true,
    group:'fun',
    description: 'Comment something and return a youtube-like comment',
    clientPermissions: [ 'ATTACH_FILES' ],
    examples: [
      'comment I never thought this would be the effect.'
    ],
    run: async (client ,message, args) => { 
      message.channel.send({
      files: [{
        name: 'tweet.png',
        attachment: [
          'https://some-random-api.ml/canvas/tweet?avatar=',
          message.author.displayAvatarURL({format: 'png', size:1024}),
          `&displayname=${message.member.displayName}`,
          `&username=${message.member.username}`,
          `&comment=${args.join(' ')}`,
          
        ].join('')
      }]
    })
  }}