const { MessageEmbed } = require('discord.js');

module.exports = {
	name: "stop",
	description: "Stops the music",
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);

		if (!message.member.voice.channel)
			return message.reply("You need to join a voice channel first!").catch(console.error);
		if (!serverQueue) return message.reply("There is nothing playing.").catch(console.error);

		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end();


		let stopEmbed = new MessageEmbed()
			.setTitle("Stop")
			.setDescription(`The music has been stopped by ${message.author}`)
			.setColor(`#d32f2f`);


		serverQueue.textChannel.send(stopEmbed)
			.then((msg) => {
				setTimeout(() => {
					if (msg.deletable) {
						msg.delete();
					}
				}, 10000);
			})
			.catch(console.error);
	}
};
