
module.exports = {
    name: 'spam',
    cooldown: 5,


run: async (client, message, args) => {

    
    if (message.author.id !== '673846605920600068') return message.channel.send('**This command can be only used by my owner**')

    
      // This code runs whenever a message is sent
    
      const args1 = args[0]
      const me = args.slice(1).join(' ')
    
      // Check if the message starts with !spam
      
        // Check if a number was provided, or anything at all
        if (!args1 || isNaN(args1)) return message.channel.send("Please tell me how many times I need to repeat the message.");
      // Check if a message to send was provided
        if (!me) return message.channel.send("Please tell me what message I have to repeat.");
    
        const amountOfMessages = args1
        let messageToSend = me
        // JS devs, don't shout at me please
      //  messageToSend.shift();
    //   messageToSend.shift();
     //   messageToSend = messageToSend.join(" ");
    
        // Loop that repeats the correct amount of times
        for (let i = 0; i < amountOfMessages; i++) {
          // Send message to channel with provided content
          message.channel.send(messageToSend);
        }
      
    
    





}

}