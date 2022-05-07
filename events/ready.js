const client = require("../index");
const chalk = require('chalk')
const path = require('path')
const { getCommand } = require('../utility')
const Schema = require('../models/onstatus')

client.on("ready", () => {
  //console.log(`${client.user.tag} is up and ready to go!`)


  //client activity
  client.user.setActivity("Under maintenance", {
    type: "STREAMING",
    url: "https://www.youtube.com/watch?v=qj9aJL_lXN8"
  })


 

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
  const user_id = '62760710764a55dc108fa4a1' 
  Schema.findByIdAndUpdate(user_id, {$set:{ Status: 'on'}},{new:true}).then((docs)=>{
    if(docs) {
      console.log({success:true,data:docs});
    } else {
      console.log({success:false,data:"no such data"});
    }
 }).catch((err)=>{
     console.log(err);
 })
})
