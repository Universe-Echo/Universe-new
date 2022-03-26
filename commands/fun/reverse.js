module.exports = {
    name: 'reverse',
    
    cooldown: 5,
    group: 'fun',
    description: 'Reverse the text',
    examples: [
      'reverse This text will be reversed.'
    ],
    usage: 'reverse <text>',
   run: (client, message, args) => {
    message.channel.send(args.join(' ').split('').reverse().join(' ') || 'No text to reverse.')
  }
}