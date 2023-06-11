import { calcSkillLevel, getRank } from "../../BloomCore/utils/Utils"
import { maxLevels } from "../../BloomCore/skills/normal"
import PogObject from "PogData"
import request from "../../requestV2"
import Promise from "../../PromiseV2"
const File = Java.type("java.io.File")
const Loader = Java.type("net.minecraftforge.fml.common.Loader")

export const data = new PogObject("Player", {
    "key": null,
    "firstTime": true
}, ".data.json")

export const fileExists = (loc) => new File(loc).exists()

export const PREFIX = "&2[&aPlayer&2]&r"

export const chat = (msg) => ChatLib.chat(msg)
export const chatid = (msg, id) => new Message(msg).setChatLineId(id).chat()
export const hover = (msg, value) => new TextComponent(msg).setHoverValue(value).chat()
export const breakchat = () => ChatLib.chat(ChatLib.getChatBreak(" "))

export const setKey = (key) => {
    data.key = key
    data.save()
    chat(`${PREFIX} &aSaved Key Successfully!`)
}

export const checkLoaded = (mod) => Loader.isModLoaded(mod)

export const skillsToGather = {
    "experience_skill_combat": "Combat",
    "experience_skill_mining": "Mining",
    "experience_skill_farming": "Farming",
    "experience_skill_fishing": "Fishing",
    "experience_skill_foraging": "Foraging",
    "experience_skill_enchanting": "Enchanting",
    "experience_skill_alchemy": "Alchemy",
    "experience_skill_taming": "Taming",
    "experience_skill_carpentry": "Carpentry",
    "experience_skill_runecrafting": "Runecrafting"
}

export const shortNumber = (num) => num?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? num
export const mathTrunc = (num) => shortNumber(Math.trunc((Math.round(num * 100) / 100)))

export const getColoredLevel = (skill, xp, slayer = false) => {
    if(!xp) return `&70`
    const level = calcSkillLevel(skill, xp)

    if(skill.toLowerCase() === "runecrafting")
        return level >= 25 ? `&6${level}` : `&7${level}`
    else if(skill.toLowerCase() === "catacombs")
        return level >= 50 ? `&6${level}` : `&7${level}`
    else if(slayer)
        return level >= 9 ? `&6${level}` : `&7${level}`

    return level >= maxLevels[skill.toLowerCase()] ? `&6${level}` : `&7${level}`
}

export const makeRequest = (url) => request({url: url, headers: { 'User-Agent': ' Mozilla/5.0', 'Content-Type': 'application/json' }, json: true})
export const printError = (error) => hover(`${PREFIX} &cError Getting Data`, JSON.stringify(error))

export const getPlayerUuid = (username, fn) => {
    chatid(`${PREFIX} &aGetting &6${username} &aUUID Data...`, 3919)
    Promise.resolve(makeRequest(`https://api.mojang.com/users/profiles/minecraft/${username}`)).then(response => {
        ChatLib.clearChat(3919)
        return fn({
            uuid: response.id,
            username: response.name
        })
    }).catch(error => {
        print(error)
        printError(error)
    })
}

export const getPlayerRank = ({uuid, username}, fn) => {
    chatid(`${PREFIX} &aGetting &6${username} &aRank...`, 3919)
    Promise.resolve(makeRequest(`https://api.hypixel.net/player?uuid=${uuid}&key=${data.key}`)).then(response => {
        ChatLib.clearChat(3919)
        return fn([getRank(response), response.player?.achievements?.skyblock_treasure_hunter])
    }).catch(error => {
        print(error)
        printError(error)
    })
}

export const getPlayerProfileData = ({uuid, username}, fn) => {
    chatid(`${PREFIX} &aGetting &6${username} &aPlayer Profile...`, 3919)

    Promise.resolve(makeRequest(`https://api.hypixel.net/skyblock/profiles?key=${data.key}&uuid=${uuid}`)).then(response => {
        const profile = !response.profiles || !response.profiles.length ? null : response.profiles.find(a => a.selected) ?? response[0]
        if(!profile) return
        ChatLib.clearChat(3919)

        return fn([profile["members"][uuid], profile])
    }).catch(error => {
        print(error)
        printError(error)
    })
}

export const isBetween = (number, [a, b]) => number >= a && number <= b

//Every skyblock level prefix color
//<prefix color>: [<min number of the level>, <max number of the level>]
export const sbLevelsPrefix = {
    "&7": [1, 39],
    "&f": [40, 79],
    "&a": [80, 119],
    "&9": [120, 159],
    "&5": [160, 199],
    "&6": [200, 239],
    "&d": [240, 279],
    "&b": [280, 319],
    "&c": [320, 359],
    "&4": [360, 500]
}

export const getSbLevelPrefix = (number) => Object.keys(sbLevelsPrefix).filter(pref => isBetween(number, sbLevelsPrefix[pref]))

export const getPlayerData = (username, fn) => {
    let playerData = {
        uuid: null,
        username: null,
        rank: null,
        level: 0,
        purse: 0,
        bank: 0,
        cata: null,
        skillcomponents: [],
        slayercomponents: []
    }

    getPlayerUuid(username, (response) => {
        playerData.uuid = response.uuid
        playerData.username = response.username

        getPlayerRank(response, (rank) => {
            playerData.rank = rank[0]

            getPlayerProfileData(response, (profileData) => {
                playerData.level = profileData[0]?.leveling?.experience

                Object.keys(skillsToGather).forEach(skill => playerData.skillcomponents.push([skillsToGather[skill], profileData[0]?.[skill]]))

                Object.keys(profileData[0]?.slayer_bosses).forEach(slayer => playerData.slayercomponents.push([slayer, profileData[0]?.slayer_bosses?.[slayer]?.xp]))

                playerData.cata = profileData[0]?.dungeons?.dungeon_types?.catacombs?.experience
                playerData.purse = profileData[0]?.coin_purse
                playerData.bank = profileData[1]?.banking?.balance

                return fn(playerData)
            })
        })
    })
}

export const getNormalPlayerData = (username, fn) => {
    let playerData = {
        uuid: null,
        username: null,
        rank: null,
        secrets: null,
        profileApi: null
    }

    getPlayerUuid(username, (response) => {
        playerData.uuid = response.uuid
        playerData.username = response.username

        getPlayerRank(response, (rank) => {
            playerData.rank = rank[0]
            playerData.secrets = rank[1]

            getPlayerProfileData(response, (profileData) => {
                playerData.profileApi = profileData
                return fn(playerData)
            })
        })
    })
}

export const coloredClasses = {
    "Archer": "&6☣ Archer",
    "Mage": "&b✎ Mage",
    "Berserk": "&c⚔ Berserker",
    "Healer": "&a❤ Healer",
    "Tank": "&7❈ Tank"
}
export const dojoNames = {
    "dojo_points_mob_kb": "Force",
    "dojo_points_wall_jump": "Stamina",
    "dojo_points_archer": "Mastery",
    "dojo_points_sword_swap": "Discipline",
    "dojo_points_snake": "Swiftness",
    "dojo_points_fireball": "Tenacity",
    "dojo_points_lock_head": "Control"
}
export const hotmLevels = {
    "&71": [0, 2999],
    "&72": [3000, 11999],
    "&73": [12000, 36999],
    "&74": [37000, 96999],
    "&75": [97000, 196999],
    "&76": [197000, 346999],
    "&67": [347000, 347000]
}
export const getColoredHotmLevel = (number) => Object.keys(hotmLevels).filter(level => isBetween(number, hotmLevels[level]))