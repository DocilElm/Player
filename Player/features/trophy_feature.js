import { short_number, hover_msg, break_chat, mid_chat, colors, trophy_loop } from "./../utils/functions"
import { g_rank, PREFIX, get_player_data, get_profile_id } from "./../utils/cons"
export const trophy_feature = register("command", username => {
    const data = JSON.parse(FileLib.read("./config/ChatTriggers/modules/Player/.playerData.json"))
    var apikey = `${data.api_key}`;
    if(!username){username = Player.getName()}
    if(apikey == null){return mid_chat(`${PREFIX}${colors[1]}Error Invalid Api Key`);}
  g_rank(username,apikey).then(rank_data => {
    let name_ = JSON.parse(rank_data).rank;
    let user_uuid = JSON.parse(rank_data).uuid;
    get_profile_id(user_uuid, null, apikey).then(res => {
      let profile_id = res.profile_id;
    get_player_data(apikey, profile_id).then(trophydata => {
      var trophydata = trophydata.profile;
      var pid = user_uuid;

      if(!trophydata.members[pid].trophy_fish){
        return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Trophy Data`);
      }else{
        let total_result = []
        let total_bronze = []
        let total_silver = []
        let total_gold = []
        let total_diamond = []
        var trophyfish = trophydata.members[pid].trophy_fish;
        Object.entries(trophyfish).forEach(([key, value]) => {
          if(key.includes("_bronze")){
            var trophyname = trophy_loop(key, 1)
            total_bronze += `${trophyname} ${colors[14]}BRONZE: ${colors[3]}${short_number(value)}\n`;
          }if(key.includes("_silver")){
            var trophyname = trophy_loop(key, 1)
            total_silver += `${trophyname} ${colors[15]}SILVER: ${colors[3]}${short_number(value)}\n`;
          }if(key.includes("_gold")){
            var trophyname = trophy_loop(key, 1)
            total_gold += `${trophyname} ${colors[3]}GOLD: ${colors[3]}${short_number(value)}\n`;
          }if(key.includes("_diamond")){
            var trophyname = trophy_loop(key, 1)
            total_diamond += `${trophyname} ${colors[7]}DIAMOND: ${colors[3]}${short_number(value)}\n`;
          }if(key.includes("total_caught")){
            var trophyname = trophy_loop(key, 1)
            total_result += `${short_number(value)}`;
          }
        });
        break_chat(5)
        mid_chat(`${PREFIX} ${name_}`)
        break_chat(5)
        hover_msg(`${colors[14]}Bronze ${colors[6]}Trophy Fish ${colors[15]}(Hover)`, `${total_bronze}`)
        hover_msg(`${colors[15]}Silver ${colors[6]}Trophy Fish ${colors[15]}(Hover)`, `${total_silver}`)
        hover_msg(`${colors[3]}Gold ${colors[6]}Trophy Fish ${colors[15]}(Hover)`, `${total_gold}`)
        hover_msg(`${colors[7]}Diamond ${colors[6]}Trophy Fish ${colors[15]}(Hover)`, `${total_diamond}`)
        break_chat(5)
        mid_chat(`${colors[6]}Total Trophy Caught: ${colors[3]}${total_result}`)
        break_chat(5)
      }

    }).catch(function(error) {
      print(error)
      return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Trophy Data`);
   });
      }).catch(function(error) {
        print(error)
        return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Profile ID`);
     });
    }).catch(function(error) {
      print(error)
      return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Data`);
   });
}).setName("ptrophy")