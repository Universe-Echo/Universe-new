

module.exports = {
    name: 'pixelate',
    aliases:[],
    cooldown: 5,
    guildOnly: true,
    group:'fun',
    description: 'pixel effect on pfp',
    clientPermissions: [ 'ATTACH_FILES' ],
    examples: [
      'comment I never thought this would be the effect.'
    ],
    run: async (client ,message, args) => {
      
      const member = message.mentions.members.first() || message.member;
      
      message.channel.send({
      files: [{
        name: 'pixelate.png',
        attachment: [
          'https://some-random-api.ml/canvas/pixelate?avatar=',
          member.user.displayAvatarURL({format: 'png', size:1024})
        
          
        ].join('')
      }]
    })
  }}