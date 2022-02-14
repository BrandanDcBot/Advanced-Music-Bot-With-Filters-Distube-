const Discord = require('discord.js')

module.exports = {
    name: 'autoplay',
    inVoiceChannel: true,
    run: async (client, message) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
          .setFooter(`Requested By ${message.author.tag}`)
          .setColor("#ff0000")
          .setDescription(`${client.emotes.error} | There is nothing in the queue right now!`)
          .setThumbnail(`${client.user.displayAvatarURL ({dynamic: true})}`)
        ]
      })
      const autoplay = queue.toggleAutoplay()
      message.channel.send(`${client.emotes.success} | AutoPlay: \`${autoplay ? 'On' : 'Off'}\``)
    }
  }