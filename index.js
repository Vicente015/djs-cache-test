require('dotenv').config()
const chalk = require('chalk')
const { Client, Options: { cacheWithLimits } } = require('discord.js')
const { events } = require('./events.json')

const TestClient = new Client({
  intents: [
    'GUILDS',
    'GUILD_MEMBERS',
    'GUILD_BANS',
    'GUILD_EMOJIS',
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
    ApplicationCommandManager: 200,
    ApplicationCommandPermissionsManager: 200,
    BaseGuildEmojiManager: 200, // cacheEmojis
    ChannelManager: 200, // cacheChannels
    ClientVoiceManager: 200,
    GuildApplicationCommandManager: 200,
    GuildBanManager: 200, // cacheBans?
    GuildChannelManager: 200, // cacheChannels
    GuildEmojiManager: 200, // cacheEmojis
    GuildEmojiRoleManager: 200, // cacheEmojis
    GuildInviteManager: 200,
    GuildManager: 200, // cacheGuilds
    GuildMemberManager: 200, // cacheMembers
    GuildMemberRoleManager: 200, // cacheMembers
    MessageManager: 200, // cacheMessages
    PermissionOverwriteManager: 200,
    PresenceManager: 200, // cachePresences
    ReactionManager: 200, // cacheReactions
    ReactionUserManager: 200, // cacheReactions
    RoleManager: 200, // cacheRoles
    StageInstanceManager: 200,
    ThreadManager: 200,
    ThreadMemberManager: 200, // cacheMembers
    UserManager: 200, // cacheUsers
    VoiceStateManager: 200,
    WebSocketManager: 200
  }),
  partials: [
    'USER',
    'CHANNEL',
    'GUILD_MEMBER',
    'MESSAGE',
    'REACTION'
  ]
})

TestClient.on('ready', () => {
  console.log('Bot ready')
})

for (let event of events) {
  TestClient.on(event, (firstValue, secondValue) => {
    console.log(
      chalk.blueBright.bold(`[${event}] `) +
      chalk.white(`Received event with firstValue: `) +
      chalk.yellow.bold(`partial: ${firstValue?.partial ? 'yes' : 'no'}\n`),
      chalk.gray(JSON.stringify(firstValue, null, 2)),
      chalk.white(`And secondValue: `) +
      chalk.yellow.bold(`partial: ${secondValue?.partial ? 'yes' : 'no'}\n`),
      chalk.gray(JSON.stringify(secondValue, null, 2))
    )
  })
}

TestClient.login(process.env.DISCORD_TOKEN)
