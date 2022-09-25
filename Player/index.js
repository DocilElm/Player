/// <reference types="../CTAutocomplete" />
const File = Java.type("java.io.File");

import request from 'request/index';
import PogObject from "PogData";
import sleep from 'sleep';
import { 
  short_number, 
  math_number, 
  hover_msg, 
  break_chat,
  mid_chat,
  colors
} from "./functions"

const PREFIX = "§2[Player] ";

const data = new PogObject("Player", {  
  api_key: [],
  first_time: false
}, ".playerData.json");

function fileExists(location) {
  var file = new File(location);
  return file.exists();
}
if (!fileExists("./config/ChatTriggers/modules/Player/.playerData.json")) {  
  data.save()  
  sleep(500, () => {
    help()
  });
}
var player = Player.getName()
var apikey = `${data.api_key}`;

register('command', set_api).setCommandName('pset');
register('command', getuuid).setCommandName('player');
register('command', help).setCommandName('phelp');

function set_api(api_key_set){
  if (!api_key_set){return mid_chat(`${PREFIX}${colors[1]}Error No Api Key Set`);}
  else{
    data.api_key.push(api_key_set)
    data.save()  
    mid_chat(`${PREFIX}${colors[6]}Api Key Successfully Set!`);    
    mid_chat(`${PREFIX}${colors[5]}Please Do /ct reload`);
  }
}

function help(){
  mid_chat(`${PREFIX}${colors[5]}All Commands`);
  mid_chat(`${colors[6]}/pset <Value> | Sets The Api Key`);
  mid_chat(`${colors[6]}/player <Username> | Checks Player Stats`);
  mid_chat(`${colors[6]}/phelp | Gives A List Of All The Commands`);
}

function getuuid(username){
  if (!apikey){return mid_chat(`${PREFIX}${colors[1]}Error No Api Key Set`);}    
  else{
  if(!username){username = player}
  request({
      url : 'https://playerdb.co/api/player/minecraft/'+username,
      headers: { 'User-Agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36' }
     })
      .then(function(response) {
          let user_uuid = JSON.parse(response).data.player.raw_id;
          let name_ = JSON.parse(response).data.player.username;

          get_rank(user_uuid, name_)
      })
      .catch(function(error) {
        print(error)
        return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's UUID`);
      });    
    }
}

