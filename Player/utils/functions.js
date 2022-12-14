import { cata_xp_lvl } from "./cata";
import { pet_items } from "./pet_items";
import { max_lvl, slayer_xp_lvl } from "./slayer";
import { trophy_names } from "./trophyfish";
export const colors = {
    1: '§4', // Dark Red
    2: '§c', // Red
    3: '§6', // Gold
    4: '§e', // Yellow
    5: '§2', // Dark Green
    6: '§a', // Light Green
    7: '§b', // Aqua
    8: '§3', // Dark Aqua
    9: '§1', // Dark Blue
    10: '§9', // Blue
    11: '§d', // Light Purple
    12: '§5', // Dark Purple
    13: '§0', // Black
    14: '§8', // Dark Gray
    15: '§7', // Gray
    16: '§f' // White
}
export const short_number = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export const math_number = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
}
export const hover_msg = (msg, msg_hover) =>{ 
  return new TextComponent(ChatLib.getCenteredText(`${msg}`)).setHoverValue(`${msg_hover}`).chat();
}
export const break_chat = (id) => {
  return ChatLib.chat(`${colors[id]}${ChatLib.getChatBreak(" ")}`)
}
export const mid_chat = (msg) => {
  return ChatLib.chat(ChatLib.getCenteredText(`${msg}`));
}
export const get_cfloat = (lvl, cxp) =>{
  var cataxp = cata_xp_lvl;
  let lvl_float = `${Math.floor((cxp - cataxp[lvl - 1]) / (cataxp[lvl] - cataxp[lvl - 1]) * 100)}`
  if (lvl_float.length == 1) { lvl_float = `0${lvl_float}`}
  lvl_float = parseFloat(`${lvl-1}.${lvl_float}`)
  return lvl_float;
}
export const slayer_loop = (slayer_xp) =>{
  let slayer_i = 0;
  while (slayer_i < 9) {
    var check_slayer_xp = slayer_xp_lvl[slayer_i];
    if(check_slayer_xp >= slayer_xp && slayer_xp <= check_slayer_xp-1){
      var slayer_lvl_var = slayer_i;
      return slayer_lvl_var;
    }
    else if (slayer_xp > max_lvl.slayer.general){
      var slayer_lvl_var = 9;
      return slayer_lvl_var;
    }
    else if (slayer_xp == max_lvl.slayer.general){
      var slayer_lvl_var = 9;
      return slayer_lvl_var;
    }else if (slayer_xp == 0){
      var slayer_lvl_var = 0;
      return slayer_lvl_var;
    }
    slayer_i++;
  }
}
export const cata_loop = (cata_val, value) =>{
  cxp = Math.trunc(cata_val);
  if(value == 1){
    let exp_i = 0;
    while (exp_i < 101) {
      var check_cxp = cata_xp_lvl[exp_i]
      if(check_cxp >= cxp && cxp <= check_cxp-1){
        let cata_exp = exp_i-1;
        cata_exp = cata_xp_lvl[cata_exp];
        return cata_exp;
      }
      exp_i++;
    }
  }
  let c_i = 0;
  while (c_i < 101) {
    var check_cxp = cata_xp_lvl[c_i]
    if(check_cxp >= cxp && cxp <= check_cxp-1){
      let lvl = c_i
      return get_cfloat(lvl, cxp);
    }
    if (cxp == cata_xp_lvl[50]){
      var cata_lvl = 50      
      return cata_lvl;
    }
    c_i++;    
  }
}
export const pet_loop = (held_item, val) =>{
  if (val == 1){
    let pet_i = 0;
    while (pet_i < 35) {
    var check_pet_item = pet_items.pet_item_name[pet_i];
    if(check_pet_item = held_item){
      var pet_item_var = pet_items.all_pet_items[check_pet_item];
      return pet_item_var;
    }
    pet_i++;
  }

  }else if (val == 2){
    let pet_i = 0;
    while (pet_i < 35) {
    var check_pet_item = pet_items.pet_item_name[pet_i];
    if(check_pet_item = held_item){
      var pet_item_var = pet_items.pet_item_rarity[check_pet_item];
      return pet_item_var;
    }
    pet_i++;
  }

  }else if (val == 3){
    let pet_i = 0;
    while (pet_i < 35) {
    var check_pet_item = pet_items.pet_item_name[pet_i];
    if(check_pet_item = held_item){
      var pet_item_var = pet_items.pet_item_to_name[check_pet_item];
      return pet_item_var;
    }
    pet_i++;
  }

  }
}
export const trophy_loop = (trophy_id, value) =>{
    if(value == 1) {let trophy_i = 0;
    while (trophy_i < 100) {
    var check_trophy_id = trophy_names.trophy_fish[trophy_i];
    if(check_trophy_id = trophy_id){
      var trophy_id_var = trophy_names.trophy_to_names[check_trophy_id];
      return trophy_id_var;
    }
    trophy_i++;
  }
}
  if (value == 2){
    let trophy_i = 0;
    while (trophy_i < 100) {
    var check_trophy_id = trophy_names.trophy_fish[trophy_i];
    if(check_trophy_id = trophy_id){
      var trophy_result = trophy_names.trophy_fish[check_trophy_id];
      trophy_result;
    }
    trophy_i++;
  }
  }
}
export const pb_date = (d) =>{
  var date = new Date(d)
  var [minutes, seconds] = [date.getMinutes(), date.getSeconds()];
  
  if (seconds < 10){
    var seconds = `0${seconds}`
    return `${minutes}:${seconds}`;
  }else {
    return `${minutes}:${seconds}`;
  }
}
export const lore_loop = (lore) => {
  var lore_length = lore.length;
  let lore_i = 0;
  let result = []
  while(lore_i < lore_length){
    result += `${lore[lore_i]}\n`
    if(lore_i == lore_length || lore_i > lore_length || lore_i == lore_length-1){
      let item_lore = reg_lore(result,'Â§', '&');
      item_lore = reg_lore(item_lore,'â—†', '◆');
      item_lore = reg_lore(item_lore,'âš”', '⚔');
      item_lore = reg_lore(item_lore,'âœŽ', '✎');
      item_lore = reg_lore(item_lore,'â��', '❁');
      item_lore = reg_lore(item_lore,'â¦¾', '⦾');
      item_lore = reg_lore(item_lore,'âœ¦', '✦');
      item_lore = reg_lore(item_lore,'â˜£', '☣');
      item_lore = reg_lore(item_lore,'â¸Ž', '⸎');
      item_lore = reg_lore(item_lore,'â¸•', '⸕');
      item_lore = reg_lore(item_lore,'â˜¯', '☯');
      item_lore = reg_lore(item_lore,'â�£', '❣');
      item_lore = reg_lore(item_lore,'â˜', '☠');
      item_lore = reg_lore(item_lore,'â�ˆ', '❈');
      item_lore = reg_lore(item_lore,'Â§', '&');
      item_lore = reg_lore(item_lore,'âœª', '✪');
      item_lore = reg_lore(item_lore,'âžŠ', '➊');
      item_lore = reg_lore(item_lore,'âž‹', '➋');
      item_lore = reg_lore(item_lore,'âžŒ', '➌');
      item_lore = reg_lore(item_lore,'âž�', '➍');
      item_lore = reg_lore(item_lore,'âžŽ', '➎');
      item_lore = reg_lore(item_lore,'âšš', '⚚');
      item_lore = reg_lore(item_lore,'âœ¿', '✿');
      item_lore = item_lore.replace(/(&9)\D+ (VII|7)/g, (match) => item_lore = match.replace('&9','&c'));
      item_lore = item_lore.replace(/(&9)\D+ (VI|6)/g, (match) => item_lore = match.replace('&9','&6'));
      result = item_lore;
      return result;
    }
    lore_i++
  }
}
export const reg_lore = (str,replace,to) => {
  var re = new RegExp(replace, 'g');
  return str.replace(re,to);
}