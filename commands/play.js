const Discord = require("discord.js")
const { QueryType, useMainPlayer } = require("discord-player")

module.exports = {

  name: "play",
  description: "Play a song from link on your voice channel",
  permission: null,
  dm: false,
  category: "Music",
  options: [
    {
      type: "string",
      name: "url",
      description: "Link to a YouTube video or playlist",
      required: true,
      autocomplete: false,
    },
    {
      type: "string",
      name: "shuffle",
      description: "If you want the songs played in a random order",
      required: false,
      autocomplete: true,
    }
  ],

  async run(bot, message, args) {

    function checkLink(string){
      let url
      try { url = new URL(string) } catch (_) { return false }
      // return (url.protocol === "http:" || url.protocol === "https:") && (string.includes("youtube.com") || string.includes("youtu.be"))
      return (url.protocol === "http:" || url.protocol === "https:")
    }

    await message.deferReply()
    const player = useMainPlayer()

    shuffle = false

    channel = message.member.voice.channel
    url = args.get("url").value

    if (!channel) return message.editReply({content: "You need to be in a Voice Channel.", ephemeral: true})
    // original_url = url

    if (!checkLink(url)) return message.editReply({content: "URL provided is invalid.", ephemeral: true})

    if (args.get("shuffle")?.value.toLowerCase() == "yes") shuffle = true

    const searchResult = await player.search(url, { requestedBy: message.user })

    if (!searchResult.hasTracks()) return await message.editReply({content: "Could not find something at this URL.", ephemeral: true})
    else {
      try {
        if(shuffle) searchResult.tracks = searchResult.tracks.sort(() => Math.random() - 0.5)
        await player.play(channel, searchResult, { nodeOptions: { metadata: message }})

        let embed = new Discord.EmbedBuilder()
          .setColor(bot.color)
          .setTimestamp()
          .setFooter({text: `Requested by ${searchResult.requestedBy.username}`, iconURL: `${searchResult.requestedBy.displayAvatarURL({dynamic: true})}`})

        if(searchResult.hasPlaylist()){
          embed
            .addFields({name: "Description", value: `${searchResult.playlist.description}`})
            .addFields({name: "Duration", value: `${searchResult.tracks.length} songs`})
            .setThumbnail(searchResult.playlist.thumbnail)
            .setDescription(`**${searchResult.playlist.title}** has been added as a **${shuffle ? "shuffled" : ""} playlist** to the Queue`)
        } else {
          embed
            .setDescription(`**${searchResult.tracks[0].title}** has been added to the Queue`)
            .addFields({name: "Author", value: `${searchResult.tracks[0].author}`})
            .addFields({name: "Duration", value: `${searchResult.tracks[0].duration}`})
            .setThumbnail(searchResult.tracks[0].thumbnail)
        }
        await message.editReply({ embeds: [embed] })
      } catch (e) {
          return message.followUp(`Something went wrong: ${e}`)
      }
    }
  }
}
