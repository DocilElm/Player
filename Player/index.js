/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
const File = Java.type("java.io.File");

import request from 'request/index';
import PogObject from "PogData";
import sleep from 'sleep';
import { drag } from './utils/petlvl';
import { max_cata_lvl } from './utils/cata';
import { short_number, math_number, hover_msg, break_chat, mid_chat, colors, slayer_loop, cata_loop, pet_loop } from "./utils/functions"
import { g_rank, PREFIX, check_apikey, get_pets, get_dungeons, get_slayers, get_player_data, get_profile_id } from "./utils/cons"

let data = new PogObject("Player", {  
  api_key: null
}, ".playerData.json");

function fileExists(location) {
  var file = new File(location);
  return file.exists();
}
if (!fileExists("./config/ChatTriggers/modules/Player/.playerData.json")) {  
  data.save()  
  sleep(500, () => {
    help()
    break_chat(5)
    new TextComponent(`${PREFIX} ${colors[6]}Join Our Discord!  &b&nhttps://discord.gg/SK9UDzquEN`).setClickAction("open_url").setClickValue("https://discord.gg/SK9UDzquEN").chat()
    break_chat(5)
  });
}
var apikey = `${data.api_key}`;

register('command', set_api).setCommandName('pset');

register('command', player_data).setCommandName('player');
register('command', player_data).setCommandName('pstats');
register('command', player_data).setCommandName('pskills');

register('command', help).setCommandName('phelp');
register('command', pets_check).setCommandName('ppets');
register('command', cata_data).setCommandName('pcata');
register('command', hotm_data).setCommandName('photm');
register('command', nether_data).setCommandName('pnether');

register('command', essence_data).setCommandName('pessence');
register('command', essence_data).setCommandName('pess');

register('command', slayers_data).setCommandName('pslayers');
register('command', slayers_data).setCommandName('pslayer');

register('command', test).setCommandName('test');

function test(username){
  if(!username){username = Player.getName()}
  /*g_rank(username,apikey).then(rank_data => {
    let name_ = JSON.parse(rank_data).rank;
    let user_uuid = JSON.parse(rank_data).uuid;
    get_profile_id(user_uuid, null, apikey).then(res => {
    let profile_id = res.profile_id;
    let cute_name = res.cute_name;
    print(`${profile_id}\n${cute_name}`)
    });
});*/
  /*const date = new Date(201392);
  //const date = new Date(1664265572751);
  const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
  const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
  print(`${date}\nMonth: ${month}\nDay: ${day}\nYear: ${year}\nHour: ${hour}\nMinutes: ${minutes}\nSeconds: ${seconds}`)
  */
}

register("chat", (key) => {
  data.api_key = key
  data.save()
  mid_chat(`${PREFIX}${colors[6]}Api Key Successfully Set!`);    
  mid_chat(`${PREFIX}${colors[5]}Please Do /ct reload`);
}).setCriteria(/Your new API key is (.+)/)

function set_api(api_key_set){
  if (!api_key_set){return mid_chat(`${PREFIX}${colors[1]}Error No Api Key Sent`);}  

  check_apikey(api_key_set).then(api_data => {
     let aa = JSON.parse(api_data)
     if (aa.includes("true")){
       data.api_key = api_key_set;
       data.save();        
       mid_chat(`${PREFIX}${colors[6]}Api Key Successfully Set!`);    
       mid_chat(`${PREFIX}${colors[5]}Please Do /ct reload`);
     }
   }).catch(function(error) {
     print(`Api Error: ${error}`)
     data.api_key = null;
     data.save();
     return mid_chat(`${PREFIX}${colors[1]}Error Invalid Api Key`);
  });  
}

function help(){
  break_chat(5)
  mid_chat(`${PREFIX}${colors[5]}All Commands`);
  break_chat(5)
  mid_chat(`${colors[6]}/pset <Value> | Sets The Api Key`);
  mid_chat(`${colors[3]}/player <Username> ${colors[6]}| Checks Player's Stats`);
  mid_chat(`${colors[3]}/pstats <Username> ${colors[6]}| Checks Player's Stats`);
  mid_chat(`${colors[3]}/pskills <Username> ${colors[6]}| Checks Player's Stats`);
  mid_chat(`${colors[11]}/ppets <Username> ${colors[6]}| Checks Player's Pets`);
  mid_chat(`${colors[1]}/pcata <Username> ${colors[6]}| Checks Player's Cata`);
  mid_chat(`${colors[7]}/pslayers <Username> ${colors[6]}| Checks Player's Slayers`);
  mid_chat(`${colors[7]}/pslayer <Username> ${colors[6]}| Checks Player's Slayers`);
  mid_chat(`${colors[12]}/photm <Username> ${colors[6]}| Checks Player's Mining Data`);
  mid_chat(`${colors[15]}/pessence <Username> ${colors[6]}| Checks Player's Essence Data`);
  mid_chat(`${colors[15]}/pess <Username> ${colors[6]}| Checks Player's Essence Data`);
  mid_chat(`${colors[10]}/pnether <Username> ${colors[6]}| Checks Player's Nether Data`);
  mid_chat(`${colors[6]}/phelp | Gives A List Of All The Commands`);
  break_chat(5)
  new TextComponent(`${PREFIX} ${colors[6]}Join Our Discord!  &b&nhttps://discord.gg/SK9UDzquEN`).setClickAction("open_url").setClickValue("https://discord.gg/SK9UDzquEN").chat()
  break_chat(5)
}