function get_rank(user_uuid, name_){

  request({
    url : `https://api.hypixel.net/player?key=${apikey}&uuid=${user_uuid}`,
    headers: { 'User-Agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36' }
   })
    .then(function(response) {
        let rank = JSON.parse(response).player.newPackageRank;
        let plus_plus = JSON.parse(response).player.monthlyPackageRank;
        let plus_color = JSON.parse(response).player.rankPlusColor;

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
        player_data(user_uuid, name_)
    })
    .catch(function(error) {
       print(error)
       return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Rank`);
    });
}

function player_data(user_uuid, name_) {  
  request({
  url : 'https://hypixel-api.senither.com/v1/profiles/'+user_uuid+'/latest/?key='+apikey,
  headers: { 'User-Agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36' }
 })
  .then(function(response) {
      var skills = JSON.parse(response).data.skills;
      var isenabled = skills.apiEnabled;
      if (isenabled == false){return mid_chat(`${PREFIX}${colors[1]}Error Player's Skill API Off`);}
      var dungeons = JSON.parse(response).data.dungeons;
      var slayers = JSON.parse(response).data.slayers;

      var combat = (Math.round(skills.combat.level * 100) / 100).toFixed(2);
      var farming = (Math.round(skills.farming.level * 100) / 100).toFixed(2);
      var enchanting = (Math.round(skills.enchanting.level * 100) / 100).toFixed(2);
      var mining = (Math.round(skills.mining.level * 100) / 100).toFixed(2);
      var foraging = (Math.round(skills.foraging.level * 100) / 100).toFixed(2);
      var fishing = (Math.round(skills.fishing.level * 100) / 100).toFixed(2);
      var alchemy = (Math.round(skills.alchemy.level * 100) / 100).toFixed(2);
      var taming = (Math.round(skills.taming.level * 100) / 100).toFixed(2);
      var carpentry = (Math.round(skills.carpentry.level * 100) / 100).toFixed(2);
      var runecrafting = (Math.round(skills.runecrafting.level * 100) / 100).toFixed(2);
      var skill_average = (Math.round(skills.average_skills * 100) / 100).toFixed(2);
      //overflow xp/total xp
      var combat_val = skills.combat.experience;
      var mining_val = skills.mining.experience;
      var farming_val = skills.farming.experience;
      var foraging_val = skills.foraging.experience;
      var fishing_val = skills.fishing.experience;
      var enchanting_val = skills.enchanting.experience;
      var taming_val = skills.taming.experience;
      var alchemy_val = skills.alchemy.experience;
      var carpentry_val = skills.carpentry.experience;
      var runecrafting_val = skills.runecrafting.experience;
      var cata_val = dungeons.types.catacombs.experience;
      var cata_50 = 569809640;
      var lvl_60 = 111672425;
      var lvl_50 = 55172425;
      var lvl_25 = 94500;
      //cata
      var cata_lvl = (Math.round(dungeons.types.catacombs.level * 100) / 100).toFixed(2);
      //slayers
      //rev
      var rev_lvl = slayers.bosses.revenant.level;
      var rev_xp = slayers.bosses.revenant.experience;
      rev_xp = short_number(rev_xp);
      if(rev_lvl < 8){rev_xp = `${colors[15]}${rev_xp}`}
      else if(rev_lvl > 8){rev_xp = `${colors[3]}${rev_xp}`}
      //spider
      var tara_lvl = slayers.bosses.tarantula.level;
      var tara_xp = slayers.bosses.tarantula.experience;
      tara_xp = short_number(tara_xp);
      if(tara_lvl < 8){tara_xp = `${colors[15]}${tara_xp}`}
      else if(tara_lvl > 8){tara_xp = `${colors[3]}${tara_xp}`}
      //sven
      var sven_lvl = slayers.bosses.sven.level;
      var sven_xp = slayers.bosses.sven.experience;
      sven_xp = short_number(sven_xp);
      if(sven_lvl < 8){sven_xp = `${colors[15]}${sven_xp}`}
      else if(sven_lvl > 8){sven_xp = `${colors[3]}${sven_xp}`}
      //eman
      var eman_lvl = slayers.bosses.enderman.level;
      var eman_xp = slayers.bosses.enderman.experience;
      eman_xp = short_number(eman_xp);
      if(eman_lvl < 8){eman_xp = `${colors[15]}${eman_xp}`}
      else if(eman_lvl > 8){eman_xp = `${colors[3]}${eman_xp}`}      
      

      var color = colors[6];
      //skills
      if (skill_average < 54){skill_average = `${colors[15]}${skill_average}`}
      else if(skill_average > 54){skill_average = `${colors[3]}${skill_average}`}

      if(combat < 59){
        combat = `${colors[15]}${combat}`
        combat_val = math_number(combat_val);
        combat_val = short_number(combat_val);
        combat_val = `${colors[6]}Total XP: ${colors[15]}${combat_val}`;
      }
      else if(combat > 59){
        combat = `${colors[3]}${combat}`
        combat_val -= lvl_60;     
        combat_val = math_number(combat_val);
        combat_val = short_number(combat_val);
        combat_val = `${colors[6]}Overflow XP: ${colors[3]}${combat_val}`;
      }

      if(mining < 59){
        mining = `${colors[15]}${mining}`
        mining_val = math_number(mining_val);
        mining_val = short_number(mining_val);
        mining_val = `${colors[6]}Total XP: ${colors[15]}${mining_val}`;
      }
      else if(mining > 59){
        mining = `${colors[3]}${mining}`
        mining_val -= lvl_60;     
        mining_val = math_number(mining_val);
        mining_val = short_number(mining_val);
        mining_val = `${colors[6]}Overflow XP: ${colors[3]}${mining_val}`;
      }

      if(farming < 59){
        farming = `${colors[15]}${farming}`
        farming_val = math_number(farming_val);
        farming_val = short_number(farming_val);
        farming_val = `${colors[6]}Total XP: ${colors[15]}${farming_val}`;
      }
      else if(farming > 59){
        farming = `${colors[3]}${farming}`
        farming_val -= lvl_60;     
        farming_val = math_number(farming_val);
        farming_val = short_number(farming_val);
        farming_val = `${colors[6]}Overflow XP: ${colors[3]}${farming_val}`;
      }

      if(enchanting < 59){
        enchanting = `${colors[15]}${enchanting}`
        enchanting_val = math_number(enchanting_val);
        enchanting_val = short_number(enchanting_val);
        enchanting_val = `${colors[6]}Total XP: ${colors[15]}${enchanting_val}`;
      }
      else if(enchanting > 59){
        enchanting = `${colors[3]}${enchanting}`
        enchanting_val -= lvl_60;     
        enchanting_val = math_number(enchanting_val);
        enchanting_val = short_number(enchanting_val);
        enchanting_val = `${colors[6]}Overflow XP: ${colors[3]}${enchanting_val}`;
      }

      if(foraging < 49){
        foraging = `${colors[15]}${foraging}`
        foraging_val = math_number(foraging_val);
        foraging_val = short_number(foraging_val);
        foraging_val = `${colors[6]}Total XP: ${colors[15]}${foraging_val}`;
      }
      else if(foraging > 49){
        foraging = `${colors[3]}${foraging}`
        foraging_val -= lvl_50;     
        foraging_val = math_number(foraging_val);
        foraging_val = short_number(foraging_val);
        foraging_val = `${colors[6]}Overflow XP: ${colors[3]}${foraging_val}`;
      }

      if(fishing < 49){
        fishing = `${colors[15]}${fishing}`
        fishing_val = math_number(fishing_val);
        fishing_val = short_number(fishing_val);
        fishing_val = `${colors[6]}Total XP: ${colors[15]}${fishing_val}`;
      }
      else if(fishing > 49){
        fishing = `${colors[3]}${fishing}`
        fishing_val -= lvl_50;     
        fishing_val = math_number(fishing_val);
        fishing_val = short_number(fishing_val);
        fishing_val = `${colors[6]}Overflow XP: ${colors[3]}${fishing_val}`;
      }

      if(alchemy < 49){
        alchemy = `${colors[15]}${alchemy}`
        alchemy_val = math_number(alchemy_val);
        alchemy_val = short_number(alchemy_val);
        alchemy_val = `${colors[6]}Total XP: ${colors[15]}${alchemy_val}`;
      }
      else if(alchemy > 49){
        alchemy = `${colors[3]}${alchemy}`
        alchemy_val -= lvl_50;     
        alchemy_val = math_number(alchemy_val);
        alchemy_val = short_number(alchemy_val);
        alchemy_val = `${colors[6]}Overflow XP: ${colors[3]}${alchemy_val}`;
      }

      if(taming < 49){
        taming = `${colors[15]}${taming}`
        taming_val = math_number(taming_val);
        taming_val = short_number(taming_val);
        taming_val = `${colors[6]}Total XP: ${colors[15]}${taming_val}`;
      }
      else if(taming > 49){
        taming = `${colors[3]}${taming}`
        taming_val -= lvl_50;     
        taming_val = math_number(taming_val);
        taming_val = short_number(taming_val);
        taming_val = `${colors[6]}Overflow XP: ${colors[3]}${taming_val}`;
      }

      if(carpentry < 49){
        carpentry = `${colors[15]}${carpentry}`
        carpentry_val = math_number(carpentry_val);
        carpentry_val = short_number(carpentry_val);
        carpentry_val = `${colors[6]}Total XP: ${colors[15]}${carpentry_val}`;
      }      
      else if(carpentry > 49){
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
      else if(runecrafting > 24){
        runecrafting = `${colors[3]}${runecrafting}`
        runecrafting_val -= lvl_25;     
        runecrafting_val = math_number(runecrafting_val);
        runecrafting_val = short_number(runecrafting_val);
        runecrafting_val = `${colors[6]}Overflow XP: ${colors[3]}${runecrafting_val}`;
      }

      //cata
      if(cata_lvl < 49){
        cata_lvl = `${colors[15]}${cata_lvl}`
        cata_val = math_number(cata_val);
        cata_val = short_number(cata_val);
        cata_val = `${colors[6]}Total XP: ${colors[15]}${cata_val}`;
      }
      else if(cata_lvl > 49){
        cata_lvl = `${colors[3]}${cata_lvl}`
        cata_val -= cata_50;     
        cata_val = math_number(cata_val);
        cata_val = short_number(cata_val);
        cata_val = `${colors[6]}Overflow XP: ${colors[3]}${cata_val}`;
      }
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
      mid_chat(`${colors[5]}Revenant Slayer: ${rev_xp}`)
      mid_chat(`${colors[1]}Tarantula Slayer: ${tara_xp}`)
      mid_chat(`${colors[14]}Sven Slayer: ${sven_xp}`)
      mid_chat(`${colors[12]}Enderman Slayer: ${eman_xp}`)
  })
  .catch(function(error) {
     print(error)
     return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Stats`);
  });
}