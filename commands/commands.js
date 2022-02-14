const Discord = require('discord.js')

module.exports = {
  name: 'commands',
  aliases: ['h', 'cmd', 'command'],
  run: async (client, message) => {
    message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setTitle('Commands')
          .setDescription(client.commands.map(cmd => `\`${cmd.name}\``).join(', '))
          .setColor('#ff0000')
      ]
    })
  }
}