import request from 'request/index';
import Promise from "../../PromiseV2"
import {
  mid_chat,
  colors
} from "./functions"
export const PREFIX = "§2[Player] ";
export const get_uuid = (username) => request({url : `https://playerdb.co/api/player/minecraft/${username}`,headers: { 'User-Agent': ' Mozilla/5.0' }}).then(response => JSON.parse(response)).catch(error =>{ print(error);});
export const get_rank = (username) => request({url : `https://api.slothpixel.me/api/players/${username}`,headers: { 'User-Agent': ' Mozilla/5.0' }}).then(response => JSON.parse(response)).catch(error =>{ print(error);});
export const get_pets = (username, cute_name) => request({url : `https://api.slothpixel.me/api/skyblock/profile/${username}/${cute_name}`,headers: { 'User-Agent': ' Mozilla/5.0' }}).then(response => JSON.parse(response)).catch(error =>{ print(error);});
export const get_dungeons = (username, cute_name) => request({url : `https://sky.shiiyu.moe/api/v2/dungeons/${username}/${cute_name}`,headers: { 'User-Agent': ' Mozilla/5.0' }}).then(response => JSON.parse(response)).catch(error =>{ print(error);});
export const get_slayers = (apikey, profile_id) => request({url : `https://api.hypixel.net/skyblock/profile?key=${apikey}&profile=${profile_id}`,headers: { 'User-Agent': ' Mozilla/5.0' }}).then(response => JSON.parse(response)).catch(error =>{ print(error);});
export const get_player_data = (apikey, user_uuid) => request({url : `https://api.hypixel.net/skyblock/profile?key=${apikey}&profile=${user_uuid}`,headers: { 'User-Agent': ' Mozilla/5.0' }}).then(response => JSON.parse(response)).catch(error =>{ print(error);});
export const get_profile = (apikey, user_uuid) => request({url : `https://api.hypixel.net/skyblock/profiles?key=${apikey}&uuid=${user_uuid}`,headers: { 'User-Agent': ' Mozilla/5.0' }}).then(response => JSON.parse(response)).catch(error =>{ print(error);});
export const slothpixel_api = (username, cute_name) => request({url : `https://api.slothpixel.me/api/skyblock/profile/${username}/${cute_name}`,headers: { 'User-Agent': ' Mozilla/5.0' }}).then(response => JSON.parse(response)).catch(error =>{ print(error);});
export const check_apikey = (apikey) => request({url : `https://api.hypixel.net/key?key=${apikey}`,headers: { 'User-Agent': ' Mozilla/5.0' }}).then(response => JSON.parse(response)).catch(error =>{ print(error);});
export const get_profile_id = (user_uuid, profiles=null, apikey=null) => {
  const getRecent = (profiles) => !profiles.profiles || !profiles.profiles.length ? null : profiles.profiles.find(a => a.selected) ?? profiles[0]
  if (profiles) return getRecent(profiles)
  return get_profile(apikey, user_uuid).then(profiles => getRecent(profiles)).catch(e => print(`${e}`))
}
export const g_rank = (username) => new Promise((r) => {
  get_uuid(username).then(uuid_data => {
    let user_uuid = uuid_data.data.player.raw_id;
    let name_ = uuid_data.data.player.username;
    get_rank(username).then(rank_data => {
      let rank_id = rank_data.rank_formatted;
      name_ = `${rank_id} ${name_}`
      let u_data = `{"uuid": "${user_uuid}","rank": "${name_}"}`;
      u_data = JSON.stringify(u_data);
      r([JSON.parse(u_data)])
    }).catch(error => {
      print(error)
      return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Rank`);
    })
  }).catch(error => {
    print(error)
    return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's UUID`);    
  })  
})