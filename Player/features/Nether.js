import { title } from "../../BloomCore/utils/Utils"
import { PREFIX, breakchat, chat, data, dojoNames, getNormalPlayerData, hover, shortNumber } from "../utils/utils"

register("command", (username) => {
    if(!data.key) return chat(`${PREFIX} &cError Invalid Api Key`)
    username = !username ?Player.getName() :username

    getNormalPlayerData(username, (profileData) => {
        let faction = profileData.profileApi?.[0].nether_island_player_data?.selected_faction ?? "NONE"
        let factionReputation = profileData.profileApi?.[0].nether_island_player_data?.[`${faction}_reputation`] ?? 0

        let kuudraCompletions = Object.keys(profileData.profileApi?.[0].nether_island_player_data?.kuudra_completed_tiers)
            .reduce((accumulative, kuudraTier) => {
                //Checking for _ since there's highest_wave_<Tier> and blah blah in the api
                if(kuudraTier.includes("_")) return accumulative

                accumulative[kuudraTier === "none" ?"basic" :kuudraTier] = profileData.profileApi?.[0].nether_island_player_data?.kuudra_completed_tiers[kuudraTier]
                return accumulative
            }, {})

        let dojoPoints = Object.keys(profileData.profileApi?.[0].nether_island_player_data?.dojo)
            .reduce((accumulative, dojoName) => {
                if(!dojoName.startsWith("dojo_points")) return accumulative

                accumulative[dojoNames[dojoName]] = profileData.profileApi[0].nether_island_player_data.dojo[dojoName]
                return accumulative
            }, {})
        let totalDojoPoints = Object.values(dojoPoints).reduce((a, b) => a+b, 0)

        chat(`${PREFIX} ${profileData.rank} ${profileData.username}`)
        breakchat()
        chat(`&aFaction&r: &6${title(faction)}`)
        chat(`&aFaction Reputation&r: &6${shortNumber(factionReputation)}`)
        breakchat()
        Object.keys(kuudraCompletions).forEach(kuudraTier => chat(`&a${title(kuudraTier)}&r: &6${shortNumber(kuudraCompletions[kuudraTier])}`))
        breakchat()
        hover(`&aDojo Total Points&r &6${shortNumber(totalDojoPoints)} &7(Hover)`, Object.keys(dojoPoints).map(dojoName => `&a${dojoName}&r: &6${shortNumber(dojoPoints[dojoName])}`).join("\n"))
    })
}).setName("pnether")