function player_data(username) {  
  if(!username){username = Player.getName()}
  g_rank(username,apikey).then(rank_data => {
    let name_ = JSON.parse(rank_data).rank;
    let user_uuid = JSON.parse(rank_data).uuid;
    get_profile_id(user_uuid, null, apikey).then(res => {
      let profile_id = res.profile_id;
      let cute_name = res.cute_name;
    request({
      url : `https://api.slothpixel.me/api/skyblock/profile/${username}/${cute_name}`,
      headers: { 'User-Agent': ' Mozilla/5.0' }
     })
      .then(function(response) {
          get_slayers(apikey,profile_id).then(slayer_data => {
          var skills = JSON.parse(response).members[user_uuid].skills;          
          var dungeons = JSON.parse(response).members[user_uuid].dungeons;
          var slayers = slayer_data.profile.members[user_uuid].slayer_bosses;
          if(!skills.combat){
            var combat = null;
          }else{
            var combat = skills.combat.floatLevel.toFixed(2);
            var combat_val = skills.combat.xp;
          } if(!skills.farming){
            var farming = null;
          }else{
            var farming = skills.farming.floatLevel.toFixed(2);
            var farming_val = skills.farming.xp;
          } if(!skills.enchanting){
            var enchanting = null;
          }else{
            var enchanting = skills.enchanting.floatLevel.toFixed(2);
            var enchanting_val = skills.enchanting.xp;
          } if(!skills.mining){
            var mining = null;
          }else{
            var mining = skills.mining.floatLevel.toFixed(2);
            var mining_val = skills.mining.xp;
          } if(!skills.foraging){
            var foraging = null;
          }else{
            var foraging = skills.foraging.floatLevel.toFixed(2);
            var foraging_val = skills.foraging.xp;
          } if(!skills.fishing){
            var fishing = null;
          }else{
            var fishing = skills.fishing.floatLevel.toFixed(2);
            var fishing_val = skills.fishing.xp;
          } if(!skills.taming){
            var taming = null;
          }else{
            var taming = skills.taming.floatLevel.toFixed(2);
            var taming_val = skills.taming.xp;
          } if(!skills.carpentry){
            var carpentry = null;
          }else{
            var carpentry = skills.carpentry.floatLevel.toFixed(2);
            var carpentry_val = skills.carpentry.xp;
          } if(!skills.runecrafting){
            var runecrafting = null;
          }else{
            var runecrafting = skills.runecrafting.floatLevel.toFixed(2);
            var runecrafting_val = skills.runecrafting.xp;
          } if(!skills.alchemy){
            var alchemy = null;
          }else{
            var alchemy = skills.alchemy.floatLevel.toFixed(2);
            var alchemy_val = skills.alchemy.xp;
          }
           var skill_average = JSON.parse(response).members[user_uuid].average_skill_level.toFixed(2);

           var lvl_60 = 111672425;
           var lvl_50 = 55172425;
           var lvl_25 = 94500;
           
           //skills
           if (skill_average < 55){skill_average = `${colors[15]}${skill_average}`}
           else if(skill_average == 55){skill_average = `${colors[3]}${skill_average}`}
           
           if(combat < 60){
             combat = `${colors[15]}${combat}`
             combat_val = math_number(combat_val);
             combat_val = short_number(combat_val);
             combat_val = `${colors[6]}Total XP: ${colors[15]}${combat_val}`;
           }
           else if(combat == 60){
             combat = `${colors[3]}${combat}`
             combat_val -= lvl_60;     
             combat_val = math_number(combat_val);
             combat_val = short_number(combat_val);
             combat_val = `${colors[6]}Overflow XP: ${colors[3]}${combat_val}`;
           }
          
           if(mining < 60){
             mining = `${colors[15]}${mining}`
             mining_val = math_number(mining_val);
             mining_val = short_number(mining_val);
             mining_val = `${colors[6]}Total XP: ${colors[15]}${mining_val}`;
           }
           else if(mining == 60){
             mining = `${colors[3]}${mining}`
             mining_val -= lvl_60;     
             mining_val = math_number(mining_val);
             mining_val = short_number(mining_val);
             mining_val = `${colors[6]}Overflow XP: ${colors[3]}${mining_val}`;
           }
          
           if(farming < 60){
             farming = `${colors[15]}${farming}`
             farming_val = math_number(farming_val);
             farming_val = short_number(farming_val);
             farming_val = `${colors[6]}Total XP: ${colors[15]}${farming_val}`;
           }
           else if(farming == 60){
             farming = `${colors[3]}${farming}`
             farming_val -= lvl_60;     
             farming_val = math_number(farming_val);
             farming_val = short_number(farming_val);
             farming_val = `${colors[6]}Overflow XP: ${colors[3]}${farming_val}`;
           }
          
           if(enchanting < 60){
             enchanting = `${colors[15]}${enchanting}`
             enchanting_val = math_number(enchanting_val);
             enchanting_val = short_number(enchanting_val);
             enchanting_val = `${colors[6]}Total XP: ${colors[15]}${enchanting_val}`;
           }
           else if(enchanting == 60){
             enchanting = `${colors[3]}${enchanting}`
             enchanting_val -= lvl_60;     
             enchanting_val = math_number(enchanting_val);
             enchanting_val = short_number(enchanting_val);
             enchanting_val = `${colors[6]}Overflow XP: ${colors[3]}${enchanting_val}`;
           }
          
           if(foraging < 50){
             foraging = `${colors[15]}${foraging}`
             foraging_val = math_number(foraging_val);
             foraging_val = short_number(foraging_val);
             foraging_val = `${colors[6]}Total XP: ${colors[15]}${foraging_val}`;
           }
           else if(foraging == 50){
             foraging = `${colors[3]}${foraging}`
             foraging_val -= lvl_50;     
             foraging_val = math_number(foraging_val);
             foraging_val = short_number(foraging_val);
             foraging_val = `${colors[6]}Overflow XP: ${colors[3]}${foraging_val}`;
           }
          
           if(fishing < 50){
             fishing = `${colors[15]}${fishing}`
             fishing_val = math_number(fishing_val);
             fishing_val = short_number(fishing_val);
             fishing_val = `${colors[6]}Total XP: ${colors[15]}${fishing_val}`;
           }
           else if(fishing == 50){
             fishing = `${colors[3]}${fishing}`
             fishing_val -= lvl_50;     
             fishing_val = math_number(fishing_val);
             fishing_val = short_number(fishing_val);
             fishing_val = `${colors[6]}Overflow XP: ${colors[3]}${fishing_val}`;
           }
          
           if(alchemy < 50){
             alchemy = `${colors[15]}${alchemy}`
             alchemy_val = math_number(alchemy_val);
             alchemy_val = short_number(alchemy_val);
             alchemy_val = `${colors[6]}Total XP: ${colors[15]}${alchemy_val}`;
           }
           else if(alchemy == 50){
             alchemy = `${colors[3]}${alchemy}`
             alchemy_val -= lvl_50;     
             alchemy_val = math_number(alchemy_val);
             alchemy_val = short_number(alchemy_val);
             alchemy_val = `${colors[6]}Overflow XP: ${colors[3]}${alchemy_val}`;
           }
          
           if(taming < 50){
             taming = `${colors[15]}${taming}`
             taming_val = math_number(taming_val);
             taming_val = short_number(taming_val);
             taming_val = `${colors[6]}Total XP: ${colors[15]}${taming_val}`;
           }
           else if(taming == 50){
             taming = `${colors[3]}${taming}`
             taming_val -= lvl_50;     
             taming_val = math_number(taming_val);
             taming_val = short_number(taming_val);
             taming_val = `${colors[6]}Overflow XP: ${colors[3]}${taming_val}`;
           }
          
           if(carpentry < 50){
             carpentry = `${colors[15]}${carpentry}`
             carpentry_val = math_number(carpentry_val);
             carpentry_val = short_number(carpentry_val);
             carpentry_val = `${colors[6]}Total XP: ${colors[15]}${carpentry_val}`;
           }      
           else if(carpentry == 50){
             carpentry = `${colors[3]}${carpentry}`
             carpentry_val -= lvl_50;     
             carpentry_val = math_number(carpentry_val);
             carpentry_val = short_number(carpentry_val);
             carpentry_val = `${colors[6]}Overflow XP: ${colors[3]}${carpentry_val}`;
           }
          
           if(runecrafting < 24){
             runecrafting = `${colors[15]}${runecrafting}`
             runecrafting_val = math_number(runecrafting_val);
             runecrafting_val = short_number(runecrafting_val);
             runecrafting_val = `${colors[6]}Total XP: ${colors[15]}${runecrafting_val}`;
           }
           else if(runecrafting == 25){
             runecrafting = `${colors[3]}${runecrafting}`
             runecrafting_val -= lvl_25;     
             runecrafting_val = math_number(runecrafting_val);
             runecrafting_val = short_number(runecrafting_val);
             runecrafting_val = `${colors[6]}Overflow XP: ${colors[3]}${runecrafting_val}`;
           }
          //coiner
          var purse = JSON.parse(response).members[user_uuid].coin_purse;
          var bank = JSON.parse(response).banking.balance;
          purse = Math.trunc(purse);
          purse = short_number(purse);
          bank = Math.trunc(bank);
          bank = short_number(bank);
          //          
          var cata_val = dungeons.dungeon_types.catacombs.experience;
          var cata_50 = 569809640;          
          //cata
          if (!cata_val){
            cata_lvl = null;
            cata_val = null;
          }else {
            var cata_lvl = cata_loop(cata_val)
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
            }  
          }           
          //slayers
          var rev_xp = slayers.zombie.xp;
          var tara_xp = slayers.spider.xp;
          var sven_xp = slayers.wolf.xp;
          var eman_xp = slayers.enderman.xp;
          var blaze_xp = slayers.blaze.xp;
          if(!rev_xp){
            rev_xp = null;
            rev_lvl = null;
          }else{
            var rev_lvl = slayer_loop(rev_xp);
            rev_xp = short_number(rev_xp);
            if(rev_lvl < 9){rev_xp = `${colors[15]}${rev_xp}`}
            else if(rev_lvl == 9){rev_xp = `${colors[3]}${rev_xp}`}
          } if(!tara_xp){
            tara_xp = null;
            tara_lvl = null;
          }else{
            var tara_lvl = slayer_loop(tara_xp);
            tara_xp = short_number(tara_xp);
            if(tara_lvl < 9){tara_xp = `${colors[15]}${tara_xp}`}
            else if(tara_lvl == 9){tara_xp = `${colors[3]}${tara_xp}`}
          } if(!sven_xp){
            sven_xp = null;
            sven_lvl = null;
          }else{
            var sven_lvl = slayer_loop(sven_xp);
            sven_xp = short_number(sven_xp);
            if(sven_lvl < 9){sven_xp = `${colors[15]}${sven_xp}`}
            else if(sven_lvl == 9){sven_xp = `${colors[3]}${sven_xp}`}
          } if(!eman_xp){
            eman_xp = null;
            eman_lvl = null;
          }else{
            var eman_lvl = slayer_loop(eman_xp);
            eman_xp = short_number(eman_xp);
            if(eman_lvl < 9){eman_xp = `${colors[15]}${eman_xp}`}
            else if(eman_lvl == 9){eman_xp = `${colors[3]}${eman_xp}`}
          } if(!blaze_xp){
            blaze_xp = null;
            blaze_lvl = null;
          }else{
            var blaze_lvl = slayer_loop(blaze_xp);
            blaze_xp = short_number(blaze_xp);
            if(blaze_lvl < 9){blaze_xp = `${colors[15]}${blaze_xp}`}
            else if(blaze_lvl == 9){blaze_xp = `${colors[3]}${blaze_xp}`}
          }

          var color = colors[6];
          break_chat(5)
          mid_chat(`${PREFIX} ${name_}`)
          mid_chat(`${color}Skill Average: ${skill_average}`)
          hover_msg(`${color}Combat: ${combat}`,`${combat_val}`)
          hover_msg(`${color}Mining: ${mining}`,`${mining_val}`)
          hover_msg(`${color}Farming: ${farming}`,`${farming_val}`)
          hover_msg(`${color}Foraging: ${foraging}`,`${foraging_val}`)
          hover_msg(`${color}Fishing: ${fishing}`,`${fishing_val}`)
          hover_msg(`${color}Enchanting: ${enchanting}`,`${enchanting_val}`)
          hover_msg(`${color}Taming: ${taming}`,`${taming_val}`)
          hover_msg(`${color}Alchemy: ${alchemy}`,`${alchemy_val}`)
          hover_msg(`${color}Carpentry: ${carpentry}`,`${carpentry_val}`)
          hover_msg(`${color}Runecrafting: ${runecrafting}`,`${runecrafting_val}`)
          break_chat(5)
          hover_msg(`${colors[1]}Cata: ${cata_lvl}`,`${cata_val}`)
          break_chat(5)
          mid_chat(`${colors[5]}Revenant Slayer ${rev_lvl}: ${rev_xp}`)
          mid_chat(`${colors[1]}Tarantula Slayer ${tara_lvl}: ${tara_xp}`)
          mid_chat(`${colors[14]}Sven Slayer ${sven_lvl}: ${sven_xp}`)
          mid_chat(`${colors[12]}Enderman Slayer ${eman_lvl}: ${eman_xp}`)
          mid_chat(`${colors[3]}Blaze Slayer ${blaze_lvl}: ${blaze_xp}`)
          break_chat(5)
          mid_chat(`${color}Purse: ${colors[3]}${purse}`)
          mid_chat(`${color}Bank: ${colors[3]}${bank}`)
          break_chat(5)
       }).catch(function(error) {
         print(error)
         return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Slayer`);
      });
      })
      .catch(function(error) {
         print(error)
         return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Stats`);
      });
    })
    .catch(function(error) {
       print(error)
       return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Profile`);
    });
  }).catch(function(error) {
    print(error)
    return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Data`);
 });
}

function pets_check(username){
  if(!username){username = Player.getName()}
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
      mid_chat(`${colors[6]}Total Pets: ${colors[3]}${pets_length}`)
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
}

function cata_data(username){
  if(!username){username = Player.getName()}
  g_rank(username,apikey).then(rank_data => {
    let name_ = JSON.parse(rank_data).rank;
    let user_uuid = JSON.parse(rank_data).uuid;
    get_profile_id(user_uuid, null, apikey).then(res => {
      let profile_id = res.profile_id;
      let cute_name = res.cute_name;
    get_dungeons(username, cute_name).then(cata_ =>{
      var cdata = cata_.dungeons;
      var secrets_found = cdata.secrets_found;
      var catacombs_lvl = cdata.catacombs.level.levelWithProgress.toFixed(2);      
      var catacombs_xp = cdata.catacombs.level.xp;
      var normal_comps = cdata.catacombs.floors;
      var master_comps = cdata.master_catacombs.floors;

      //classes
      var healer = cdata.classes.healer.experience;
      var mage = cdata.classes.mage.experience;
      var berserker = cdata.classes.berserk.experience;
      var archer = cdata.classes.archer.experience;
      var tank = cdata.classes.tank.experience;

      //healer
      var healer_lvl = healer.levelWithProgress.toFixed(2);
      var healer_xp = healer.xp;
      //mage
      var mage_lvl = mage.levelWithProgress.toFixed(2);;
      var mage_xp = mage.xp;
      //berserker
      var berserker_lvl = berserker.levelWithProgress.toFixed(2);
      var berserker_xp = berserker.xp;
      //archer
      var archer_lvl = archer.levelWithProgress.toFixed(2);
      var archer_xp = archer.xp;
      //tank
      var tank_lvl = tank.levelWithProgress.toFixed(2);
      var tank_xp = tank.xp;

      var average_class = (healer.levelWithProgress + mage.levelWithProgress + berserker.levelWithProgress + archer.levelWithProgress + tank.levelWithProgress);      
      average_class = average_class / 5;
      average_class = average_class.toFixed(2);

      if(catacombs_lvl < 50){
        catacombs_lvl = `${colors[15]}${catacombs_lvl}`
        catacombs_xp = math_number(catacombs_xp);
        catacombs_xp = short_number(catacombs_xp);
        catacombs_xp = `${colors[6]}Total XP: ${colors[15]}${catacombs_xp}`;
      }
      else if(catacombs_lvl == 50){
        catacombs_lvl = `${colors[3]}${catacombs_lvl}`
        catacombs_xp -= max_cata_lvl.max_cata[50];
        catacombs_xp = math_number(catacombs_xp);
        catacombs_xp = short_number(catacombs_xp);
        catacombs_xp = `${colors[6]}Overflow XP: ${colors[3]}${catacombs_xp}`;
      }
      //classes color
      if(healer_lvl < 50){
        healer_lvl = `${colors[15]}${healer_lvl}`
        healer_xp = math_number(healer_xp);
        healer_xp = short_number(healer_xp);
        healer_xp = `${colors[6]}Total XP: ${colors[15]}${healer_xp}`;
      }
      else if(healer_lvl == 50){
        healer_lvl = `${colors[3]}${healer_lvl}`
        healer_xp -= max_cata_lvl.max_class[50];
        healer_xp = math_number(healer_xp);
        healer_xp = short_number(healer_xp);
        healer_xp = `${colors[6]}Overflow XP: ${colors[3]}${healer_xp}`;
      }
      //
      if(mage_lvl < 50){
        mage_lvl = `${colors[15]}${mage_lvl}`
        mage_xp = math_number(mage_xp);
        mage_xp = short_number(mage_xp);
        mage_xp = `${colors[6]}Total XP: ${colors[15]}${mage_xp}`;
      }
      else if(mage_lvl == 50){
        mage_lvl = `${colors[3]}${mage_lvl}`
        mage_xp -= max_cata_lvl.max_class[50];
        mage_xp = math_number(mage_xp);
        mage_xp = short_number(mage_xp);
        mage_xp = `${colors[6]}Overflow XP: ${colors[3]}${mage_xp}`;
      }
      //
      if(berserker_lvl < 50){
        berserker_lvl = `${colors[15]}${berserker_lvl}`
        berserker_xp = math_number(berserker_xp);
        berserker_xp = short_number(berserker_xp);
        berserker_xp = `${colors[6]}Total XP: ${colors[15]}${berserker_xp}`;
      }
      else if(berserker_lvl == 50){
        berserker_lvl = `${colors[3]}${berserker_lvl}`
        berserker_xp -= max_cata_lvl.max_class[50];
        berserker_xp = math_number(berserker_xp);
        berserker_xp = short_number(berserker_xp);
        berserker_xp = `${colors[6]}Overflow XP: ${colors[3]}${berserker_xp}`;
      }
      //
      if(archer_lvl < 50){
        archer_lvl = `${colors[15]}${archer_lvl}`
        archer_xp = math_number(archer_xp);
        archer_xp = short_number(archer_xp);
        archer_xp = `${colors[6]}Total XP: ${colors[15]}${archer_xp}`;
      }
      else if(archer_lvl == 50){
        archer_lvl = `${colors[3]}${archer_lvl}`
        archer_xp -= max_cata_lvl.max_class[50];
        archer_xp = math_number(archer_xp);
        archer_xp = short_number(archer_xp);
        archer_xp = `${colors[6]}Overflow XP: ${colors[3]}${archer_xp}`;
      }
      //
      if(tank_lvl < 50){
        tank_lvl = `${colors[15]}${tank_lvl}`
        tank_xp = math_number(tank_xp);
        tank_xp = short_number(tank_xp);
        tank_xp = `${colors[6]}Total XP: ${colors[15]}${tank_xp}`;
      }
      else if(tank_lvl == 50){
        tank_lvl = `${colors[3]}${tank_lvl}`
        tank_xp -= max_cata_lvl.max_class[50];
        tank_xp = math_number(tank_xp);
        tank_xp = short_number(tank_xp);
        tank_xp = `${colors[6]}Overflow XP: ${colors[3]}${tank_xp}`;
      }
      //Total completions
      if(!normal_comps){
        var entrance = 0
        var f1 = 0
        var f2 = 0
        var f3 = 0
        var f4 = 0
        var f5 = 0
        var f6 = 0
        var f7 = 0
      }else{
        if(!normal_comps[0]){
          var entrance = 0
        }else{
          var entrance = normal_comps[0].stats.tier_completions;
        }
        if(!normal_comps[1]){
          var f1 = 0
        }else{
          var f1 = normal_comps[1].stats.tier_completions;
        } if(!normal_comps[2]){
          var f2 = 0
        }else{
          var f2 = normal_comps[2].stats.tier_completions;
        } if(!normal_comps[3]){
          var f3 = 0
        }else{
          var f3 = normal_comps[3].stats.tier_completions;
        } if(!normal_comps[4]){
          var f4 = 0
        }else{
          var f4 = normal_comps[4].stats.tier_completions;
        } if(!normal_comps[5]){
          var f5 = 0
        }else{
          var f5 = normal_comps[5].stats.tier_completions;
        } if(!normal_comps[6]){
          var f6 = 0
        }else{
          var f6 = normal_comps[6].stats.tier_completions;
        } if(!normal_comps[7]){
          var f7 = 0
        }else{
          var f7 = normal_comps[7].stats.tier_completions;
        }
      }

      if(!master_comps){
        var m1 = 0
        var m2 = 0
        var m3 = 0
        var m4 = 0
        var m5 = 0
        var m6 = 0
        var m7 = 0
      }else{
        if(!master_comps[1]){
          var m1 = 0
        }else{
          var m1 = master_comps[1].stats.tier_completions;
        } if(!master_comps[2]){
          var m2 = 0
        }else{
          var m2 = master_comps[2].stats.tier_completions;
        } if(!master_comps[3]){
          var m3 = 0
        }else{
          var m3 = master_comps[3].stats.tier_completions;
        } if(!master_comps[4]){
          var m4 = 0
        }else{
          var m4 = master_comps[4].stats.tier_completions;
        } if(!master_comps[5]){
          var m5 = 0
        }else{
          var m5 = master_comps[5].stats.tier_completions;
        } if(!master_comps[6]){
          var m6 = 0
        }else{
          var m6 = master_comps[6].stats.tier_completions;
        } if(!master_comps[7]){
          var m7 = 0
        }else{
          var m7 = master_comps[7].stats.tier_completions;
        }
      }
      
      var total_runs = (
        entrance+f1+f2+f3+f4+f5+f6+f7+m1+m2+m3+m4+m5+m6+m7
      );
      var average_secrets = secrets_found / total_runs;
      average_secrets = average_secrets.toFixed(2);
      average_secrets = short_number(average_secrets);
      secrets_found = short_number(secrets_found);
      //
      var total_normal_val = (
        entrance+f1+f2+f3+f4+f5+f6+f7
      );
      var total_master_val = (
        m1+m2+m3+m4+m5+m6+m7
      );
      var normal_comps_val = `${colors[6]}Total Completions\n${colors[6]}Entrance: ${entrance}\n${colors[6]}Floor 1: ${f1}\n${colors[6]}Floor 2: ${f2}\n${colors[6]}Floor 3: ${f3}\n${colors[6]}Floor 4: ${f4}\n${colors[6]}Floor 5: ${f5}\n${colors[6]}Floor 6: ${f6}\n${colors[6]}Floor 7: ${f7}\n${colors[6]}Total Runs: ${total_normal_val}`;
      var master_comps_val = `${colors[6]}Total ${colors[1]}Master ${colors[6]}Completions\n${colors[1]}Master ${colors[6]}Floor 1: ${m1}\n${colors[1]}Master ${colors[6]}Floor 2: ${m2}\n${colors[1]}Master ${colors[6]}Floor 3: ${m3}\n${colors[1]}Master ${colors[6]}Floor 4: ${m4}\n${colors[1]}Master ${colors[6]}Floor 5: ${m5}\n${colors[1]}Master ${colors[6]}Floor 6: ${m6}\n${colors[1]}Master ${colors[6]}Floor 7: ${m7}\n${colors[6]}Total Runs: ${total_master_val}`;

      break_chat(5)
      mid_chat(`${PREFIX} ${name_}`)
      break_chat(5)
      hover_msg(`${colors[1]}Cata: ${catacombs_lvl}`, `${catacombs_xp}`)
      mid_chat(`${colors[6]}Class Average: ${average_class}`)
      break_chat(5)
      hover_msg(`${colors[3]}☣ Archer: ${archer_lvl}`,`${archer_xp}`)
      hover_msg(`${colors[7]}✎ Mage: ${mage_lvl}`,`${mage_xp}`)
      hover_msg(`${colors[2]}⚔ Berserker: ${berserker_lvl}`,`${berserker_xp}`)
      hover_msg(`${colors[6]}❤ Healer: ${healer_lvl}`,`${healer_xp}`)
      hover_msg(`${colors[15]}❈ Tank: ${tank_lvl}`,`${tank_xp}`)
      break_chat(5)
      hover_msg(`${colors[6]}Normal Floor Completions ${colors[15]}(Hover)`,`${normal_comps_val}`)
      hover_msg(`${colors[1]}Master ${colors[6]}Floor Completions ${colors[15]}(Hover)`,`${master_comps_val}`)
      break_chat(5)
      mid_chat(`${colors[6]}Average Secrets: ${colors[3]}${average_secrets}`)
      mid_chat(`${colors[6]}Total Secrets: ${colors[3]}${secrets_found}`)

    }).catch(function(error) {
    print(error)
    return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Cata Data`);
    });
    }).catch(function(error) {
    print(error)
    return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Profile`);
 });
  }).catch(function(error) {
    print(error)
    return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Data`);
 });
}

function slayers_data(username){
  if(!username){username = Player.getName()}
  g_rank(username,apikey).then(rank_data => {
    let name_ = JSON.parse(rank_data).rank;
    let user_uuid = JSON.parse(rank_data).uuid;
    get_profile_id(user_uuid, null, apikey).then(res => {
      let profile_id = res.profile_id;
      let cute_name = res.cute_name;
      get_slayers(apikey,profile_id).then(slayer_data => {
            var slayers = slayer_data.profile.members[user_uuid].slayer_bosses;
            if (!slayers){return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Slayers`);}
            /*
            yes i copy pasted this from player_data function
            leave me alone
            */
            //rev
            var rev_xp = slayers.zombie.xp;
            var tara_xp = slayers.spider.xp;
            var sven_xp = slayers.wolf.xp;
            var eman_xp = slayers.enderman.xp;
            var blaze_xp = slayers.blaze.xp;
            if(!rev_xp){
              rev_xp = null;
              rev_lvl = null;
            }else{
              var rev_lvl = slayer_loop(rev_xp);
              rev_xp = short_number(rev_xp);
              if(rev_lvl < 9){rev_xp = `${colors[15]}${rev_xp}`}
              else if(rev_lvl == 9){rev_xp = `${colors[3]}${rev_xp}`}
              var rev_kills = slayers.zombie;
              if(!rev_kills){
                var rev_t1 = 0
                var rev_t2 = 0
                var rev_t3 = 0
                var rev_t4 = 0
                var rev_t5 = 0
              }else{
                if(!rev_kills.boss_kills_tier_0){
                  var rev_t1 = 0
                }else{
                  var rev_t1 = rev_kills.boss_kills_tier_0;
                }if(!rev_kills.boss_kills_tier_1){
                  var rev_t2 = 0
                }else{
                  var rev_t2 = rev_kills.boss_kills_tier_1;
                }if(!rev_kills.boss_kills_tier_2){
                  var rev_t3 = 0
                }else{
                  var rev_t3 = rev_kills.boss_kills_tier_2;
                }if(!rev_kills.boss_kills_tier_3){
                  var rev_t4 = 0
                }else{
                  var rev_t4 = rev_kills.boss_kills_tier_3;
                }if(!rev_kills.boss_kills_tier_4){
                  var rev_t5 = 0
                }else{
                  var rev_t5 = rev_kills.boss_kills_tier_4;
                }
              }
              print(`${rev_t1}\n${rev_t2}\n${rev_t3}\n${rev_t4}\n${rev_t5}`)
            } if(!tara_xp){
              tara_xp = null;
              tara_lvl = null;
            }else{
              var tara_lvl = slayer_loop(tara_xp);
              tara_xp = short_number(tara_xp);
              if(tara_lvl < 9){tara_xp = `${colors[15]}${tara_xp}`}
              else if(tara_lvl == 9){tara_xp = `${colors[3]}${tara_xp}`}
              var tara_kills = slayers.spider;
              if(!tara_kills){
                var tara_t1 = 0
                var tara_t2 = 0
                var tara_t3 = 0
                var tara_t4 = 0
              }else{
                if(!tara_kills.boss_kills_tier_0){
                  var tara_t1 = 0
                }else{
                  var tara_t1 = tara_kills.boss_kills_tier_0;
                }if(!tara_kills.boss_kills_tier_1){
                  var tara_t2 = 0
                }else{
                  var tara_t2 = tara_kills.boss_kills_tier_1;
                }if(!tara_kills.boss_kills_tier_2){
                  var tara_t3 = 0
                }else{
                  var tara_t3 = tara_kills.boss_kills_tier_2;
                }if(!tara_kills.boss_kills_tier_3){
                  var tara_t4 = 0
                }else{
                  var tara_t4 = tara_kills.boss_kills_tier_3;
                }
              }
            } if(!sven_xp){
              sven_xp = null;
              sven_lvl = null;
            }else{
              var sven_lvl = slayer_loop(sven_xp);
              sven_xp = short_number(sven_xp);
              if(sven_lvl < 9){sven_xp = `${colors[15]}${sven_xp}`}
              else if(sven_lvl == 9){sven_xp = `${colors[3]}${sven_xp}`}
              var sven_kills = slayers.wolf;
              if(!sven_kills){
                var sven_t1 = 0
                var sven_t2 = 0
                var sven_t3 = 0
                var sven_t4 = 0
              }else{
                if(!sven_kills.boss_kills_tier_0){
                  var sven_t1 = 0
                }else{
                  var sven_t1 = sven_kills.boss_kills_tier_0;
                }if(!sven_kills.boss_kills_tier_1){
                  var sven_t2 = 0
                }else{
                  var sven_t2 = sven_kills.boss_kills_tier_1;
                }if(!sven_kills.boss_kills_tier_2){
                  var sven_t3 = 0
                }else{
                  var sven_t3 = sven_kills.boss_kills_tier_2;
                }if(!sven_kills.boss_kills_tier_3){
                  var sven_t4 = 0
                }else{
                  var sven_t4 = sven_kills.boss_kills_tier_3;
                }
              }
            } if(!eman_xp){
              eman_xp = null;
              eman_lvl = null;
            }else{
              var eman_lvl = slayer_loop(eman_xp);
              eman_xp = short_number(eman_xp);
              if(eman_lvl < 9){eman_xp = `${colors[15]}${eman_xp}`}
              else if(eman_lvl == 9){eman_xp = `${colors[3]}${eman_xp}`}
              var eman_kills = slayers.enderman;
              if(!eman_kills){
                var eman_t1 = 0
                var eman_t2 = 0
                var eman_t3 = 0
                var eman_t4 = 0
              }else{
                if(!eman_kills.boss_kills_tier_0){
                  var eman_t1 = 0
                }else{
                  var eman_t1 = eman_kills.boss_kills_tier_0;
                }if(!eman_kills.boss_kills_tier_1){
                  var eman_t2 = 0
                }else{
                  var eman_t2 = eman_kills.boss_kills_tier_1;
                }if(!eman_kills.boss_kills_tier_2){
                  var eman_t3 = 0
                }else{
                  var eman_t3 = eman_kills.boss_kills_tier_2;
                }if(!eman_kills.boss_kills_tier_3){
                  var eman_t4 = 0
                }else{
                  var eman_t4 = eman_kills.boss_kills_tier_3;
                }
              }
            } if(!blaze_xp){
              blaze_xp = null;
              blaze_lvl = null;
            }else{
              var blaze_lvl = slayer_loop(blaze_xp);
              blaze_xp = short_number(blaze_xp);
              if(blaze_lvl < 9){blaze_xp = `${colors[15]}${blaze_xp}`}
              else if(blaze_lvl == 9){blaze_xp = `${colors[3]}${blaze_xp}`}
              var blaze_kills = slayers.blaze;
              if(!blaze_kills){
                var blaze_t1 = 0
                var blaze_t2 = 0
                var blaze_t3 = 0
                var blaze_t4 = 0
              }else{
                if(!blaze_kills.boss_kills_tier_0){
                  var blaze_t1 = 0
                }else{
                  var blaze_t1 = blaze_kills.boss_kills_tier_0;
                }if(!blaze_kills.boss_kills_tier_1){
                  var blaze_t2 = 0
                }else{
                  var blaze_t2 = blaze_kills.boss_kills_tier_1;
                }if(!blaze_kills.boss_kills_tier_2){
                  var blaze_t3 = 0
                }else{
                  var blaze_t3 = blaze_kills.boss_kills_tier_2;
                }if(!blaze_kills.boss_kills_tier_3){
                  var blaze_t4 = 0
                }else{
                  var blaze_t4 = blaze_kills.boss_kills_tier_3;
                }
              }
            }

            var revkills = (rev_t1+rev_t2+rev_t3+rev_t4+rev_t5);
            var tarakills = (tara_t1+tara_t2+tara_t3+tara_t4);
            var svenkills = (sven_t1+sven_t2+sven_t3+sven_t4);
            var emankills = (eman_t1+eman_t2+eman_t3+eman_t4);
            var blazekills = (blaze_t1+blaze_t2+blaze_t3+blaze_t4);

            var clean_rev_xp = slayers.zombie.xp;
            var clean_tara_xp = slayers.spider.xp;
            var clean_sven_xp = slayers.wolf.xp;
            var clean_eman_xp = slayers.enderman.xp;
            var clean_blaze_xp = slayers.blaze.xp;

            var total_slayer_xp = (clean_rev_xp+clean_tara_xp+clean_sven_xp+clean_eman_xp+clean_blaze_xp);
            total_slayer_xp = short_number(total_slayer_xp);

            var total_rev_kills = `${colors[6]}Total Kills\n${colors[6]}Tier 1: ${colors[3]}${rev_t1}\n${colors[6]}Tier 2: ${colors[3]}${rev_t2}\n${colors[6]}Tier 3: ${colors[3]}${rev_t3}\n${colors[6]}Tier 4: ${colors[3]}${rev_t4}\n${colors[6]}Tier 5: ${colors[3]}${rev_t5}\n${colors[6]}Total: ${colors[3]}${revkills}`;
            
            var total_tara_kills = `${colors[6]}Total Kills\n${colors[6]}Tier 1: ${colors[3]}${tara_t1}\n${colors[6]}Tier 2: ${colors[3]}${tara_t2}\n${colors[6]}Tier 3: ${colors[3]}${tara_t3}\n${colors[6]}Tier 4: ${colors[3]}${tara_t4}\n${colors[6]}Total: ${colors[3]}${tarakills}`;
            var total_sven_kills = `${colors[6]}Total Kills\n${colors[6]}Tier 1: ${colors[3]}${sven_t1}\n${colors[6]}Tier 2: ${colors[3]}${sven_t2}\n${colors[6]}Tier 3: ${colors[3]}${sven_t3}\n${colors[6]}Tier 4: ${colors[3]}${sven_t4}\n${colors[6]}Total: ${colors[3]}${svenkills}`;
            var total_eman_kills = `${colors[6]}Total Kills\n${colors[6]}Tier 1: ${colors[3]}${eman_t1}\n${colors[6]}Tier 2: ${colors[3]}${eman_t2}\n${colors[6]}Tier 3: ${colors[3]}${eman_t3}\n${colors[6]}Tier 4: ${colors[3]}${eman_t4}\n${colors[6]}Total: ${colors[3]}${emankills}`;
            var total_blaze_kills = `${colors[6]}Total Kills\n${colors[6]}Tier 1: ${colors[3]}${blaze_t1}\n${colors[6]}Tier 2: ${colors[3]}${blaze_t2}\n${colors[6]}Tier 3: ${colors[3]}${blaze_t3}\n${colors[6]}Tier 4: ${colors[3]}${blaze_t4}\n${colors[6]}Total: ${colors[3]}${blazekills}`;

            var total_slayer_kills = (revkills+tarakills+svenkills+emankills+blazekills);

            break_chat(5)
            mid_chat(`${PREFIX} ${name_}`)
            break_chat(5)
            hover_msg(`${colors[6]}Total Slayer XP: ${colors[3]}${total_slayer_xp}`, `${colors[6]}Total Slayer Kills: ${colors[3]}${total_slayer_kills}`)
            break_chat(5)
            hover_msg(`${colors[5]}Revenant Slayer ${rev_lvl}: ${rev_xp}`, `${total_rev_kills}`)
            hover_msg(`${colors[1]}Tarantula Slayer ${tara_lvl}: ${tara_xp}`, `${total_tara_kills}`)
            hover_msg(`${colors[14]}Sven Slayer ${sven_lvl}: ${sven_xp}`, `${total_sven_kills}`)
            hover_msg(`${colors[12]}Enderman Slayer ${eman_lvl}: ${eman_xp}`, `${total_eman_kills}`)
            hover_msg(`${colors[3]}Blaze Slayer ${blaze_lvl}: ${blaze_xp}`, `${total_blaze_kills}`)
            break_chat(5)

          }).catch(function(error) {
            print(error)
            return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Slayers`);
         });
    }).catch(function(error) {
    print(error)
    return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Slayers`);
 });
  }).catch(function(error) {
    print(error)
    return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Data`);
 });
}

function hotm_data(username){
  if(!username){username = Player.getName()}
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
      }
      var gemstone_powder = short_number(g_powder+g2_powder);
      var mithril_powder = short_number(m_powder+m2_powder);


      var crystals_result = `${colors[6]}Total Crystal Found\n${colors[5]}Jade: ${colors[3]}${jade}\n${colors[3]}Amber: ${amber}\n${colors[12]}Amethyst: ${colors[3]}${amethyst}\n${colors[7]}Sapphire: ${colors[3]}${sapphire}\n${colors[4]}Topaz: ${colors[3]}${topaz}\n${colors[11]}Jasper: ${colors[3]}${jasper}\n${colors[2]}Ruby Status: ${colors[3]}${ruby}`;

      mid_chat(`${PREFIX} ${name_}`)
      break_chat(5)
      hover_msg(`${colors[6]}Total Nucleus: ${colors[3]}${crystals} `,`${crystals_result}`)
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
}

function essence_data(username){
  if(!username){username = Player.getName()}
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
}

function nether_data(username){
  if(!username){username = Player.getName()}
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
        var hot_tier = kuudra_comps.hot;
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
        var stamina = dojo.dojo_points_wall_jump;
        var mastery = dojo.dojo_points_archer;
        var discipline = dojo.dojo_points_sword_swap;
        var swiftness = dojo.dojo_points_snake;
        var tenacity = dojo.dojo_points_fireball;
        var control = dojo.dojo_points_lock_head;
      }if(!netherdata.members[pid].nether_island_player_data.selected_faction){
        var faction = null
        var reputation = null
      }else{
        var faction = netherdata.members[pid].nether_island_player_data.selected_faction;
        var faction_reputation = `${faction}_reputation`;
        var reputation = netherdata.members[pid].nether_island_player_data[faction_reputation];
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
}