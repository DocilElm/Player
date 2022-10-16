import { max_cata_lvl } from './../utils/cata';
import { short_number, math_number, hover_msg, break_chat, mid_chat, colors, pb_date, cata_loop } from "./../utils/functions"
import { g_rank, PREFIX, get_profile_id, slothpixel_api, slothpixel_api_achiev } from "./../utils/cons"
export const cata_feature = register("command", username => {
    const data = JSON.parse(FileLib.read("./config/ChatTriggers/modules/Player/.playerData.json"))
    var apikey = `${data.api_key}`;
    if(!username){username = Player.getName()}
    if(apikey == null){return mid_chat(`${PREFIX}${colors[1]}Error Invalid Api Key`);}
    g_rank(username,apikey).then(rank_data => {
      let name_ = JSON.parse(rank_data).rank;
      let user_uuid = JSON.parse(rank_data).uuid;
      get_profile_id(user_uuid, null, apikey).then(res => {
        let cute_name = res.cute_name;
      slothpixel_api(username, cute_name).then(sloth_dung =>{
        var secrets_found_var = []
        slothpixel_api_achiev(username).then(secrets_data => {
          secrets_found_var += secrets_data.games.SkyBlock.tiered["TREASURE_HUNTER"].current_amount;
          var secrets_found = short_number(secrets_found_var);
          var dungeons = sloth_dung.members[user_uuid].dungeons;
          var cata_val = dungeons.dungeon_types.catacombs.experience;
          var cata_50 = 569809640;
          if (!cata_val) cata_val = null;
          var cata_lvl = cata_loop(cata_val)
          var cata_over_50 = cata_loop(cata_val, 1)
          //classes
          var healer = dungeons.player_classes.healer;
          if(!healer) healer = 0.00;
          var mage = dungeons.player_classes.mage;
          if(!mage) mage = 0.00;
          var berserker = dungeons.player_classes.berserk;
          if(!berserker) berserker = 0.00;
          var archer = dungeons.player_classes.archer;
          if(!archer) archer = 0.00;
          var tank = dungeons.player_classes.tank;
          if(!tank) tank = 0.00;
          
          //healer
          var healer_xp = healer.experience;
          if(!healer_xp) healer_xp = 0.00;
          var healer_lvl = cata_loop(healer_xp)
          var healer_over_50 = cata_loop(healer_xp, 1)
          //mage
          var mage_xp = mage.experience;
          if(!mage_xp) mage_xp = 0.00;
          var mage_lvl = cata_loop(mage_xp)
          var mage_over_50 = cata_loop(mage_xp, 1)
          //berserker
          var berserker_xp = berserker.experience;
          if(!berserker_xp) berserker_xp = 0.00;
          var berserker_lvl = cata_loop(berserker_xp)
          var berserker_over_50 = cata_loop(berserker_xp, 1)
          //archer
          var archer_xp = archer.experience;
          if(!archer_xp) archer_xp = 0.00;
          var archer_lvl = cata_loop(archer_xp)
          var archer_over_50 = cata_loop(archer_xp, 1)
          //tank
          var tank_xp = tank.experience;
          if(!tank_xp) tank_xp = 0.00;
          var tank_lvl = cata_loop(tank_xp)
          var tank_over_50 = cata_loop(tank_xp, 1)
          //average class
          if(archer_lvl > 50) var avclass_arch = 50;
          else var avclass_arch = archer_lvl;
          if(healer_lvl > 50) var avclass_heal = 50;
          else var avclass_heal = healer_lvl;
          if(mage_lvl > 50) var avclass_mage = 50;
          else var avclass_mage = mage_lvl;
          if(berserker_lvl > 50) var avclass_bers = 50;
          else var avclass_bers = berserker_lvl;
          if(tank_lvl > 50) var avclass_tank = 50;
          else var avclass_tank = tank_lvl;
          
          var average_class = (avclass_arch+avclass_heal+avclass_mage+avclass_tank+avclass_bers);
          average_class = average_class / 5;
          average_class = average_class.toFixed(2);
          
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
          else if(healer_lvl > 50){
            healer_lvl = `${colors[3]}${healer_lvl}`
            healer_xp -= healer_over_50;
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
          else if(mage_lvl > 50){
            mage_lvl = `${colors[3]}${mage_lvl}`
            mage_xp -= mage_over_50;
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
          else if(berserker_lvl > 50){
            berserker_lvl = `${colors[3]}${berserker_lvl}`
            berserker_xp -= berserker_over_50;
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
          else if(archer_lvl > 50){
            archer_lvl = `${colors[3]}${archer_lvl}`
            archer_xp -= archer_over_50;
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
          }else if(tank_lvl > 50){
            tank_lvl = `${colors[3]}${tank_lvl}`
            tank_xp -= tank_over_50;
            tank_xp = math_number(tank_xp);
            tank_xp = short_number(tank_xp);
            tank_xp = `${colors[6]}Overflow XP: ${colors[3]}${tank_xp}`;
          }
          //Total completions
          const normal_comps = dungeons.dungeon_types.catacombs.tier_completions;
          //Normal Floors
          var entrance = 0
          var f1 = 0
          var f2 = 0
          var f3 = 0
          var f4 = 0
          var f5 = 0
          var f6 = 0
          var f7 = 0
          //Normal PB Floors
          var pbe
          var pbf1
          var pbf2
          var pbf3
          var pbf4
          var pbf5
          var pbf6
          var pbf7
          //Normal PB + Floors
          var pbe_plus
          var pb_plusf1
          var pb_plusf2
          var pb_plusf3
          var pb_plusf4
          var pb_plusf5
          var pb_plusf6
          var pb_plusf7
          //
          if(normal_comps == undefined || !normal_comps[0]);
          else{
            const normal_personal_best = dungeons.dungeon_types.catacombs.fastest_time_s;
            const normal_personal_best_plus = dungeons.dungeon_types.catacombs.fastest_time_s_plus;

            if(normal_comps == undefined);
            else
            {Object.entries(normal_comps).forEach((key) => {
              if(key[0] == 0) entrance = key[1];
              else if(key[0] == 1) f1 = key[1];
              else if(key[0] == 2) f2 = key[1];
              else if(key[0] == 3) f3 = key[1];
              else if(key[0] == 4) f4 = key[1];
              else if(key[0] == 5) f5 = key[1];
              else if(key[0] == 6) f6 = key[1];
              else if(key[0] == 7) f7 = key[1];
            });}
            if(normal_personal_best == undefined);
            else
            {Object.entries(normal_personal_best).forEach((key) => {
              if(key[0] == 0) pbe = key[1];
              else if(key[0] == 1) pbf1 = pb_date(key[1]);
              else if(key[0] == 2) pbf2 = pb_date(key[1]);
              else if(key[0] == 3) pbf3 = pb_date(key[1]);
              else if(key[0] == 4) pbf4 = pb_date(key[1]);
              else if(key[0] == 5) pbf5 = pb_date(key[1]);
              else if(key[0] == 6) pbf6 = pb_date(key[1]);
              else if(key[0] == 7) pbf7 = pb_date(key[1]);
            });}
            if(normal_personal_best_plus == undefined);
            else
            {Object.entries(normal_personal_best_plus).forEach((key) => {
              if(key[0] == 0) pbe_plus = key[1];
              else if(key[0] == 1) pb_plusf1 = pb_date(key[1]);
              else if(key[0] == 2) pb_plusf2 = pb_date(key[1]);
              else if(key[0] == 3) pb_plusf3 = pb_date(key[1]);
              else if(key[0] == 4) pb_plusf4 = pb_date(key[1]);
              else if(key[0] == 5) pb_plusf5 = pb_date(key[1]);
              else if(key[0] == 6) pb_plusf6 = pb_date(key[1]);
              else if(key[0] == 7) pb_plusf7 = pb_date(key[1]);
            });}
          }
          //Master Mode Area
          const master_comps = dungeons.dungeon_types.master_catacombs.tier_completions;
          //Master Floors
          var m1 = 0
          var m2 = 0
          var m3 = 0
          var m4 = 0
          var m5 = 0
          var m6 = 0
          var m7 = 0
          //Master PB Floors
          var pbm1
          var pbm2
          var pbm3
          var pbm4
          var pbm5
          var pbm6
          var pbm7
          //Master PB + Floors
          var pb_plusm1
          var pb_plusm2
          var pb_plusm3
          var pb_plusm4
          var pb_plusm5
          var pb_plusm6
          var pb_plusm7
          //
          if(master_comps == undefined || !master_comps[1]);
          else{
            const master_personal_best = dungeons.dungeon_types.master_catacombs.fastest_time_s;
            const master_personal_best_plus = dungeons.dungeon_types.master_catacombs.fastest_time_s_plus;
            
            if(master_comps == undefined);
            else
              {Object.entries(master_comps).forEach((key) => {
                if(key[0] == 1) m1 = key[1];
                else if(key[0] == 2) m2 = key[1];
                else if(key[0] == 3) m3 = key[1];
                else if(key[0] == 4) m4 = key[1];
                else if(key[0] == 5) m5 = key[1];
                else if(key[0] == 6) m6 = key[1];
                else if(key[0] == 7) m7 = key[1];
              });}
              if(master_personal_best == undefined);
              else
              {Object.entries(master_personal_best).forEach((key) => {
                if(key[0] == 1) pbm1 = pb_date(key[1]);
                else if(key[0] == 2) pbm2 = pb_date(key[1]);
                else if(key[0] == 3) pbm3 = pb_date(key[1]);
                else if(key[0] == 4) pbm4 = pb_date(key[1]);
                else if(key[0] == 5) pbm5 = pb_date(key[1]);
                else if(key[0] == 6) pbm6 = pb_date(key[1]);
                else if(key[0] == 7) pbm7 = pb_date(key[1]);
              });}
              if(master_personal_best_plus == undefined);
              else
              {Object.entries(master_personal_best_plus).forEach((key) => {
                if(key[0] == 1) pb_plusm1 = pb_date(key[1]);
                else if(key[0] == 2) pb_plusm2 = pb_date(key[1]);
                else if(key[0] == 3) pb_plusm3 = pb_date(key[1]);
                else if(key[0] == 4) pb_plusm4 = pb_date(key[1]);
                else if(key[0] == 5) pb_plusm5 = pb_date(key[1]);
                else if(key[0] == 6) pb_plusm6 = pb_date(key[1]);
                else if(key[0] == 7) pb_plusm7 = pb_date(key[1]);
              });}
          }
          
          var total_runs = (entrance+f1+f2+f3+f4+f5+f6+f7+m1+m2+m3+m4+m5+m6+m7);
          var secrets_found_av = secrets_found_var;
          if(!secrets_found_av) secrets_found_av = 0.00;
          var average_secrets = secrets_found_av / total_runs;
          average_secrets = average_secrets.toFixed(2);
          average_secrets = short_number(average_secrets);
          secrets_found = short_number(secrets_found);
          //
          var total_normal_val = (entrance+f1+f2+f3+f4+f5+f6+f7);
          var total_master_val = (m1+m2+m3+m4+m5+m6+m7);
        
          entrance = `${colors[3]}${short_number(entrance)}`
          f1 = `${colors[3]}${short_number(f1)}`
          f2 = `${colors[3]}${short_number(f2)}`
          f3 = `${colors[3]}${short_number(f3)}`
          f4 = `${colors[3]}${short_number(f4)}`
          f5 = `${colors[3]}${short_number(f5)}`
          f6 = `${colors[3]}${short_number(f6)}`
          f7 = `${colors[3]}${short_number(f7)}`
          m1 = `${colors[3]}${short_number(m1)}`
          m2 = `${colors[3]}${short_number(m2)}`
          m3 = `${colors[3]}${short_number(m3)}`
          m4 = `${colors[3]}${short_number(m4)}`
          m5 = `${colors[3]}${short_number(m5)}`
          m6 = `${colors[3]}${short_number(m6)}`
          m7 = `${colors[3]}${short_number(m7)}`
          total_normal_val = `${colors[3]}${short_number(total_normal_val)}`
          total_master_val = `${colors[3]}${short_number(total_master_val)}`
          var normal_comps_val = `${colors[6]}Total Completions\n${colors[6]}Entrance: ${entrance}\n${colors[6]}Floor 1: ${f1}\n${colors[6]}Floor 2: ${f2}\n${colors[6]}Floor 3: ${f3}\n${colors[6]}Floor 4: ${f4}\n${colors[6]}Floor 5: ${f5}\n${colors[6]}Floor 6: ${f6}\n${colors[6]}Floor 7: ${f7}\n${colors[6]}Total Runs: ${total_normal_val}`;
          var master_comps_val = `${colors[6]}Total ${colors[1]}Master ${colors[6]}Completions\n${colors[1]}Master ${colors[6]}Floor 1: ${m1}\n${colors[1]}Master ${colors[6]}Floor 2: ${m2}\n${colors[1]}Master ${colors[6]}Floor 3: ${m3}\n${colors[1]}Master ${colors[6]}Floor 4: ${m4}\n${colors[1]}Master ${colors[6]}Floor 5: ${m5}\n${colors[1]}Master ${colors[6]}Floor 6: ${m6}\n${colors[1]}Master ${colors[6]}Floor 7: ${m7}\n${colors[6]}Total Runs: ${total_master_val}`;
        
          var normal_pb = `${colors[3]}S ${colors[11]}Personal Best\n${colors[6]}Entrance: ${colors[3]}${pbe}\n${colors[6]}Floor 1: ${colors[3]}${pbf1}\n${colors[6]}Floor 2: ${colors[3]}${pbf2}\n${colors[6]}Floor 3: ${colors[3]}${pbf3}\n${colors[6]}Floor 4: ${colors[3]}${pbf4}\n${colors[6]}Floor 5: ${colors[3]}${pbf5}\n${colors[6]}Floor 6: ${colors[3]}${pbf6}\n${colors[6]}Floor 7: ${colors[3]}${pbf7}\n${colors[3]}S+ ${colors[11]}Personal Best\n${colors[6]}Entrance: ${colors[3]}${pbe_plus}\n${colors[6]}Floor 1: ${colors[3]}${pb_plusf1}\n${colors[6]}Floor 2: ${colors[3]}${pb_plusf2}\n${colors[6]}Floor 3: ${colors[3]}${pb_plusf3}\n${colors[6]}Floor 4: ${colors[3]}${pb_plusf4}\n${colors[6]}Floor 5: ${colors[3]}${pb_plusf5}\n${colors[6]}Floor 6: ${colors[3]}${pb_plusf6}\n${colors[6]}Floor 7: ${colors[3]}${pb_plusf7}`;
          var master_pb = `${colors[3]}S ${colors[1]}Master ${colors[11]}Personal Best\n${colors[6]}Floor 1: ${colors[3]}${pbm1}\n${colors[6]}Floor 2: ${colors[3]}${pbm2}\n${colors[6]}Floor 3: ${colors[3]}${pbm3}\n${colors[6]}Floor 4: ${colors[3]}${pbm4}\n${colors[6]}Floor 5: ${colors[3]}${pbm5}\n${colors[6]}Floor 6: ${colors[3]}${pbm6}\n${colors[6]}Floor 7: ${colors[3]}${pbm7}\n${colors[3]}S+ ${colors[1]}Master ${colors[11]}Personal Best\n${colors[6]}Floor 1: ${colors[3]}${pb_plusm1}\n${colors[6]}Floor 2: ${colors[3]}${pb_plusm2}\n${colors[6]}Floor 3: ${colors[3]}${pb_plusm3}\n${colors[6]}Floor 4: ${colors[3]}${pb_plusm4}\n${colors[6]}Floor 5: ${colors[3]}${pb_plusm5}\n${colors[6]}Floor 6: ${colors[3]}${pb_plusm6}\n${colors[6]}Floor 7: ${colors[3]}${pb_plusm7}`;
        
          break_chat(5)
          mid_chat(`${PREFIX} ${name_}`)
          break_chat(5)
          hover_msg(`${colors[1]}Cata: ${cata_lvl}`, `${cata_val}`)
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
          hover_msg(`${colors[6]}Normal ${colors[11]}Personal Best ${colors[15]}(Hover)`,`${normal_pb}`)
          hover_msg(`${colors[1]}Master ${colors[11]}Personal Best ${colors[15]}(Hover)`,`${master_pb}`)
          break_chat(5)
          mid_chat(`${colors[6]}Average Secrets: ${colors[3]}${average_secrets}`)
          mid_chat(`${colors[6]}Total Secrets: ${colors[3]}${secrets_found}`)
        }).catch(function(error) {
          print(error)
          return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Data`);
      });
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
}).setName("pcata")