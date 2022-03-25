

module.exports = {
    name: 'grey',
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
      
      const member = message.mentions.members.first() || message.member;
      
      message.channel.send({
      files: [{
        name: 'grey.png',
        attachment: [
          'https://some-random-api.ml/canvas/greyscale?avatar=',
          member.user.displayAvatarURL({format: 'png', size:1024})
        
          
        ].join('')
      }]
    })
  }}