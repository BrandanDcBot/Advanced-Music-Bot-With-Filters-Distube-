const { totalCores } = require('cpu-stat')
const Discord = require('discord.js')

module.exports = {
  name: 'stats',
  aliases: ['botinfo'],
  run: async (client, message) => {
    message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setDescription(`**Servers: 100
                           Users: ${client.users.cache.size}
                           Ping ${client.ws.ping}ms**`)
          .setColor('#ff0000')
      ]
    })
  }
}
