import { short_number, math_number, hover_msg, break_chat, mid_chat, colors, slayer_loop, cata_loop } from "./../utils/functions"
import { g_rank, PREFIX,get_slayers, get_profile_id, slothpixel_api_achiev, slothpixel_api } from "./../utils/cons"
const Loader = Java.type("net.minecraftforge.fml.common.Loader");
if (Loader.isModLoaded("SkyblockExtras")) {
  var player_command = "pplayer"
  mid_chat(`${PREFIX}${colors[6]} Found ${colors[1]}SBE ${colors[6]}Changing ${colors[3]}/player${colors[6]} Command To ${colors[3]}/pplayer`)
} else {
  var player_command = "player"
}
export const player_data = register("command", username => {
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
      slothpixel_api(username,cute_name).then(response => {
            get_slayers(apikey,profile_id).then(slayer_data => {
            slothpixel_api_achiev(username).then(secrets_data =>{
            var skills = response.members[user_uuid].skills;          
            var dungeons = response.members[user_uuid].dungeons;
            var slayers = slayer_data.profile.members[user_uuid].slayer_bosses;
            if(!skills.combat){
              var combat = 0;
            }else{
              var combat = skills.combat.floatLevel.toFixed(2);
              var combat_val = skills.combat.xp;
            } if(!skills.farming){
              var farming = 0;
            }else{
              var farming = skills.farming.floatLevel.toFixed(2);
              var farming_val = skills.farming.xp;
            } if(!skills.enchanting){
              var enchanting = 0;
            }else{
              var enchanting = skills.enchanting.floatLevel.toFixed(2);
              var enchanting_val = skills.enchanting.xp;
            } if(!skills.mining){
              var mining = 0;
            }else{
              var mining = skills.mining.floatLevel.toFixed(2);
              var mining_val = skills.mining.xp;
            } if(!skills.foraging){
              var foraging = 0;
            }else{
              var foraging = skills.foraging.floatLevel.toFixed(2);
              var foraging_val = skills.foraging.xp;
            } if(!skills.fishing){
              var fishing = 0;
            }else{
              var fishing = skills.fishing.floatLevel.toFixed(2);
              var fishing_val = skills.fishing.xp;
            } if(!skills.taming){
              var taming = 0;
            }else{
              var taming = skills.taming.floatLevel.toFixed(2);
              var taming_val = skills.taming.xp;
            } if(!skills.carpentry){
              var carpentry = 0;
            }else{
              var carpentry = skills.carpentry.floatLevel.toFixed(2);
              var carpentry_val = skills.carpentry.xp;
            } if(!skills.runecrafting){
              var runecrafting = 0;
            }else{
              var runecrafting = skills.runecrafting.floatLevel.toFixed(2);
              var runecrafting_val = skills.runecrafting.xp;
            } if(!skills.alchemy){
              var alchemy = 0;
            }else{
              var alchemy = skills.alchemy.floatLevel.toFixed(2);
              var alchemy_val = skills.alchemy.xp;
            }
             var skill_average = response.members[user_uuid].average_skill_level.toFixed(2);
  
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
            var purse = response.members[user_uuid].coin_purse;
            var bank = response.banking.balance;
            purse = Math.trunc(purse);
            purse = short_number(purse);
            bank = Math.trunc(bank);
            bank = short_number(bank);
            //
            var secrets_found = secrets_data.games.SkyBlock.tiered["TREASURE_HUNTER"].current_amount;
            var cata_val = dungeons.dungeon_types.catacombs.experience;
            var cata_50 = 569809640;
            //cata
            if (!cata_val){
              cata_lvl = 0;
              cata_val = 0;
            }else {
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
            }           
            //slayers
            var rev_xp = slayers.zombie.xp;
            var tara_xp = slayers.spider.xp;
            var sven_xp = slayers.wolf.xp;
            var eman_xp = slayers.enderman.xp;
            var blaze_xp = slayers.blaze.xp;
            if(!rev_xp){
              rev_xp = 0;
              rev_lvl = 0;
            }else{
              var rev_lvl = slayer_loop(rev_xp);
              rev_xp = short_number(rev_xp);
              if(rev_lvl < 9){rev_xp = `${colors[15]}${rev_xp}`}
              else if(rev_lvl == 9){rev_xp = `${colors[3]}${rev_xp}`}
            } if(!tara_xp){
              tara_xp = 0;
              tara_lvl = 0;
            }else{
              var tara_lvl = slayer_loop(tara_xp);
              tara_xp = short_number(tara_xp);
              if(tara_lvl < 9){tara_xp = `${colors[15]}${tara_xp}`}
              else if(tara_lvl == 9){tara_xp = `${colors[3]}${tara_xp}`}
            } if(!sven_xp){
              sven_xp = 0;
              sven_lvl = 0;
            }else{
              var sven_lvl = slayer_loop(sven_xp);
              sven_xp = short_number(sven_xp);
              if(sven_lvl < 9){sven_xp = `${colors[15]}${sven_xp}`}
              else if(sven_lvl == 9){sven_xp = `${colors[3]}${sven_xp}`}
            } if(!eman_xp){
              eman_xp = 0;
              eman_lvl = 0;
            }else{
              var eman_lvl = slayer_loop(eman_xp);
              eman_xp = short_number(eman_xp);
              if(eman_lvl < 9){eman_xp = `${colors[15]}${eman_xp}`}
              else if(eman_lvl == 9){eman_xp = `${colors[3]}${eman_xp}`}
            } if(!blaze_xp){
              blaze_xp = 0;
              blaze_lvl = 0;
            }else{
              var blaze_lvl = slayer_loop(blaze_xp);
              blaze_xp = short_number(blaze_xp);
              if(blaze_lvl < 9){blaze_xp = `${colors[15]}${blaze_xp}`}
              else if(blaze_lvl == 9){blaze_xp = `${colors[3]}${blaze_xp}`}
            }
            var slayer_hover = `${colors[7]}Slayers\n${colors[5]}Revenant Slayer ${rev_lvl}: ${rev_xp}\n${colors[1]}Tarantula Slayer ${tara_lvl}: ${tara_xp}\n${colors[14]}Sven Slayer ${sven_lvl}: ${sven_xp}\n${colors[12]}Enderman Slayer ${eman_lvl}: ${eman_xp}\n${colors[3]}Blaze Slayer ${blaze_lvl}: ${blaze_xp}\n`;
            secrets_found = short_number(secrets_found);
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
            hover_msg(`${colors[1]}Cata: ${cata_lvl}`,`${cata_val}\n${color}Total Secrets: ${colors[3]}${secrets_found}`)
            break_chat(5)
            hover_msg(`${colors[7]}Slayers ${colors[15]}(Hover)`,`${slayer_hover}`)
            break_chat(5)
            mid_chat(`${color}Purse: ${colors[3]}${purse}`)
            mid_chat(`${color}Bank: ${colors[3]}${bank}`)
            break_chat(5)
          }).catch(function(error) {
            print(error)
            return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Secrets`);
         });
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
}).setName(player_command).setAliases("pskills","pstats","pp")//pp = player profile :yes: