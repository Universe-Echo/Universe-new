const newSchema = require('../models/blacklist');

const { blacklistedwords } = require('../collections/index')
const client = require('../index')

    client.on("messageCreate", (message) => {
        if(message.author.id === '673846605920600068') return
if(!message.guild || message.author.id === client.user.id) return;

const spllitedMsgs = message.content.split(' ');

let deleting = false;

 Promise.all(
    spllitedMsgs.map((content) => {
        if(blacklistedwords.get(message.guild.id)?.includes(content.toLowerCase()
        )
        
    ) 
        
        deleting = true;
    })
)
if(deleting) return message.delete() && message.channel.send(`** ${message.author} Dont use blacklisted words!**`)




})