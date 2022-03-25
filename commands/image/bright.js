

module.exports = {
    name: 'brightness',
    aliases:['bright'],
    cooldown: 5,
    guildOnly: true,
    group:'fun',
    description: 'Comment something and return a youtube-like comment',
    clientPermissions: [ 'ATTACH_FILES' ],
    examples: [
      'comment I never thought this would be the effect.'
    ],
    run: async (client, message, args) => {
      
      const member = message.mentions.members.first() || message.member;
      
      message.channel.send({
      files: [{
        name: 'simp.png',
        attachment: [
          'https://some-random-api.ml/canvas/brightness?avatar=',
         member.user.displayAvatarURL({format: 'png', size:1024})
        
          
        ].join('')
      }]
    })
  }}