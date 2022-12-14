import { hover_msg, break_chat, mid_chat, colors, lore_loop, reg_lore, short_number, math_number, cata_loop } from "./../utils/functions"
import { g_rank, PREFIX, get_profile_id, slothpixel_api, slothpixel_api_achiev } from "./../utils/cons"
import { drag } from "../utils/petlvl";
import config from "../config";
register("chat", (username, user_class) => {
  if(!config.auto_pf_check) return
    const data = JSON.parse(FileLib.read("./config/ChatTriggers/modules/Player/.playerData.json"))
    var apikey = `${data.api_key}`;
    if(!username){username = Player.getName()}
    if(apikey == null){return mid_chat(`${PREFIX}${colors[1]}Error Invalid Api Key`);}
    g_rank(username,apikey).then(rank_data => {
      let name_ = JSON.parse(rank_data).rank;
      let user_uuid = JSON.parse(rank_data).uuid;
      get_profile_id(user_uuid, null, apikey).then(res => {
        let cute_name = res.cute_name;
        slothpixel_api(username,cute_name).then(inventory_data => {
        var p_inv = inventory_data.members[user_uuid].inventory;
        var p_armor = inventory_data.members[user_uuid].armor;
        var p_pets = inventory_data.members[user_uuid].pets;
        var p_mp = inventory_data.members[user_uuid].talisman_bag
        var p_arrows = inventory_data.members[user_uuid].quiver
        var soul_flow = inventory_data.members[user_uuid].soulflow

        break_chat(5)
        mid_chat(`${PREFIX} ${name_}`)
        break_chat(5)
        var has_items = false
        var has_gyro = false;
        var has_ice_spray = false;
        var mage_has_claymore = false;
        var mage_has_gs = false;
        var mage_class = false;
        Object.entries(p_inv).forEach(([key, value]) => {
          let lore = value.lore;
            if(!lore){}else {
              let i_name = value.name;
              if(i_name.includes("Terminator") || i_name.includes("Necron's Blade") || i_name.includes("Hyperion") || i_name.includes("Valkyrie") || i_name.includes("Scylla") || i_name.includes("Astraea")){
              has_items = true
              var item_name = reg_lore(value.name,'????', '&');
              item_name = reg_lore(item_name,'??????', '???');
              item_name = reg_lore(item_name,'??????', '???');
              item_name = reg_lore(item_name,'???????', '???');
              item_name = reg_lore(item_name,'??????', '???');
              item_name = reg_lore(item_name,'???????', '???');
              item_name = reg_lore(item_name,'??????', '???');
              item_name = reg_lore(item_name,'??????', '???');
              item_name = reg_lore(item_name,'??????', '???');
              lore = lore_loop(lore);
              hover_msg(`${item_name}`,`${item_name}\n${lore}`)
            }
            //
            if(user_class.includes("Mage") || user_class.includes("mage")){
              mage_class = true;
              if(i_name.includes("Giant's Sword")){
                mage_has_gs = true;
                var item_name = reg_lore(value.name,'????', '&');
                item_name = reg_lore(item_name,'??????', '???');
                item_name = reg_lore(item_name,'??????', '???');
                item_name = reg_lore(item_name,'???????', '???');
                item_name = reg_lore(item_name,'??????', '???');
                item_name = reg_lore(item_name,'???????', '???');
                item_name = reg_lore(item_name,'??????', '???');
                item_name = reg_lore(item_name,'??????', '???');
                item_name = reg_lore(item_name,'??????', '???');
                lore = lore_loop(lore);
                hover_msg(`${item_name}`,`${item_name}\n${lore}`)
              }
              if(i_name.includes("Claymore")){
                mage_has_claymore = true
                var item_name = reg_lore(value.name,'????', '&');
                item_name = reg_lore(item_name,'??????', '???');
                item_name = reg_lore(item_name,'??????', '???');
                item_name = reg_lore(item_name,'???????', '???');
                item_name = reg_lore(item_name,'??????', '???');
                item_name = reg_lore(item_name,'???????', '???');
                item_name = reg_lore(item_name,'??????', '???');
                item_name = reg_lore(item_name,'??????', '???');
                item_name = reg_lore(item_name,'??????', '???');
                lore = lore_loop(lore);
                hover_msg(`${item_name}`,`${item_name}\n${lore}`)
              }
            }
            //
            if(i_name.includes("Gyrokinetic Wand")){
              has_gyro = true
              var item_name = reg_lore(value.name,'????', '&');
              item_name = reg_lore(item_name,'??????', '???');
              item_name = reg_lore(item_name,'??????', '???');
              item_name = reg_lore(item_name,'???????', '???');
              item_name = reg_lore(item_name,'??????', '???');
              item_name = reg_lore(item_name,'???????', '???');
              item_name = reg_lore(item_name,'??????', '???');
              item_name = reg_lore(item_name,'??????', '???');
              item_name = reg_lore(item_name,'??????', '???');
              lore = lore_loop(lore);
              hover_msg(`${item_name}`,`${item_name}\n${lore}`)
            }
            if(i_name.includes("Ice Spray Wand")){
              has_ice_spray = true
              var item_name = reg_lore(value.name,'????', '&');
              item_name = reg_lore(item_name,'??????', '???');
              item_name = reg_lore(item_name,'??????', '???');
              item_name = reg_lore(item_name,'???????', '???');
              item_name = reg_lore(item_name,'??????', '???');
              item_name = reg_lore(item_name,'???????', '???');
              item_name = reg_lore(item_name,'??????', '???');
              item_name = reg_lore(item_name,'??????', '???');
              item_name = reg_lore(item_name,'??????', '???');
              lore = lore_loop(lore);
              hover_msg(`${item_name}`,`${item_name}\n${lore}`)
            }
            }
          });
          if(!has_items){mid_chat(`${colors[1]} No Terminator/Or Any Type Of Necron's Blade`);}
          if(!has_gyro){mid_chat(`${colors[1]} No Gyrokinetic Wand`);}
          if(!has_ice_spray){mid_chat(`${colors[1]} No Ice Spray Wand`);}
          if(!mage_has_claymore && mage_class){mid_chat(`${colors[1]} No Dark Claymore`);}
          if(!mage_has_claymore && !mage_has_gs && mage_class){mid_chat(`${colors[1]} No Giant's Sword`);}
          break_chat(5)
          Object.entries(p_armor).forEach(([key, value]) => {
            let lore = value.lore;
              if(!lore){}else {
                var item_name = reg_lore(value.name,'????', '&');
                item_name = reg_lore(item_name,'??????', '???');
                item_name = reg_lore(item_name,'??????', '???');
                item_name = reg_lore(item_name,'???????', '???');
                item_name = reg_lore(item_name,'??????', '???');
                item_name = reg_lore(item_name,'???????', '???');
                item_name = reg_lore(item_name,'??????', '???');
                item_name = reg_lore(item_name,'??????', '???');
                item_name = reg_lore(item_name,'??????', '???');
                lore = lore_loop(lore);
                hover_msg(`${item_name}`,`${item_name}\n${lore}`)
              }
            });
            break_chat(5)
        var has_spirit_pet = false;
        var has_drag_pet = false;
        Object.entries(p_pets).forEach(([key, value]) => {
            let p_name = value.name;
            if(p_name.includes("Spirit")){
              has_spirit_pet = true;
              let p_rarity = value.rarity;
              if(p_rarity == "LEGENDARY"){p_rarity = `${colors[3]}Legendary`}
              else if(p_rarity == "EPIC"){p_rarity = `${colors[12]}Epic`}
              mid_chat(`${colors[6]}Has Spirit Pet: ${colors[3]}True ${colors[6]}Rarity: ${p_rarity}`)
            }
            if(p_name.includes("Golden Dragon")){
              has_drag_pet = true
              let p_rarity = value.rarity;
              let p_lvl = value.level;
              let pxp = value.exp;
              if(pxp > drag.g_drag[100]){
                p_lvl = 200;
              }else{
                pxp = Math.trunc(pxp);
                var petxp = drag.g_drag
                let pet_xp_i = 0;
                while (pet_xp_i < 101) {
                  var check_petxp = petxp[pet_xp_i]
                  if(check_petxp >= pxp && pxp <= check_petxp-1){
                    pet_xp_i -= 1;
                    if (pet_xp_i < 10){p_lvl = `10${pet_xp_i}`;}
                    else if(pet_xp_i > 10){ p_lvl = `1${pet_xp_i}`; }
                    pet_xp_i = 101;
                  }
                  pet_xp_i++;
                }
              }
              if(p_rarity == "LEGENDARY"){var tcolor = colors[3];}
              else if(p_rarity == "EPIC"){var tcolor = colors[12];}
              mid_chat(`${tcolor}[Lvl ${p_lvl}] ${p_name}`)
            }else if(p_name.includes("Ender Dragon")){
              has_drag_pet = true
              let p_rarity = value.rarity;
              let p_lvl = value.level;
              if(p_rarity == "LEGENDARY"){var tcolor = colors[3];}
              else if(p_rarity == "EPIC"){var tcolor = colors[12];}
              mid_chat(`${tcolor}[Lvl ${p_lvl}] ${p_name}`)
            }
          });
          if(!has_spirit_pet){mid_chat(`${colors[6]}Has Spirit Pet: ${colors[1]}False`);}
          if(!has_drag_pet){mid_chat(`${colors[1]}User Does Not Own Any Kind Of Dragon Pet`);}
        break_chat(5)
          let total_mp = 0
          Object.entries(p_mp).forEach(([key, value]) => {
            var t_name = value.name;
            var t_rarity = value.rarity;
            var mp_common = 3;
            var mp_uncommon = 5;
            var mp_rare = 8;
            var mp_epic = 12;
            var mp_legendary = 16;
            var mp_mythic = 22;
            var mp_special = 3;
            var mp_very_special = 5;
            if(!t_name || !t_rarity){}
            else {
              if(t_name.includes("Hegemony Artifact")){
                mp_mythic = mp_mythic*2;
              }
              if(t_rarity == "special"){
                total_mp += mp_special;
              }else if(t_rarity == "very_special"){
                total_mp += mp_very_special
              }
              else if(t_rarity == "mythic"){
                total_mp += mp_mythic;
              }else if(t_rarity == "legendary"){
                total_mp += mp_legendary
              }else if(t_rarity == "epic"){
                total_mp += mp_epic
              }else if(t_rarity == "rare"){
                total_mp += mp_rare
              }else if(t_rarity == "uncommon"){
                total_mp += mp_uncommon
              }else if(t_rarity == "common"){
                total_mp += mp_common
              }
          }
            });
            mid_chat(`${colors[6]}Total Magic Power: ${colors[3]}${short_number(total_mp)}`)
            mid_chat(`${colors[6]}Total Soulflow: ${colors[3]}${short_number(soul_flow)}`)
          let total_arrows = 0
          let arrow_name
          Object.entries(p_arrows).forEach(([key, value]) => {
            var a_name = value.name;
            var a_count = value.count;
            if(!a_name){}
            else{
              short_number(total_arrows += a_count);
              a_name = reg_lore(a_name,'????', '&');
              arrow_name = a_name;
            }
            });
            mid_chat(`${arrow_name}s: ${colors[3]}${short_number(total_arrows)}`)
            break_chat(5)
          slothpixel_api(username, cute_name).then(cata_data => {
            var dungeons = cata_data.members[user_uuid].dungeons;
          slothpixel_api_achiev(username).then(secrets_data =>{
            var secrets_found = secrets_data.games.SkyBlock.tiered["TREASURE_HUNTER"].current_amount;
            var cata_val = dungeons.dungeon_types.catacombs.experience;
            var cata_50 = 569809640;
            //cata
            if (!cata_val) cata_val = null;
            var cata_lvl = cata_loop(cata_val)
            var cata_over_50 = cata_loop(cata_val, 1)
            if(cata_lvl < 50){
              cata_lvl = `${colors[15]}${cata_lvl}`
              cata_val = math_number(cata_val);
              cata_val = short_number(cata_val);
              cata_val = `${colors[6]}Total XP: ${colors[15]}${cata_val}`;
            }
            else if(cata_lvl == 50){
              cata_lvl = `${colors[3]}${cata_lvl}`
              cata_val -= cata_50;
              cata_val = math_number(cata_val);
              cata_val = short_number(cata_val);
              cata_val = `${colors[6]}Overflow XP: ${colors[3]}${cata_val}`;
            }else if(cata_lvl > 50){
              cata_lvl = `${colors[3]}${cata_lvl}`
              cata_val -= cata_over_50;
              cata_val = math_number(cata_val);
              cata_val = short_number(cata_val);
              cata_val = `${colors[6]}Overflow XP: ${colors[3]}${cata_val}`;
            }
            secrets_found = short_number(secrets_found);
            hover_msg(`${colors[1]}Cata: ${cata_lvl}`, `${cata_val}`)
            mid_chat(`${colors[6]}Total Secrets: ${colors[3]}${secrets_found}`)
            break_chat(5)
          }).catch(function(error) {
            print(error)
            return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Secrets Data`);
         });
          }).catch(function(error) {
            print(error)
            return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Cata Data`);
         });
      }).catch(function(error) {
        print(error)
        return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Inventory`);
     });
      }).catch(function(error) {
        print(error)
        return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Profile`);
     });

    }).catch(function(error) {
      print(error)
      return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Data`);
   });
}).setCriteria("Dungeon Finder > ${username} joined the dungeon group! (${user_class} Level ${*})")
export const inventory_feature = register("command", username => {
    const data = JSON.parse(FileLib.read("./config/ChatTriggers/modules/Player/.playerData.json"))
    var apikey = `${data.api_key}`;
    if(!username){username = Player.getName()}
    if(apikey == null){return mid_chat(`${PREFIX}${colors[1]}Error Invalid Api Key`);}
    g_rank(username,apikey).then(rank_data => {
      let name_ = JSON.parse(rank_data).rank;
      let user_uuid = JSON.parse(rank_data).uuid;
      get_profile_id(user_uuid, null, apikey).then(res => {
        let cute_name = res.cute_name;
        slothpixel_api(username,cute_name).then(inventory_data => {
        var p_inv = inventory_data.members[user_uuid].inventory;
        var p_armor = inventory_data.members[user_uuid].armor;

        break_chat(5)
        mid_chat(`${PREFIX} ${name_}`)
        break_chat(5)
        
        Object.entries(p_inv).forEach(([key, value]) => {
          let lore = value.lore;
            if(!lore){}else {
              item_name = reg_lore(value.name,'????', '&');
              item_name = reg_lore(item_name,'??????', '???');
              item_name = reg_lore(item_name,'??????', '???');
              item_name = reg_lore(item_name,'???????', '???');
              item_name = reg_lore(item_name,'??????', '???');
              item_name = reg_lore(item_name,'???????', '???');
              item_name = reg_lore(item_name,'??????', '???');
              item_name = reg_lore(item_name,'??????', '???');
              item_name = reg_lore(item_name,'??????', '???');
              lore = lore_loop(lore);
              hover_msg(`${item_name}`,`${item_name}\n${lore}`)
            }
          });
          break_chat(5)
          mid_chat(`${colors[5]}Armor`)
          break_chat(5)
          Object.entries(p_armor).forEach(([key, value]) => {
            let lore = value.lore;
              if(!lore){}else {
                item_name = reg_lore(value.name,'????', '&');
                item_name = reg_lore(item_name,'??????', '???');
                item_name = reg_lore(item_name,'??????', '???');
                item_name = reg_lore(item_name,'???????', '???');
                item_name = reg_lore(item_name,'??????', '???');
                item_name = reg_lore(item_name,'???????', '???');
                item_name = reg_lore(item_name,'??????', '???');
                item_name = reg_lore(item_name,'??????', '???');
                item_name = reg_lore(item_name,'??????', '???');
                lore = lore_loop(lore);
                hover_msg(`${item_name}`,`${item_name}\n${lore}`)
              }
            });
        break_chat(5)
      }).catch(function(error) {
        print(error)
        return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Inventory`);
     });
      }).catch(function(error) {
        print(error)
        return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Profile`);
     });
  
    }).catch(function(error) {
      print(error)
      return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Data`);
   });
}).setName("pinv")