const cooldown = new Set();

module.exports = {
    name: 'gm',
    cooldown: 5,
    description: 'gm gif',
    usage: 'gm',
    run: async (client, message, args) => {


        message.channel.send('https://tenor.com/view/cat-peek-a-boo-kitty-white-cat-cute-cat-gif-16415828')
    }



}