const Discord = require('discord.js')

module.exports = {
  name: 'help',
  aliases: ['h', 'cmd', 'command'],
  run: async (client, message) => {
    message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setTitle('Help Panel')
          .setDescription(`**Hey <@${message.author.id}> I am Brandan My Prefix Is ! I Play Music for You From Many Sources Like Youtube Spotify SoundClound And Much More To See My All Commands Simply Type !cmd + I Have Music Filters And Rich Quality
          My Developer is Ꭺᴇᴄ丶Legend#0001
          Any Doubts?
          Join Our [Support Server](https://discord.gg/dMtasjybdM)
          [Invite Me](https://dsc.gg/brandan)
          [Vote Me](https://top.gg/bot/927092113315868713)**
          Prefix: ('!') `)
          .setColor('#ff0000')
          .setFooter("Thanks For Choosing Brandan")
          .setTimestamp()
          .setThumbnail(`${client.user.displayAvatarURL ({dynamic: true})}`)
          
      ]
    })
  }
}