const Discord = require('discord.js')

module.exports = {
    name: 'play',
    aliases: ['p'],
    inVoiceChannel: true,
    run: async (client, message, args) => {
      const string = args.join(' ')
      if (!string) return message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
          .setColor("#ff0000")
          .setDescription(` ${client.emote.error}You Must Provide Me Song Name/URL`)
        ]
      })
      client.distube.play(message.member.voice.channel, string, {
        member: message.member,
        textChannel: message.channel,
        message
      })
    }
  }