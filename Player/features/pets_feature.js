import { drag } from './../utils/petlvl';
import { short_number, hover_msg, break_chat, mid_chat, colors, pet_loop } from "./../utils/functions"
import { g_rank, PREFIX, get_pets, get_profile_id } from "./../utils/cons"
export const pets_feature = register("command", username => {
    const data = JSON.parse(FileLib.read("./config/ChatTriggers/modules/Player/.playerData.json"))
    var apikey = `${data.api_key}`;
    if(!username){username = Player.getName()}
    if(apikey == null){return mid_chat(`${PREFIX}${colors[1]}Error Invalid Api Key`);}
    g_rank(username,apikey).then(rank_data => {
      let name_ = JSON.parse(rank_data).rank;
      let user_uuid = JSON.parse(rank_data).uuid;
      get_profile_id(user_uuid, null, apikey).then(res => {
        let profile_id = res.profile_id;
        let cute_name = res.cute_name;
        get_pets(username,cute_name).then(pets_data => {
        var total_pets = pets_data.members[user_uuid].pets;
        var pets_length = total_pets.length;
  
        break_chat(5)
        mid_chat(`${PREFIX} ${name_}`)
        break_chat(5)
        mid_chat(`${colors[6]}Total Pets: ${colors[3]}${pets_length}`)
        break_chat(5)
        
        let i = 0;
        while (i < pets_length) {
          let pname = total_pets[i].name;
          let ptier = total_pets[i].rarity;
          let plvl = total_pets[i].level;
          let pxp = total_pets[i].exp;
          let pcandy = total_pets[i].candy_used;
          plvl = Math.trunc(plvl);
  
          if(ptier == "MYTHIC"){var p_lvl_color = colors[11]}
          else if(ptier == "LEGENDARY"){var p_lvl_color = colors[3];}
          else if(ptier == "EPIC"){var p_lvl_color = colors[12];}
          else if(ptier == "RARE"){var p_lvl_color = colors[10];}
          else if(ptier == "UNCOMMON"){var p_lvl_color = colors[6];}
          else if(ptier == "COMMON"){var p_lvl_color = colors[16];}
  
          var tpetxp = Math.trunc(pxp);
          var tpetxp = short_number(tpetxp);
          var helditem = total_pets[i].held_item;
  
          if (helditem == null){
            var hmsg = `${colors[15]} No Held Item\n${p_lvl_color}Total Pet XP: ${tpetxp}`;
          }else{        
          var hname = pet_loop(helditem, 3);
          var hdesc = pet_loop(helditem, 1);
          var htier = pet_loop(helditem, 2);
  
          if(htier == "MYTHIC"){var hcolor = colors[11]}
          else if(htier == "LEGENDARY"){var hcolor = colors[3];}
          else if(htier == "EPIC"){var hcolor = colors[12];}
          else if(htier == "RARE"){var hcolor = colors[10];}
          else if(htier == "UNCOMMON"){var hcolor = colors[6];}
          else if(htier == "COMMON"){var hcolor = colors[16];}
  
          if (pcandy == 0){
            var hmsg = `${hcolor}${hname}\n${hcolor}${htier}\n${hcolor}${hdesc}\n${p_lvl_color}Total Pet XP: ${tpetxp}`;
          }else if(pcandy > 0){
            var hmsg = `${hcolor}${hname}\n${hcolor}${htier}\n${hcolor}${hdesc}\n${p_lvl_color}Total Pet XP: ${tpetxp}\n${colors[2]}Candy Used: ${pcandy}`;
          }
          }
  
          if(pname == "Golden Dragon"){
            if(pxp > drag.g_drag[100]){
              plvl = 200;
            }else{
              pxp = Math.trunc(pxp);
              var petxp = drag.g_drag
              let pet_xp_i = 0;
              while (pet_xp_i < 101) {
                var check_petxp = petxp[pet_xp_i]
                if(check_petxp >= pxp && pxp <= check_petxp-1){
                  pet_xp_i -= 1;
                  if (pet_xp_i < 10){plvl = `10${pet_xp_i}`;}
                  else if(pet_xp_i > 10){ plvl = `1${pet_xp_i}`; }
                  pet_xp_i = 101;
                }
                pet_xp_i++;
              }
            }
          }
          if(ptier == "MYTHIC"){var tcolor = colors[11]}
          else if(ptier == "LEGENDARY"){var tcolor = colors[3];}
          else if(ptier == "EPIC"){var tcolor = colors[12];}
          else if(ptier == "RARE"){var tcolor = colors[10];}
          else if(ptier == "UNCOMMON"){var tcolor = colors[6];}
          else if(ptier == "COMMON"){var tcolor = colors[16];}
          let clean_pname = pname.replace('_', ' ');
          hover_msg(`${tcolor}[Lvl ${plvl}] ${clean_pname}`,`${hmsg}`)
          i++;
        }
        break_chat(5)
      }).catch(function(error) {
        print(error)
        return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Pets`);
     });
      }).catch(function(error) {
        print(error)
        return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Profile`);
     });
  
    }).catch(function(error) {
      print(error)
      return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Data`);
   });
}).setName("ppets")