const Discord = require("discord.js")

module.exports = {

  name: "pause",
  description: "Pause or resume the current queue",
  permission: null,
  dm: false,
  category: "Music",

  async run(bot, message, args) {
    const queue = bot.player.nodes.get(message.guildId)

		if (!queue) return await message.reply({content: "There are **no songs** in the queue.", ephemeral: true})

    if(!queue.node.isPlaying()){
      queue.node.resume()
      return await message.reply("Queue has been **resumed**.")
    } else {
      queue.node.pause()
      return await message.reply("Queue has been **paused**.")
    }
  }
}
