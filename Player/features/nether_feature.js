import { short_number, hover_msg, break_chat, mid_chat, colors } from "./../utils/functions"
import { g_rank, PREFIX, get_player_data, get_profile_id } from "./../utils/cons"
export const nether_feature = register("command", username => {
    const data = JSON.parse(FileLib.read("./config/ChatTriggers/modules/Player/.playerData.json"))
    var apikey = `${data.api_key}`;
    if(!username){username = Player.getName()}
    if(apikey == null){return mid_chat(`${PREFIX}${colors[1]}Error Invalid Api Key`);}
  g_rank(username,apikey).then(rank_data => {
    let name_ = JSON.parse(rank_data).rank;
    let user_uuid = JSON.parse(rank_data).uuid;
    get_profile_id(user_uuid, null, apikey).then(res => {
      let profile_id = res.profile_id;
    get_player_data(apikey, profile_id).then(netherdata => {
      var netherdata = netherdata.profile;
      var pid = user_uuid;
      if(!netherdata.members[pid].nether_island_player_data.kuudra_completed_tiers){
        var normal_tier = 0
        var hot_tier = 0
      }else{
        var kuudra_comps = netherdata.members[pid].nether_island_player_data.kuudra_completed_tiers;
        var normal_tier = kuudra_comps.none;
        if(!normal_tier) normal_tier = 0;
        var hot_tier = kuudra_comps.hot;
        if(!hot_tier) hot_tier = 0;
      }if(!netherdata.members[pid].nether_island_player_data.dojo){
        var force = 0
        var stamina = 0
        var mastery = 0
        var discipline = 0
        var swiftness = 0
        var tenacity = 0
        var control = 0
      }else{
        var dojo = netherdata.members[pid].nether_island_player_data.dojo;
        var force = dojo.dojo_points_mob_kb;
        if(!force) force = 0.00
        var stamina = dojo.dojo_points_wall_jump;
        if(!stamina) stamina = 0.00
        var mastery = dojo.dojo_points_archer;
        if(!mastery) mastery = 0.00
        var discipline = dojo.dojo_points_sword_swap;
        if(!discipline) discipline = 0.00
        var swiftness = dojo.dojo_points_snake;
        if(!swiftness) swiftness = 0.00
        var tenacity = dojo.dojo_points_fireball;
        if(!tenacity) tenacity = 0.00
        var control = dojo.dojo_points_lock_head;
        if(!control) control = 0.00
        force = short_number(force)
        stamina = short_number(stamina)
        mastery = short_number(mastery)
        discipline = short_number(discipline)
        swiftness = short_number(swiftness)
        tenacity = short_number(tenacity)
        control = short_number(control)
      }if(!netherdata.members[pid].nether_island_player_data.selected_faction){
        var faction = null
        var reputation = null
      }else{
        var faction = netherdata.members[pid].nether_island_player_data.selected_faction;
        var faction_reputation = `${faction}_reputation`;
        var reputation = netherdata.members[pid].nether_island_player_data[faction_reputation];
        if(faction.includes("mages")) faction = `${colors[12]}Mage`;
        if(faction.includes("barbarians")) faction = `${colors[2]}Barbarian`;
        reputation = short_number(reputation)
      }

      break_chat(5)
      mid_chat(`${PREFIX} ${name_}`)
      break_chat(5)
      mid_chat(`${colors[6]}Faction: ${colors[3]}${faction}`)
      mid_chat(`${colors[6]}Faction Reputation: ${colors[3]}${reputation}`)
      break_chat(5)
      mid_chat(`${colors[6]}Normal Kuudra Completions: ${colors[3]}${normal_tier}`)
      mid_chat(`${colors[6]}Hot Kuudra Completions: ${colors[3]}${hot_tier}`)
      break_chat(5)
      hover_msg(`${colors[6]}Dojo ${colors[15]}(Hover)`, `${colors[6]}Dojo Points\n${colors[6]}Test of Force: ${colors[3]}${force}\n${colors[6]}Test of Stamina: ${colors[3]}${stamina}\n${colors[6]}Test of Mastery: ${colors[3]}${mastery}\n${colors[6]}Test of Discipline: ${colors[3]}${discipline}\n${colors[6]}Test of Swiftness: ${colors[3]}${swiftness}\n${colors[6]}Test of Tenacity: ${colors[3]}${tenacity}\n${colors[6]}Test of Control: ${colors[3]}${control}`)
      break_chat(5)
    }).catch(function(error) {
    print(error)
    return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Nether Data`);
 });
    }).catch(function(error) {
      print(error)
      return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Profile ID`);
   });
  }).catch(function(error) {
    print(error)
    return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Data`);
 });
}).setName("pnether")