const client = require("../index");
const chalk = require('chalk')
client.on("ready", () =>
    //console.log(`${client.user.tag} is up and ready to go!`)
   
    client.user.setActivity("Under maintenance", {
      type: "STREAMING",
      url: "https://www.youtube.com/watch?v=qj9aJL_lXN8"
    })
);
