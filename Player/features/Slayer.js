import { title } from "../../BloomCore/utils/Utils"
import { PREFIX, breakchat, chat, data, getColoredLevel, getNormalPlayerData, hover, shortNumber } from "../utils/utils"

register("command", (username) => {
    if(!data.key) return chat(`${PREFIX} &cError Invalid Api Key`)
    username = !username ?Player.getName() :username

    getNormalPlayerData(username, (profileData) => {
        let slayers = profileData.profileApi?.[0].slayer_bosses
        let totalKills = 0
        let totalXP = 0

        //Thanks Unclaimed#6151 for this reduce code
        let slayerInfo = Object.keys(slayers)
            .reduce((a, boss) => {
                a[boss] = {
                    "chat": "",
                    "hover": ""
                }

                let xp = slayers[boss].xp ?? 0
                totalXP += xp

                let level = xp === 0 ?0 :getColoredLevel(boss, xp, true)

                let kills = Object.keys(slayers[boss]).reduce((c, d) => {
                    if (!d.startsWith("boss_kills_tier_")) return c
                    split = d.split("_") // ["boss", "kills", "tier", "0"]
                    let tier = parseInt(split[split.length-1])+1 // "0" -> 1
                    c[tier] = slayers[boss][d] // Add to boss kills
                    return c
                }, {})

                let bossKills = Object.values(kills).reduce((c, d) => c+d, 0)
                totalKills += bossKills

                a[boss].chat = `&b${title(boss)} Slayer ${level}&r: &7${level?.startsWith("&6") ?"&6" :"&7"}${shortNumber(xp)}`

                a[boss].hover = Object.keys(kills).reduce((c, d) => c + `\n&aTier ${d}: &6${kills[d]}`, "&aTotal Kills") + `\n&aTotal: &6${shortNumber(bossKills)}`

                return a
            }, {})

        chat(`${PREFIX} ${profileData.rank} ${profileData.username}`)
        hover(`&aTotal Slayer XP&r: &6${shortNumber(totalXP)}`, `&aTotal Slayer Kills: &6${shortNumber(totalKills)}`)
        breakchat()
        Object.keys(slayerInfo).forEach(boss => hover(slayerInfo[boss].chat, slayerInfo[boss].hover))
    })
}).setName("pslayer")