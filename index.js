require('dotenv').config()
const chalk = require('chalk')
const { events } = require('./events.json')
let Client
let cacheWithLimits

function useLibrary(library) {
  if (library === 'djs') {
    Client = require('discord.js').Client
    cacheWithLimits = require('discord.js').Options.cacheWithLimits
  } else {
    Client = require('discord.js-light').Client
    cacheWithLimits = require('discord.js-light').Options.cacheWithLimits
  }
}
useLibrary('djs')

const ClientOptions = {
  intents: [
    'GUILDS',
    'GUILD_BANS',
    'GUILD_MEMBERS',
    'GUILD_EMOJIS_AND_STICKERS',
    'GUILD_INTEGRATIONS',
    'GUILD_WEBHOOKS',
    'GUILD_INVITES',
    'GUILD_VOICE_STATES',
    'GUILD_PRESENCES',
    'GUILD_MESSAGES',
    'GUILD_MESSAGE_REACTIONS',
    'GUILD_MESSAGE_TYPING',
    'DIRECT_MESSAGES',
    'DIRECT_MESSAGE_REACTIONS',
    'DIRECT_MESSAGE_TYPING'
  ],
  makeCache: cacheWithLimits({
    ApplicationCommandManager: 0, // guild.commands
    BaseGuildEmojiManager: 0, // guild.emojis
    GuildEmojiManager: 0,
    ChannelManager: 0, // client.channels
    GuildChannelManager: 0, // guild.channels
    GuildBanManager: 0, // guild.bans
    GuildInviteManager: 0, // guild.invites
    GuildManager: Infinity, // client.guilds
    GuildMemberManager: 0, // guild.members
    GuildStickerManager: 0, // guild.stickers
    MessageManager: 0, // channel.messages
    PermissionOverwriteManager: 0, // channel.permissionOverwrites
    PresenceManager: 0, // guild.presences
    ReactionManager: 0, // message.reactions
    ReactionUserManager: 0, // reaction.users
    RoleManager: 0, // guild.roles
    StageInstanceManager: 0, // guild.stageInstances
    ThreadManager: 0, // channel.threads
    ThreadMemberManager: 0, // threadchannel.members
    UserManager: 0, // client.users
    VoiceStateManager: 0 // guild.voiceStates
  }),
  partials: [
    'USER',
    'CHANNEL',
    'GUILD_MEMBER',
    'MESSAGE',
    'REACTION'
  ]
}
/**
 * @type {import('discord.js-light').Client} client
 */
const client = new Client(ClientOptions)

client.on('ready', () => {
  console.log(`${chalk.yellowBright.bold('ready')} ${client.user.tag} (${client.user.id}) is ready in ${client.guilds.cache.size} guilds`)
})

for (let event of events) {
  client.on(event, (firstValue, secondValue) => {
    console.log(
      chalk.yellowBright.bold(`${event} `) +
      `Received event with firstValue: ` +
      chalk.redBright.bold(`partial: ${firstValue?.partial ? 'yes' : 'no'}\n`),
      chalk.gray(firstValue, JSON.stringify(firstValue, null, 2)),
      chalk.white(`And secondValue: `) +
      chalk.redBright.bold(`partial: ${secondValue?.partial ? 'yes' : 'no'}\n`),
      chalk.gray(secondValue, JSON.stringify(secondValue, null, 2))
    )

    // guildBanAdd / guildBanRemove
    // console.log(firstValue.partial, firstValue.user, firstValue.guild, firstValue.user.partial, firstValue.guild.partial, JSON.stringify(firstValue.user, null, 2), JSON.stringify(firstValue.guild, null, 2))
  })
}

client.login()
