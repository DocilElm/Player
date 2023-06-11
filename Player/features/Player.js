import { title } from "../../BloomCore/utils/Utils"
import { breakchat, chat, checkLoaded, data, getColoredLevel, getPlayerData, getSbLevelPrefix, hover, mathTrunc, PREFIX, shortNumber } from "../utils/utils"

const commandName = checkLoaded("SkyblockExtras") ?"pplayer" :"player"

register("command", (username) => {
    if(!data.key) return chat(`${PREFIX} &cError Invalid Api Key`)

    username = !username ?Player.getName() :username

    getPlayerData(username, (playerdata) => {
        const sbxp = playerdata.level

        hover(`${PREFIX} ${playerdata.rank} ${playerdata.username} &r[&6${getSbLevelPrefix(sbxp/100)}${sbxp/100}&r]`, `&aTotal XP: &6${shortNumber(sbxp)}`)

        playerdata.skillcomponents.forEach(skill => hover(`&a${skill[0]}&r: ${getColoredLevel(skill[0], skill[1])}`, `&aTotal XP&r: &6${mathTrunc(skill[1])}`))

        playerdata.slayercomponents.forEach(slayer => hover(`&b${title(slayer[0])}&r: ${getColoredLevel(slayer[0], slayer[1], true)}`, `&aTotal XP&r: &6${mathTrunc(slayer[1])}`))

        hover(`&cCata&r: ${getColoredLevel("catacombs", playerdata.cata)}`, `&aTotal XP&r: &6${mathTrunc(playerdata.cata)}`)

        chat(`&aPurse&r: &6${mathTrunc(playerdata.purse)}`)

        chat(`&aBank&r: &6${mathTrunc(playerdata.bank)}`)

        breakchat()
    })
}).setName(commandName)