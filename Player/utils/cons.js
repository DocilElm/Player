import request from 'request/index';
import Promise from "../../PromiseV2"
import { 
  short_number, 
  math_number, 
  hover_msg, 
  break_chat,
  mid_chat,
  colors
} from "./functions"
export const PREFIX = "§2[Player] ";

export const get_uuid = (username) => request({url : `https://playerdb.co/api/player/minecraft/${username}`,headers: { 'User-Agent': ' Mozilla/5.0' }}).then(response => JSON.parse(response)).catch(error =>{ print(error);});
export const get_rank = (user_uuid, apikey) => request({url : `https://api.hypixel.net/player?key=${apikey}&uuid=${user_uuid}`,headers: { 'User-Agent': ' Mozilla/5.0' }}).then(response => JSON.parse(response)).catch(error =>{ print(error);});
export const get_blaze = (username, profile_id) => request({url : `https://sky.shiiyu.moe/api/v2/slayers/${username}/${profile_id}`,headers: { 'User-Agent': ' Mozilla/5.0' }}).then(response => JSON.parse(response)).catch(error =>{ print(error);});
export const get_pets = (user_uuid, apikey) => request({url : `https://hypixel-api.senither.com/v1/profiles/${user_uuid}/last_save/?key=${apikey}`,headers: { 'User-Agent': ' Mozilla/5.0' }}).then(response => JSON.parse(response)).catch(error =>{ print(error);});
export const get_dungeons = (user_uuid, apikey) => request({url : `https://hypixel-api.senither.com/v1/profiles/${user_uuid}/last_save/?key=${apikey}`,headers: { 'User-Agent': ' Mozilla/5.0' }}).then(response => JSON.parse(response)).catch(error =>{ print(error);});
export const get_slayers = (user_uuid, apikey) => request({url : `https://hypixel-api.senither.com/v1/profiles/${user_uuid}/last_save/?key=${apikey}`,headers: { 'User-Agent': ' Mozilla/5.0' }}).then(response => JSON.parse(response)).catch(error =>{ print(error);});
export const get_player_data = (apikey, user_uuid) => request({url : `https://api.hypixel.net/skyblock/profile?key=${apikey}&profile=${user_uuid}`,headers: { 'User-Agent': ' Mozilla/5.0' }}).then(response => JSON.parse(response)).catch(error =>{ print(error);});
export const get_profile_id = (user_uuid, apikey) => request({url : `https://hypixel-api.senither.com/v1/profiles/${user_uuid}/last_save/?key=${apikey}`,headers: { 'User-Agent': ' Mozilla/5.0' }}).then(response => JSON.parse(response)).catch(error =>{ print(error);});

export const check_apikey = (apikey) => request({url : `https://api.hypixel.net/key?key=${apikey}`,headers: { 'User-Agent': ' Mozilla/5.0' }}).then(response => JSON.stringify(response)).catch(error =>{ print(error);});

export const g_rank = (username, apikey, val) => new Promise((r) => {
  get_uuid(username).then(uuid_data => {
    let user_uuid = uuid_data.data.player.raw_id;
    let name_ = uuid_data.data.player.username;   
    get_rank(user_uuid, apikey).then(rank_data => {
      let rank = rank_data.player.newPackageRank;
      let plus_plus = rank_data.player.monthlyPackageRank;
      let plus_color = rank_data.player.rankPlusColor;

      if (plus_color == "BLACK"){
        var pcolor = colors[13]
      }else if(plus_color == "DARK_GRAY"){
        var pcolor = colors[14]
      }else if (plus_color == "GOLD"){
        var pcolor = colors[3]
      }else if (plus_color == "WHITE"){
        var pcolor = colors[16]
      }else if (plus_color == "DARK_RED"){
        var pcolor = colors[1]
      }else if (plus_color == "BLUE"){
        var pcolor = colors[10]
      }else if (plus_color == "LIGHT_PURPLE"){
        var pcolor = colors[11]
      }else if (plus_color == "DARK_GREEN"){
        var pcolor = colors[5]
      }else if (plus_color == "DARK_AQUA"){
        var pcolor = colors[8]
      }else if (plus_color == "DARK_PURPLE"){
        var pcolor = colors[12]
      }else if (plus_color == "YELLOW"){
        var pcolor = colors[4]
      }else if (plus_color == "GREEN"){
        var pcolor = colors[6]
      }else if (plus_color == "DARK_BLUE"){
        var pcolor = colors[9]
      }else if (plus_color == "DARK_BLUE"){
        var pcolor = colors[9]
      }


      if(rank == "MVP_PLUS"){                    
        if (plus_plus == "NONE"){ var rank_id = `${colors[7]}[MVP${pcolor}+${colors[7]}]`}
        else if (plus_plus == "SUPERSTAR"){ var rank_id = `${colors[3]}[MVP${pcolor}++${colors[3]}]`}          
        else if (!plus_plus){ var rank_id = `${colors[7]}[MVP${colors[2]}+${colors[7]}]` }
      }else if (rank == "MVP"){
        var rank_id = `${colors[7]}[MVP]`
      }else if (rank == "VIP_PLUS"){ 
        var rank_id = `${colors[6]}[VIP${colors[3]}+${colors[6]}]` 
      }else if (rank == "VIP"){
        var rank_id = `${colors[6]}[VIP]`
      }else if (!rank | !plus_color | !pcolor){
        var rank_id = `${colors[15]}`
      }        
      name_ = `${rank_id} ${name_}`
      let u_data = `{"uuid": "${user_uuid}","rank": "${name_}"}`;
      u_data = JSON.stringify(u_data);
      if(val == "rank"){r([name_])}
      else if(val == "uuid"){r([user_uuid])}
      else if(!val){r([JSON.parse(u_data)])}
    }).catch(error => {
      print(error)
      return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Rank`);
    })
  }).catch(error => {
    print(error)
    return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's UUID`);    
  })  
})