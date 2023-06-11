import { convertToPBTime, title } from "../../BloomCore/utils/Utils"
import { PREFIX, breakchat, chat, coloredClasses, data, getColoredLevel, getNormalPlayerData, hover, mathTrunc, shortNumber } from "../utils/utils"

register("command", (username) => {
    if(!data.key) return chat(`${PREFIX} &cError Invalid Api Key`)

    username = !username ?Player.getName() :username
    getNormalPlayerData(username, (profileData) => {
        const playerProfile = profileData.profileApi?.[0]
        let totalNormalCompletions = 0
        let totalMasterCompletions = 0
        let totalCompletions = 0

        //Gets the class data
        //e.g
        //{
        //  "Archer": [Total XP, Formatted Level]
        //}
        let classData = Object.keys(playerProfile?.dungeons?.player_classes)
            .reduce((accumulative , className) => {
                accumulative[title(className)] = [playerProfile.dungeons.player_classes[className].experience, getColoredLevel("catacombs", playerProfile.dungeons.player_classes[className].experience)]
                return accumulative
            }, {})
            
        //Gets completions data
        //e.g 50 completed Entrance runs
        //{
        //  "Entrance": 50
        //}
        let normalCompletions = Object.keys(playerProfile?.dungeons?.dungeon_types?.catacombs?.tier_completions)
            .reduce((accumulative, floorName) => {
                accumulative[floorName === "0" ?"Entrance" :`F${floorName}`] = playerProfile.dungeons.dungeon_types.catacombs.tier_completions[floorName] ?? 0
            
                return accumulative
            }, {})
        totalNormalCompletions = Object.values(normalCompletions).reduce((c, d) => c+d, 0)

        let masterCompletions = Object.keys(playerProfile?.dungeons?.dungeon_types?.master_catacombs?.tier_completions)
            .reduce((accumulative, floorName) => {
                accumulative[`M${floorName}`] = playerProfile.dungeons.dungeon_types.master_catacombs.tier_completions[floorName] ?? 0
            
                return accumulative
            }, {})
            
        totalMasterCompletions = Object.values(masterCompletions).reduce((c, d) => c+d, 0)

        totalCompletions = totalNormalCompletions+totalMasterCompletions

        //Gets pb data
        //e.g
        //{
        //  "F1": 103160
        //}
        let normalSPB = Object.keys(playerProfile?.dungeons?.dungeon_types?.catacombs?.fastest_time_s)
            .reduce((accumulative, floorName) => {
                accumulative[`F${floorName}`] = playerProfile.dungeons.dungeon_types.catacombs.fastest_time_s[floorName]
                return accumulative
            }, {})
        let normalSPlusPB = Object.keys(playerProfile?.dungeons?.dungeon_types?.catacombs?.fastest_time_s_plus)
            .reduce((accumulative, floorName) => {
                accumulative[`F${floorName}`] = playerProfile.dungeons.dungeon_types.catacombs.fastest_time_s_plus[floorName]
                return accumulative
            }, {})

        let masterSPB = Object.keys(playerProfile?.dungeons?.dungeon_types?.master_catacombs?.fastest_time_s ?? {})
            .reduce((accumulative, floorName) => {
                accumulative[`M${floorName}`] = playerProfile.dungeons.dungeon_types.master_catacombs.fastest_time_s[floorName]
                return accumulative
            }, {})

        let masterSPlusPB = Object.keys(playerProfile?.dungeons?.dungeon_types?.master_catacombs?.fastest_time_s_plus ?? {})
            .reduce((accumulative, floorName) => {
                accumulative[`M${floorName}`] = playerProfile.dungeons.dungeon_types.master_catacombs.fastest_time_s_plus[floorName]
                return accumulative
            }, {})

        //well im too lazy to make a function for this to only return the number lvl
        let classAvg = Object.values(classData).reduce((a, b) => a+(parseFloat(b[1].removeFormatting()) > 50 ?50 :parseFloat(b[1].removeFormatting())), 0)

        chat(`${PREFIX} ${profileData.rank} ${profileData.username}`)
        hover(`&cCata&r: ${getColoredLevel("catacombs", playerProfile.dungeons?.dungeon_types?.catacombs?.experience)}`, `&aTotal XP&r: &6${mathTrunc(playerProfile.dungeons?.dungeon_types?.catacombs?.experience)}`)
        chat(`&aClass Average&r: &6${(classAvg/5).toFixed(2)}`)
        breakchat()
        Object.keys(classData).forEach(a => hover(`${coloredClasses[a]}&r: ${classData[a][1]}&r`, `&aTotal XP&r: &6${mathTrunc(classData[a][0])}`))
        breakchat()
        //not everything is perfect :(
        hover(`&aNormal Floor Completions Total&r: &6${shortNumber(totalNormalCompletions)} &7(Hover)`, Object.keys(normalCompletions).map(floor => `&a${floor}&r: &6${shortNumber(normalCompletions[floor])}`).join("\n"))
        hover(`&4Master &aFloor Completions Total&r: &6${shortNumber(totalMasterCompletions)} &7(Hover)`, Object.keys(masterCompletions).map(floor => `&4${floor}&r: &6${shortNumber(masterCompletions[floor])}`).join("\n"))
        breakchat()
        hover(`&aNormal &dPersonal Best &6S&r &7(Hover)`, Object.keys(normalSPB).map(floor => `&a${floor}&r: &6${convertToPBTime(normalSPB[floor])}`).join("\n"))
        hover(`&4Master &dPersonal Best &6S&r &7(Hover)`, Object.keys(masterSPB).map(floor => `&4${floor}&r: &6${convertToPBTime(masterSPB[floor])}`).join("\n"))
        hover(`&aNormal &dPersonal Best &6S+&r &7(Hover)`, Object.keys(normalSPlusPB).map(floor => `&a${floor}&r: &6${convertToPBTime(normalSPlusPB[floor])}`).join("\n"))
        hover(`&4Master &dPersonal Best &6S+&r &7(Hover)`, Object.keys(masterSPlusPB).map(floor => `&4${floor}&r: &6${convertToPBTime(masterSPlusPB[floor])}`).join("\n"))
        breakchat()
        hover(`&aAverage Secrets&r: &6${(profileData.secrets/totalCompletions).toFixed(2)}`, `&aTotal Completions&r: &6${shortNumber(totalCompletions)}`)
        chat(`&aTotal Secrets&r: &6${shortNumber(profileData.secrets)}`)
    })
}).setName("pcata")