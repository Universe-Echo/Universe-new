

module.exports = {
    name: 'blurple',
    aliases:[],
    cooldown: 5,
    guildOnly: true,
    group:'fun',
    description: 'blurple effect on pfp',
    clientPermissions: [ 'ATTACH_FILES' ],
    examples: [
      'comment I never thought this would be the effect.'
    ],
    run: async (client ,message, args) => {
      
      const member = message.mentions.members.first() || message.member;
      
      message.channel.send({
      files: [{
        name: 'blurple.png',
        attachment: [
          'https://some-random-api.ml/canvas/blurple?avatar=',
          member.user.displayAvatarURL({format: 'png', size:1024})
        
          
        ].join('')
      }]
    })
  }}