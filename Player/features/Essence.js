import { title } from "../../BloomCore/utils/Utils"
import { PREFIX, breakchat, chat, data, getNormalPlayerData, shortNumber } from "../utils/utils"

register("command", (username) => {
    if(!data.key) return chat(`${PREFIX} &cError Invalid Api Key`)

    username = !username ?Player.getName() :username

    getNormalPlayerData(username, (profileData) => {
        let essence = Object.keys(profileData.profileApi?.[0]).reduce((a, ess) => {
            if(!ess.startsWith("essence_")) return a
            a[title(ess.replace("essence_", ""))] = profileData.profileApi?.[0]?.[ess]
            return a
        }, {})

        chat(`${PREFIX} ${profileData.rank} ${profileData.username}`)
        breakchat()
        Object.keys(essence).forEach(ess => chat(`&a${ess}: &6${shortNumber(essence[ess]) ?? 0}`))
    })
}).setName("pessence")