const { readdirSync } = require('fs')


function getCommand() {
    let categories = [];
    

    readdirSync('./commands/').forEach((dir) => {
        const directory = readdirSync(`./commands/${dir}`).filter((file) => file.endsWith('.js'))
        const value = [];


        const commands = directory.map((command) => {
            const file = require(`../commands/${dir}/${command}`)
           
            value.push({
                name: file.name ? file.name : '-',
                description: file.description ? file.description : '-',
                aliases: file.aliases ? file.aliases : '-',
                usage: file.usage ? file.usage : '-',

            })
        })


        let data = new Object();


        data = {
            name: dir.toLocaleUpperCase(),
            value
        }

        categories.push(data);



    })

    return categories;
}

module.exports = { getCommand }