const Discord = require('discord.js')

module.exports = {
  name: 'ping',
  aliases: ['latency'],
  run: async (client, message) => {
    message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setDescription(`**Pong ${client.ws.ping}ms**`)
          .setColor('#ff0000')
      ]
    })
  }
}