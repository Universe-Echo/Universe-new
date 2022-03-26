

module.exports = {
    name: 'tweet',
   
    cooldown: 5,
    guildOnly: true,
    group:'fun',
    description: 'get a fake tweet',
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
          
          `&comment=${args.join(' ')}`,
          
        ].join('')
      }]
    })
  }}