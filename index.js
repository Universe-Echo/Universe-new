const { Client, Collection, MessageEmbed } = require("discord.js");
const Schema = require('./models/onstatus')
require('dotenv').config()
const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);

//error handler 
process.on("unhandledRejection", console.error);
process.on('uncaughtException', console.error)
process.on('multipleResolves', console.error)
process.stdin.resume();//so the program will not close instantly
const user_id = '62760710764a55dc108fa4a1'
function exitHandler(options, exitCode) {
    if (options.cleanup) {
        Schema.findByIdAndUpdate(user_id, {$set:{ Status: 'off'}},{new:true}).then((docs)=>{
            if(docs) {
              console.log({success:true,data:docs});
            } else {
              console.log({success:false,data:"no such data"});
            }
          }).catch((err)=>{
             console.log(err);
    })}

    if (exitCode || exitCode === 0) {
        Schema.findByIdAndUpdate(user_id, {$set:{ Status: 'off'}},{new:true}).then((docs)=>{
            if(docs) {
              console.log({success:true,data:docs});
            } else {
              console.log({success:false,data:"no such data"});
            }
          }).catch((err)=>{
             console.log(err);
    })}
    if (options.exit) {
        
        Schema.findByIdAndUpdate(user_id, {$set:{ Status: 'off'}},{new:true}).then((docs)=>{
            if(docs) {
                
              console.log({success:true,data:docs});
              process.exit();
            } else {
              console.log({success:false,data:"no such data"});
            }
          }).catch((err)=>{
             console.log(err);
        
        
    
    })}
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}))


//logging in
client.login(process.env.TOKEN);
