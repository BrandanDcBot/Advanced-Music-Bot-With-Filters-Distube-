const { totalCores } = require('cpu-stat')
const Discord = require('discord.js')

module.exports = {
  name: 'stats',
  aliases: ['botinfo'],
  run: async (client, message) => {
    message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setDescription(`Users: ${client.users.cache.size} Servers: ${client.guilds.cache.size} Ping: ${client.ws.ping}`)
      ]
    })
  }
}
