import { short_number, hover_msg, break_chat, mid_chat, colors, reg_lore } from "./../utils/functions"
import { g_rank, PREFIX, get_player_data, get_profile_id } from "./../utils/cons"
export const hotm_feature = register("command", username => {
    const data = JSON.parse(FileLib.read("./config/ChatTriggers/modules/Player/.playerData.json"))
    var apikey = `${data.api_key}`;
    if(!username){username = Player.getName()}
    if(apikey == null){return mid_chat(`${PREFIX}${colors[1]}Error Invalid Api Key`);}
  g_rank(username,apikey).then(rank_data => {
    let name_ = JSON.parse(rank_data).rank;
    let user_uuid = JSON.parse(rank_data).uuid;
    get_profile_id(user_uuid, null, apikey).then(res => {
      let profile_id = res.profile_id;
    get_player_data(apikey, profile_id).then(mining_data => {
      var pid = user_uuid;
      if(!mining_data.profile.members[pid].mining_core.powder_spent_gemstone){
        var g_powder = 0
      }else{
        var g_powder = mining_data.profile.members[pid].mining_core.powder_spent_gemstone;
      }if(!mining_data.profile.members[pid].mining_core.powder_gemstone_total){
        var g2_powder = 0
      }else{
        var g2_powder = mining_data.profile.members[pid].mining_core.powder_gemstone_total;
      }if(!mining_data.profile.members[pid].mining_core.crystals.jade_crystal.total_placed){
        var crystals = 0
      }else{
        var crystals = mining_data.profile.members[pid].mining_core.crystals.jade_crystal.total_placed;
      }if(!mining_data.profile.members[pid].mining_core.crystals.jade_crystal.total_found){
        var jade = 0
      }else{
        var jade = mining_data.profile.members[pid].mining_core.crystals.jade_crystal.total_found;
      }if(!mining_data.profile.members[pid].mining_core.crystals.amber_crystal.total_found){
        var amber = 0
      }else{
        var amber = mining_data.profile.members[pid].mining_core.crystals.amber_crystal.total_found;
      }if(!mining_data.profile.members[pid].mining_core.crystals.amethyst_crystal.total_found){
        var amethyst = 0
      }else{
        var amethyst = mining_data.profile.members[pid].mining_core.crystals.amethyst_crystal.total_found;
      }if(!mining_data.profile.members[pid].mining_core.crystals.sapphire_crystal.total_found){
        var sapphire = 0
      }else{
        var sapphire = mining_data.profile.members[pid].mining_core.crystals.sapphire_crystal.total_found;
      }if(!mining_data.profile.members[pid].mining_core.crystals.topaz_crystal.total_found){
        var topaz = 0
      }else{
        var topaz = mining_data.profile.members[pid].mining_core.crystals.topaz_crystal.total_found;
      }if(!mining_data.profile.members[pid].mining_core.crystals.jasper_crystal.total_found){
        var jasper = 0
      }else{
        var jasper = mining_data.profile.members[pid].mining_core.crystals.jasper_crystal.total_found;
      }if(!mining_data.profile.members[pid].mining_core.crystals.ruby_crystal.state){
        ruby = null
      }else{
        var ruby = mining_data.profile.members[pid].mining_core.crystals.ruby_crystal.state;
      }if(!mining_data.profile.members[pid].mining_core.powder_spent_mithril){
        var m_powder = 0
      }else{
        var m_powder = mining_data.profile.members[pid].mining_core.powder_spent_mithril;
      }if(!mining_data.profile.members[pid].mining_core.powder_mithril_total){
        var m2_powder = 0
      }else{
        var m2_powder = mining_data.profile.members[pid].mining_core.powder_mithril_total;
      }if(!mining_data.profile.members[pid].mining_core.nodes){
        var m_nodes = null
      }else{
        var m_nodes = mining_data.profile.members[pid].mining_core.nodes;
      }
      var gemstone_powder = short_number(g_powder+g2_powder);
      var mithril_powder = short_number(m_powder+m2_powder);


      var hotm_tree = []
      Object.entries(m_nodes).forEach(([key, value]) => {
        if(key.includes("toggle")){}
        else {
          if(key.includes("special_0")){key = "peak of the mountain"}
            key = reg_lore(key, '_', ' ')
            hotm_tree += `${colors[6]}${key}: ${colors[3]}${value}\n`
          }
      });
      var crystals_result = `${colors[6]}Total Crystal Found\n${colors[5]}Jade: ${colors[3]}${jade}\n${colors[3]}Amber: ${amber}\n${colors[12]}Amethyst: ${colors[3]}${amethyst}\n${colors[7]}Sapphire: ${colors[3]}${sapphire}\n${colors[4]}Topaz: ${colors[3]}${topaz}\n${colors[11]}Jasper: ${colors[3]}${jasper}\n${colors[2]}Ruby Status: ${colors[3]}${ruby}`;

      mid_chat(`${PREFIX} ${name_}`)
      break_chat(5)
      hover_msg(`${colors[6]}Total Nucleus: ${colors[3]}${crystals} `,`${crystals_result}`)
      hover_msg(`${colors[6]}HotM Tree ${colors[15]}(Hover)`,`${hotm_tree}`)
      break_chat(5)
      mid_chat(`${colors[6]}Mithril Powder: ${colors[5]}${mithril_powder}`)
      mid_chat(`${colors[6]}Gemstone Powder: ${colors[11]}${gemstone_powder}`)


    }).catch(function(error) {
    print(error)
    return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Mining Data`);
 });
}).catch(function(error) {
  print(error)
  return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Profile ID`);
});
  }).catch(function(error) {
    print(error)
    return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Data`);
 });
}).setName("photm")