const { MessageEmbed } = require('discord.js');

module.exports = {
    name: '8d',
    aliases: [],

    async execute(client, message) {
        if (!message.member.voice.channel) return message.channel.send({embeds: [new MessageEmbed().setColor("#ff0000").setDescription(`Plz Join A Voice Channel to use This command`)]});
		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({embeds: [new MessageEmbed().setColor(client.color.error).setDescription(`You are not in same voice channel.`)]});
		
        try {
            await client.distube.setFilter(message, '8d');
            return message.channel.send({embeds: [new MessageEmbed().setColor("#ff0000").setDescription(`**8D** filter applying to the music.`)]});
        } catch {
            return message.channel.send({embeds: [new MessageEmbed().setColor("#ff0000").setDescription(`Currently there are no music is playing.`)]});
        }
    }
}
