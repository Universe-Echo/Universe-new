const client = require("../index");
const chalk = require('chalk')
const path = require('path')
const { getCommand } = require('../utility')
const Schema = require('../models/onstatus')

client.on("ready", () => {
  //console.log(`${client.user.tag} is up and ready to go!`)
  client.users.fetch('673846605920600068', false).then((user) => {
    user.send('I am on my dear....');
   });

  // //client activity
  const servers = client.guilds.cache.size;
  const users = client.users.cache.size;
  let totalSeconds = (client.uptime / 1000);
  let days = Math.floor(totalSeconds / 86400);
  totalSeconds %= 86400;
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds % 60);
  
  const arrayOfStatus = [`${servers} servers | >help`, `${users} users | >help`, `By EcHO | >help`]

  setInterval(() => {
    client.user.setPresence({ activities: [{ name: arrayOfStatus[Math.floor(Math.random() * arrayOfStatus.length)] }], type: "WATCHING" }) //WATCHING, PLAYING, COMPETEING, LISTENING
  }, 5000)// amount of time before it swaps to the next status
})



// client.user.setActivity("Under maintenance", {
//   type: "STREAMING",
//   url: "https://www.youtube.com/watch?v=qj9aJL_lXN8"
// })




// express setup
const express = require('express')

const app = express();

const port = 5000 || 5001

app.set('view engine', "ejs")

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "..", "web", "index.html"))
})

app.get('/docs', (req, res) => {
  const commands = getCommand();
  const botdata = botdata();


  res.status(200).render('commands', { commands })
})

app.get('/info', (req, res) => {
  res.status(200).send(clientInfo)
})


app.listen(port)



  //mongodb status upload


