const Discord = require('discord.js')

module.exports = {
    name: 'queue',
    aliases: ['q'],
    run: async (client, message) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
          .setColor("#ff0000")
          .setDescription(`${client.emotes.error} | Nothing Playing Right Now!`)
        ]
      })
      const q = queue.songs
        .map((song, i) => `${i === 0 ? ' Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
        .join('\n')
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
          .setColor("#ff0000")
          .setDescription(`${client.emotes.queue} | **Current Queue**\n${q}`)
        ]
      })
    }
  }