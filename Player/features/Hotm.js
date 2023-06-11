import { title } from "../../BloomCore/utils/Utils"
import { PREFIX, breakchat, chat, data, getColoredHotmLevel, getNormalPlayerData, hover, shortNumber } from "../utils/utils"

register("command", (username) => {
    if(!data.key) return chat(`${PREFIX} &cError Invalid Api Key`)
    username = !username ?Player.getName() :username
    
    getNormalPlayerData(username, (profileData) => {
        const miningCore = profileData.profileApi?.[0]?.mining_core
        let mithrilPowder = miningCore?.powder_mithril_total + miningCore?.powder_spent_mithril ?? 0
        let gemstonePowder = miningCore?.powder_gemstone_total + miningCore?.powder_spent_gemstone ?? 0
        let totalNucleus = miningCore?.crystals?.jade_crystal?.total_placed

        let totalCrystals = Object.keys(miningCore?.crystals ?? {})
            .reduce((accumulative, crystalName) => {
                if(crystalName.startsWith("jasper") || crystalName.startsWith("ruby")) {
                    accumulative[crystalName] = miningCore?.crystals?.[crystalName]?.state
                    return accumulative
                }
                accumulative[crystalName] = miningCore?.crystals?.[crystalName]?.total_placed
                return accumulative
            },  {})
            
        let hotmTree = Object.keys(miningCore?.nodes ?? {})
            .reduce((accumulative, nodeName) => {
                if(nodeName.includes("toggle")) return accumulative
                if(nodeName.includes("special_0")) {
                    accumulative["peak of the mountain"] = miningCore?.nodes?.[nodeName]
                    return accumulative
                }
                accumulative[nodeName] = miningCore?.nodes?.[nodeName]

                return accumulative
            }, {})

        chat(`${PREFIX} ${profileData.rank} ${profileData.username}`)
        breakchat()
        chat(`&aHotM Level&r: ${getColoredHotmLevel(miningCore?.experience)}`)
        hover(`&aTotal Nucleus&r: &6${totalNucleus}`, Object.keys(totalCrystals).map(crystalName => `&a${title(crystalName.replace("_", " "))}&r: &6${totalCrystals[crystalName]}`).join("\n"))
        hover(`&aHotM Perks&r &7(Hover)`, Object.keys(hotmTree).map(nodeName => `&a${title(nodeName.replace("_", " "))}&r: &6${hotmTree[nodeName]}`).join("\n"))
        breakchat()
        chat(`&aMithril Powder&r: &2${shortNumber(mithrilPowder)}`)
        chat(`&aGemstone Powder&r: &d${shortNumber(gemstonePowder)}`)
    })
}).setName("photm")