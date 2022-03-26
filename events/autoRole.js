const db2 = require('../models/autorole')

const client = require('../index')
client.on('guildMemberAdd', async (member) => {
  if(member.user.bot) return;
  db2.findOne({ Guild: member.guild.id}, async(e, data) => {
    if(!data) return

    const role = member.guild.roles.cache.get(data.ROLE)
    member.roles.add(role)
  //  await db2.findOne(`autorole-${member.guild.id}`)
 
})
})