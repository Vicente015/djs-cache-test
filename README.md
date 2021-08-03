# djs-cache-test

This is a test to compare the data received on events between discord.js-light v4 and discord.js v13 with the new option to limit caches.
All tests have been done with all intents and partials enabled.
You can see the code used in `index.js`.

**Disabling the guild cache in discord.js results in the majority of events not being emitted or errors occurring, so this does not take that into account.**

## Events
| Event                                                                                                                      | Emits in djs-light                 | Notes in djs-light                                                                                                 | Emits in djs                       | Notes in djs                                                                                                            | Managers with cache at 0             |
|----------------------------------------------------------------------------------------------------------------------------|------------------------------------|--------------------------------------------------------------------------------------------------------------------|------------------------------------|-------------------------------------------------------------------------------------------------------------------------|--------------------------------------|
| [channelCreate](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-channelCreate)                           | channel                            |                                                                                                                    | channel                            |                                                                                                                         | ChannelManager, GuildChannelManager  |
| [channelDelete](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-channelDelete)                           | channel                            |                                                                                                                    | channel?                           | Only emits if channels are cached.                                                                                      | ChannelManager, GuildChannelManager  |
| [channelPinsUpdate](https://discord.js.org/#/docs/master/stable/class/Client?scrollTo=e-channelPinsUpdate)                 | channel, time                      | Partial channel if not cached.                                                                                     | channel?, time?                    | Only emits if channels are cached                                                                                       | ChannelManager, GuildChannelManager  |
| [channelUpdate](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-channelUpdate)                           | oldChannel, newChannel             | oldChannel partial if not cached.                                                                                  | oldChannel?, newChannel?           | Only emits if channels are cached.                                                                                      | ChannelManager, GuildChannelManager  |
| [emojiCreate](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-emojiCreate)                               | emoji                              | Instead it emits [guildEmojisUpdate](https://github.com/timotejroiko/discord.js-light#notes-and-important-info).   | emoji                              | If GuildEmojiManager is disabled, it is emitted with every emoji on the server and not only with the new emoji.         | BaseGuildEmojiManager                |
| [emojiDelete](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-emojiDelete)                               | emoji                              | Instead it emits [guildEmojisUpdate](https://github.com/timotejroiko/discord.js-light#notes-and-important-info).   | emoji                              | If GuildEmojiManager is disabled it is not emitted, instead emits emojiCreate for each emoji that has not been deleted. | BaseGuildEmojiManager                |
| [emojiUpdate](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-emojiUpdate)                               | oldEmoji, newEmoji                 | Instead it emits [guildEmojisUpdate](https://github.com/timotejroiko/discord.js-light#notes-and-important-info).   | oldEmoji, newEmoji                 | If GuildEmojiManager is disabled it is not emitted, instead it emits emojiCreate with the new emoji data.               | BaseGuildEmojiManager                |
| [guildBanAdd](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-guildBanAdd)                               | ban                                | Is partial and only includes guild and user data.                                                                  | ban                                | Is partial and only includes guild and user data.                                                                       | GuildBanManager                      |
| [guildBanRemove](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-guildBanRemove)                         | ban                                | Is partial and only includes guild and user data.                                                                  | ban                                | Is partial and only includes guild and user data.                                                                       | GuildBanManager                      |
| [guildCreate](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-guildCreate)                               | guild                              |                                                                                                                    | guild                              |                                                                                                                         | GuildManager                         |
| [guildDelete](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-guildDelete)                               | guild                              | Partial guild if not cached.                                                                                       | guild?                             | Only emits if guilds are cached.                                                                                        | GuildManager                         |
| [guildIntegrationsUpdate](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-guildIntegrationsUpdate)       | guild                              | I don't know how to test this.                                                                                     | guild                              | I don't know how to test this.                                                                                          | -                                    |
| [guildMemberAdd](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-guildMemberAdd)                         | member                             | Member sometimes is partial.                                                                                       | member                             | Crashes if RoleManager is also disabled.                                                                                | GuildMemberManager                   |
| [guildMemberRemove](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-guildMemberRemove)                   | member                             | Partial member if not cached.                                                                                      | member                             | Partial member if not cached. Crashes if RoleManager is also disabled.                                                  | GuildMemberManager                   |
| [guildMemberUpdate](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-guildMemberUpdate)                   | oldMember, newMember               | oldMember partial if not cached.                                                                                   | oldMember, newMember               | oldMember is partial if not cached. Crashes if RoleManager is also disabled.                                            | GuildMemberManager                   |
| [guildUpdate](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-guildUpdate)                               | oldGuild, newGuild                 | oldGuild partial if not cached.                                                                                    | oldGuild?, newGuild?               | Only emits if guilds are cached.                                                                                        | GuildManager                         |
| [interactionCreate](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-interactionCreate)                   | interaction                        | -                                                                                                                  | interaction                        | -                                                                                                                       | -                                    |
| [inviteCreate](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-inviteCreate)                             | invite                             |                                                                                                                    | invite                             | Only emits if channels are cached.                                                                                      | GuildInviteManager                   |
| [inviteDelete](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-inviteDelete)                             | invite                             | Partial invite.                                                                                                    | invite                             | Only emits if channels are cached.                                                                                      | GuildInviteManager                   |
| [messageCreate](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-messageCreate)                           | message                            |                                                                                                                    | message?                           | Only emits if messages, channels and guilds are cached.                                                                 | MessageManager                       |
| [messageDelete](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-messageDelete)                           | message                            | Partial message if not cached.                                                                                     | message                            | Partial message if not cached, only emits if the channel is cached.                                                     | MessageManager                       |
| [messageDeleteBulk](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-messageDeleteBulk)                   | messages                           | Collection of deleted messages or partial messages as above.                                                       | messages                           | Collection of deleted messages or partial messages as above, only emits if the channel is cached.                       | MessageManager                       |
| [messageReactionAdd](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-messageReactionAdd)                 | reaction, user                     | Partial reaction, partial user sometimes.                                                                          | reaction, user                     | Partial reaction, partial user if not cached. Only emits if channels are cached.                                        | ReactionManager, ReactionUserManager |
| [messageReactionRemove](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-messageReactionRemove)           | reaction, user                     | Partial reaction, partial user sometimes.                                                                          | reaction, user                     | Partial reaction, partial user if not cached. Only emits if channels are cached.                                        | ReactionManager, ReactionUserManager |
| [messageReactionRemoveAll](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-messageReactionRemoveAll)     | message                            | Partial message always.                                                                                            | message                            | Partial message always. Only emits if channels are cached.                                                              | ReactionManager, ReactionUserManager |
| [messageReactionRemoveEmoji](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-messageReactionRemoveEmoji) | reaction                           | Partial reaction.                                                                                                  | reaction                           | Partial reaction. Only emits if channels are cached.                                                                    | ReactionManager, ReactionUserManager |
| [messageUpdate](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-messageUpdate)                           | oldMessage, newMessage             | oldMessage partial if not cached.                                                                                  | oldMessage?, newMessage            | Only emits if channels are cached.                                                                                      | MessageManager                       |
| [presenceUpdate](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-presenceUpdate)                         | oldPresence, newPresence           | oldPresence partial if member not cached.                                                                          | oldPresence, newPresence           | Only emits if guild members and users are cached.                                                                       | PresenceManager                      |
| [roleCreate](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-roleCreate)                                 | role                               |                                                                                                                    | role                               |                                                                                                                         | RoleManager                          |
| [roleDelete](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-roleDelete)                                 | role                               | Partial role if not cached.                                                                                        | role?                              | Only emits if roles are cached.                                                                                         | RoleManager                          |
| [roleUpdate](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-roleUpdate)                                 | oldRole, newRole                   | oldRole partial if not cached.                                                                                     | oldRole?, newRole?                 | Only emits if roles are cached.                                                                                         | RoleManager                          |
| [stageInstanceCreate](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-stageInstanceCreate)               | stageInstance                      |                                                                                                                    | stageInstance                      | -                                                                                                                       | StageInstanceManager                 |
| [stageInstanceDelete](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-stageInstanceDelete)               | stageInstance                      |                                                                                                                    | stageInstance                      | -                                                                                                                       | StageInstanceManager                 |
| [stageInstanceUpdate](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-stageInstanceUpdate)               | oldStageInstance, newStageInstance | oldStageInstance partial if not cached.                                                                            | oldStageInstance, newStageInstance | -                                                                                                                       | StageInstanceManager                 |
| [stickerCreate](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-stickerCreate)                           | sticker                            | Instead it emits [guildStickersUpdate](https://github.com/timotejroiko/discord.js-light#notes-and-important-info). | sticker                            | -                                                                                                                       | GuildStickerManager                  |
| [stickerDelete](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-stickerDelete)                           | sticker                            | Instead it emits [guildStickersUpdate](https://github.com/timotejroiko/discord.js-light#notes-and-important-info). | sticker                            | -                                                                                                                       | GuildStickerManager                  |
| [stickerUpdate](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-stickerUpdate)                           | oldSticker, newSticker             | Instead it emits [guildStickersUpdate](https://github.com/timotejroiko/discord.js-light#notes-and-important-info). | oldSticker, newSticker             | -                                                                                                                       | GuildStickerManager                  |
| [threadCreate](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-threadCreate)                             | thread                             |                                                                                                                    | thread                             | -                                                                                                                       | ThreadManager                        |
| [threadDelete](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-threadDelete)                             | thread                             | Partial thread if not cached.                                                                                      | thread                             | -                                                                                                                       | ThreadManager                        |
| [threadListSync](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-threadListSync)                         | threads                            |                                                                                                                    | threads                            | -                                                                                                                       | ThreadManager                        |
| [threadMembersUpdate](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-threadMembersUpdate)               | oldMembers, newMembers             |                                                                                                                    | oldMembers, newMembers             | -                                                                                                                       | ThreadManager, ThreadMemberManager   |
| [threadMemberUpdate](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-threadMemberUpdate)                 | oldMember, newMember               |                                                                                                                    | oldMember, newMember               | -                                                                                                                       | ThreadManager, ThreadMemberManager   |
| [threadUpdate](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-threadUpdate)                             | oldThread, newThread               | oldThread partial if not cached.                                                                                   | oldThread, newThread               | -                                                                                                                       | ThreadManager                        |
| [typingStart](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-typingStart)                               | typing                             |                                                                                                                    | typing                             | Only emits if channels are cached.                                                                                      | -                                    |
| [userUpdate](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-userUpdate)                                 | oldUser, newUser                   | oldUser partial if not cached.                                                                                     | oldUser?, newUser?                 | Crashes if the user is not cached. See [issue #6290](https://github.com/discordjs/discord.js/issues/6290).              | UserManager, GuildMemberManager      |
| [voiceStateUpdate](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-voiceStateUpdate)                     | oldState, newState                 |                                                                                                                    | oldState, newState                 | Includes some partial data.                                                                                             | VoiceStateManager                    |
| [webhookUpdate](https://discord.js.org/#/docs/main/master/class/Client?scrollTo=e-webhookUpdate)                           | channel                            | Partial channel if not cached.                                                                                     | channel                            | Only emits if channels are cached.                                                                                      | -                                    |
