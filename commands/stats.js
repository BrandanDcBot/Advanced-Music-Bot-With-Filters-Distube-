const { totalCores } = require('cpu-stat')
const Discord = require('discord.js')
const users = require('discord.js')

module.exports = {
  name: 'stats',
  aliases: ['botinfo'],
  run: async (client, message) => {
    message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setDescription(`${eval.client.users.cache.size}`)
      ]
    })
  }
}
