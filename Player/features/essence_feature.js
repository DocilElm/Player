import { short_number, break_chat, mid_chat, colors } from "./../utils/functions"
import { g_rank, PREFIX, get_player_data, get_profile_id } from "./../utils/cons"
export const essence_feature = register("command", username => {
    const data = JSON.parse(FileLib.read("./config/ChatTriggers/modules/Player/.playerData.json"))
    var apikey = `${data.api_key}`;
    if(!username){username = Player.getName()}
    if(apikey == null){return mid_chat(`${PREFIX}${colors[1]}Error Invalid Api Key`);}
  g_rank(username,apikey).then(rank_data => {
    let name_ = JSON.parse(rank_data).rank;
    let user_uuid = JSON.parse(rank_data).uuid;
    get_profile_id(user_uuid, null, apikey).then(res => {
      let profile_id = res.profile_id;
    get_player_data(apikey, profile_id).then(essencedata => {
      var essencedata = essencedata.profile;
      var pid = user_uuid;
      if(!essencedata.members[pid].essence_undead){
        var undead_ess = 0
      }else{
        var undead_ess = essencedata.members[pid].essence_undead;
      }if(!essencedata.members[pid].essence_crimson){
        var crimson_ess = 0
      }else{
        var crimson_ess = essencedata.members[pid].essence_crimson;
      }if(!essencedata.members[pid].essence_diamond){
        var diamond_ess = 0
      }else{
        var diamond_ess = essencedata.members[pid].essence_diamond;
      }if(!essencedata.members[pid].essence_dragon){
        var dragon_ess = 0
      }else{
        var dragon_ess = essencedata.members[pid].essence_dragon;
      }if(!essencedata.members[pid].essence_gold){
        var gold_ess = 0
      }else{
        var gold_ess = essencedata.members[pid].essence_gold;
      }if(!essencedata.members[pid].essence_ice){
        var ice_ess = 0
      }else{
        var ice_ess = essencedata.members[pid].essence_ice;
      }if(!essencedata.members[pid].essence_wither){
        var wither_ess = 0
      }else{
        var wither_ess = essencedata.members[pid].essence_wither;
      }if(!essencedata.members[pid].essence_spider){
        var spider_ess = 0
      }else{
        var spider_ess = essencedata.members[pid].essence_spider;
      }

      undead_ess = short_number(undead_ess)
      crimson_ess = short_number(crimson_ess)
      diamond_ess = short_number(diamond_ess)
      dragon_ess = short_number(dragon_ess)
      gold_ess = short_number(gold_ess)
      ice_ess = short_number(ice_ess)
      wither_ess = short_number(wither_ess)
      spider_ess = short_number(spider_ess)

      break_chat(5)
      mid_chat(`${PREFIX} ${name_}`)
      break_chat(5)
      mid_chat(`${colors[6]}Undead Essence: ${colors[3]}${undead_ess}`)
      mid_chat(`${colors[6]}Crimson Essence: ${colors[3]}${crimson_ess}`)
      mid_chat(`${colors[6]}Diamond Essence: ${colors[3]}${diamond_ess}`)
      mid_chat(`${colors[6]}Dragon Essence: ${colors[3]}${dragon_ess}`)
      mid_chat(`${colors[6]}Gold Essence: ${colors[3]}${gold_ess}`)
      mid_chat(`${colors[6]}Ice Essence: ${colors[3]}${ice_ess}`)
      mid_chat(`${colors[6]}Wither Essence: ${colors[3]}${wither_ess}`)
      mid_chat(`${colors[6]}Spider Essence: ${colors[3]}${spider_ess}`)
      break_chat(5)

    }).catch(function(error) {
    print(error)
    return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Essence Data`);
 });
}).catch(function(error) {
  print(error)
  return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Profile ID`);
});
  }).catch(function(error) {
    print(error)
    return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Data`);
 });
}).setName("pessence").setAliases("pess")