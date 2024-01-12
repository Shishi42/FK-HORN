const Discord = require("discord.js")

module.exports = {

  name: "end",
  description: "End the queue and leave the voice channel",
  permission: null,
  dm: false,
  category: "Music",

  async run(bot, message, args) {
    const queue = bot.player.nodes.get(message.guildId)

		if (!queue) return await message.reply({content: "There are **no songs** in the queue.", ephemeral: true})

		queue.delete()
    return await message.reply("Queue has **ended**.")
  }
}
