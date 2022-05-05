const cooldown = new Set();
const fetch = require('node-fetch')
module.exports = {
    name: 'pat',
    cooldown: 5,
    description: 'pat someone',
    usage: 'pat <user>',
    run: async (client, message, args) => {


        let url = 'https://g.tenor.com/v1/search?q=anime_pat&key=EURH7SHHRLJW&limit=8'

        let response = await fetch(url);

        let json = await response.json();
        // console.log(json);

        const index = Math.floor(Math.random() * json.results.length);

        let huggedperson = message.mentions.members.first()
        let hugperson = message.author || await message.guild.members.fetch(args[0]);
        if (!huggedperson) return message.channel.send('**Provide me a person to pat re .__.**')
        if (huggedperson === message.member)
            message.channel.send('**You wanna pat yourself fine..**');
        try {

            huggedperson.send(`**You got a nice pat from ${message.author.username} :)**`).catch(err => message.channel.send(`Can't dm ${huggedperson}`));

            message.channel.send(`**${message.author.username} pats ${huggedperson.user.username}, cute uwu**`)
            message.channel.send(json.results[index].url)


        }
        catch (e) {
            return message.channel.send(`there was an error:\n${e.message}`)
        }
    }
}
