const { DisTube } = require('distube')
const Discord = require('discord.js')
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES
  ]
})
const fs = require('fs')
const config = require('./config.json')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')

client.config = require('./config.json')
client.distube = new DisTube(client, {
  youtubeCookie: VISITOR_INFO1_LIVE=U2QATraBYBM; PREF=tz=Asia.Katmandu&f6=40000000&f5=30000; LOGIN_INFO=AFmmF2swRQIgEFFHkukzOWBQMxoP1rJtpfcQcUrg1jgrGcE4GwAB-vkCIQD7-3xgs7ZVPFhxWYNCru-5am54qoN-Vmcia59iWygRGA:QUQ3MjNmeENNS2FSR2M1MjBXUlZGak5KbTZaUUlYRWRzRm5BT0M0YmloS3ZKZEYwOUtGZHZnQTdPYk5RSmkwbGVqWmhuSC1ON1ZTVFA5OFBsdGxJZHJucF9xRkV5Z054UkxfY1cxSWpLZmFQY1F5RXpDRFlGNEstSzRKYkR0ZXdfSkl3cHhFVnBpZ0s1dHdqaGJwQldic3FuUHlQLUlGWXln; SID=-wcVqRro67GFifmdlftZFeS5JEAl9jaWZyPVQCfw_7Q3Nsu7B0dr1r3seFK264Db58EsSA.; Secure-3PSID=-wcVqRro67GFifmdlftZFeS5JEAl9jaWZyPVQCfw_7Q3Nsu7pdxvk9qVm_kdi3E6inElYg.; HSID=AMOR6MIKosSG0sOAA; SSID=AEGlFwlmYV5AB3cC-; APISID=Y7Yo2SAxnIz4U1sl/A-3SZjry6vhyBgBQ8; SAPISID=vk9gOgIs4QfiInwL/A4hfXNFmDNi3PpWTA; Secure-3PAPISID=vk9gOgIs4QfiInwL/A4hfXNFmDNi3PpWTA; YSC=P0ojBQS_SMk; SIDCC=AJi4QfEVrKq60m8YEQ8qhRfoK0NMsi6FJkTAfn8F8VGc7hyLZvvbmW5py2eBSKk_1jKQgZ25X84; __Secure-3PSIDCC=AJi4QfH3aHjcC94EYd_hlT3GK6hJKuj7n6WFa-kGfynJm1WWEIbYtuIu9BiFBMcb9Hec6dvfY6Q
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin()
  ]
})
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.emotes = config.emoji

fs.readdir('./commands/', (err, files) => {
  if (err) return console.log('Could not find any commands!')
  const jsFiles = files.filter(f => f.split('.').pop() === 'js')
  if (jsFiles.length <= 0) return console.log('Could not find any commands!')
  jsFiles.forEach(file => {
    const cmd = require(`./commands/${file}`)
    console.log(`Loaded ${file}`)
    client.commands.set(cmd.name, cmd)
    if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
  })
})

client.on('ready', () => {
  console.log(`${client.user.tag} is ready to play music.`)
  client.user.setPresence({ activities: [{ name: "!cmd", type: `LISTENING` }], status: 'idle' })
})

client.on('messageCreate', async message => {
  if (message.author.bot || !message.guild) return
  const prefix = config.prefix
  if (!message.content.startsWith(prefix)) return
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
  if (!cmd) return
  if (cmd.inVoiceChannel && !message.member.voice.channel) {
    return message.channel.send({
        embeds: [
            new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setDescription(`${client.emotes.error} | **You Must Join A Voice Channel**`)
        ]
    })
  }
  try {
    cmd.run(client, message, args)
  } catch (e) {
    console.error(e)
    message.channel.send(`${client.emotes.error} | Error: \`${e}\``)
  }
})

const status = queue =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
  .on('playSong', (queue, song) =>
    queue.textChannel.send({
        embeds: [
            new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setDescription(`**Now Playing** 
            **[${song.name}](${song.url})**
                             **Requested By** ${song.user}
                             **Song Author** ${song.uploader.name}
                             **Song Duration** ${song.formattedDuration}`)
                             .setThumbnail(`${song.thumbnail}`)
        ]
    })
  )
  .on('addSong', (queue, song) =>
    queue.textChannel.send({
        embeds: [
            new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setDescription(`${client.emotes.success} **Successfully Added Track To Queue**
            **Song Author** [${song.uploader.name}](${song.uploader.url})
            [${song.name}](${song.url})`)
            
            .setThumbnail(`${song.thumbnail}`)
            .setTitle(`Added Track To Queue`)
        ]
    })
  )
  .on('addList', (queue, playlist) =>
    queue.textChannel.send({
      embeds: [
        new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setDescription(`${client.emotes.success} | Added \`${playlist.name}\` playlist (${
          playlist.songs.length
        } songs) to queue\n${status(queue)}`)
      ]
    })
  )
  .on('error', (channel, e) => {
    channel.send(`${client.emotes.error} | An error encountered: ${e.toString().slice(0, 1974)}`)
    console.error(e)
  })
  .on('empty', channel => channel.send('Voice channel is empty! Leaving the channel...'))
  .on('searchNoResult', (message, query) =>
    message.channel.send(`${client.emotes.error} | No result found for \`${query}\`!`)
  )
  .on('finish', queue => queue.textChannel.send('Finished!'))
// // DisTubeOptions.searchSongs = true
// .on("searchResult", (message, result) => {
//     let i = 0
//     message.channel.send(
//         `**Choose an option from below**\n${result
//             .map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``)
//             .join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`
//     )
// })
// .on("searchCancel", message => message.channel.send(`${client.emotes.error} | Searching canceled`))
// .on("searchInvalidAnswer", message =>
//     message.channel.send(
//         `${client.emotes.error} | Invalid answer! You have to enter the number in the range of the results`
//     )
// )
// .on("searchDone", () => {})

client.login(config.token)
