const { totalCores } = require('cpu-stat')
const Discord = require('discord.js')

module.exports = {
  name: 'stats',
  aliases: ['botinfo'],
  run: async (client, message) => {
    message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
        .setColor("#ff000")
        .setDescription(`Stats From Brandan`)
        .setColor("#ff000")
        .setDescription(`Stats From ${client.user.username}`)
        .addField("⏳ Memory Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`)
          .addField("⌚️ Uptime ", `${prettyMilliseconds(client.uptime)}`)
          .addField("👥 Users", `${client.users.cache.size}`)
          .addField("📁 Servers", `${client.guilds.cache.size}`)
          .addField("🤖 Discord.js", `v${version}`)
          .addField("👾 Node", `${process.version}`)
          .addField("⚡ CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
          .addField("✔️ Arch", `${os.arch()}`)
          .addField("💻 Platform", `${os.platform()}`)
          .addField("🖥 API Latency", `${(client.ws.ping)}ms`)  
      ]
    })
  }
}
