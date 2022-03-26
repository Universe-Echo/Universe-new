module.exports = {
    name: 'aa',
    cooldown: 10,
    description: 'aa gif',
    usage: 'aa',
    run: async(client, message, args) => {
        message.channel.send('https://tenor.com/view/aaaaaaaaaaaa-gif-21328997')
        message.delete()
    }
}


