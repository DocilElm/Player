import { max_cata_lvl } from './../utils/cata';
import { short_number, math_number, hover_msg, break_chat, mid_chat, colors, pb_date } from "./../utils/functions"
import { g_rank, PREFIX, get_dungeons, get_profile_id } from "./../utils/cons"
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
      get_dungeons(username, cute_name).then(cata_ =>{
        var cdata = cata_.dungeons;
        var secrets_found = cdata.secrets_found;
        var catacombs_lvl = cdata.catacombs.level.levelWithProgress.toFixed(2);
        var catacombs_xp = cdata.catacombs.level.xp;
        secrets_found = short_number(secrets_found);
        var normal_comps = cdata.catacombs.floors;
        var master_comps = cdata.master_catacombs.floors;

        //classes
        var healer = cdata.classes.healer.experience;
        if(!healer) healer = 0.00;
        var mage = cdata.classes.mage.experience;
        if(!mage) mage = 0.00;
        var berserker = cdata.classes.berserk.experience;
        if(!berserker) berserker = 0.00;
        var archer = cdata.classes.archer.experience;
        if(!archer) archer = 0.00;
        var tank = cdata.classes.tank.experience;
        if(!tank) tank = 0.00;
  
        //healer
        var healer_lvl = healer.levelWithProgress.toFixed(2);
        var healer_xp = healer.xp;
        if(!healer_xp) healer_xp = 0.00;
        //mage
        var mage_lvl = mage.levelWithProgress.toFixed(2);;
        var mage_xp = mage.xp;
        if(!mage_xp) mage_xp = 0.00;
        //berserker
        var berserker_lvl = berserker.levelWithProgress.toFixed(2);
        var berserker_xp = berserker.xp;
        if(!berserker_xp) berserker_xp = 0.00;
        //archer
        var archer_lvl = archer.levelWithProgress.toFixed(2);
        var archer_xp = archer.xp;
        if(!archer_xp) archer_xp = 0.00;
        //tank
        var tank_lvl = tank.levelWithProgress.toFixed(2);
        var tank_xp = tank.xp;
        if(!tank_xp) tank_xp = 0.00;
  
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
          if(!normal_comps[0] || normal_comps[0].stats.tier_completions){
            var entrance = 0
          }else{
            var entrance = normal_comps[0].stats.tier_completions;
            if(!normal_comps[0].stats.fastest_time_s){
              var pbe = 0
            }else{
              var pbe = normal_comps[0].stats.fastest_time_s
              pbe = pb_date(pbe)
            }
            if(!normal_comps[0].stats.fastest_time_s_plus){
              var pbe_plus = 0
            }else{
              var pbe_plus = normal_comps[0].stats.fastest_time_s_plus
              pbe_plus = pb_date(pbe_plus)
            }
          }
          if(!normal_comps[1] || normal_comps[1].stats.tier_completions){
            var f1 = 0
          }else{
            var f1 = normal_comps[1].stats.tier_completions;
            if(!normal_comps[1].stats.fastest_time_s){
              var pbf1 = 0
            }else{
              var pbf1 = normal_comps[1].stats.fastest_time_s
              pbf1 = pb_date(pbf1)
            }
            if(!normal_comps[1].stats.fastest_time_s_plus){
              var pb_plusf1 = 0
            }else{
              var pb_plusf1 = normal_comps[1].stats.fastest_time_s_plus
              pb_plusf1 = pb_date(pb_plusf1)
            }
          } if(!normal_comps[2] || normal_comps[2].stats.tier_completions){
            var f2 = 0
          }else{
            var f2 = normal_comps[2].stats.tier_completions;
            if(!normal_comps[2].stats.fastest_time_s){
              var pbf2 = 0
            }else{
              var pbf2 = normal_comps[2].stats.fastest_time_s
              pbf2 = pb_date(pbf2)
            }
            if(!normal_comps[2].stats.fastest_time_s_plus){
              var pb_plusf2 = 0
            }else{
              var pb_plusf2 = normal_comps[2].stats.fastest_time_s_plus
              pb_plusf2 = pb_date(pb_plusf2)
            }
          } if(!normal_comps[3] || normal_comps[3].stats.tier_completions){
            var f3 = 0
          }else{
            var f3 = normal_comps[3].stats.tier_completions;
            if(!normal_comps[3].stats.fastest_time_s){
              var pbf3 = 0
            }else{
              var pbf3 = normal_comps[3].stats.fastest_time_s
              pbf3 = pb_date(pbf3)
            }
            if(!normal_comps[3].stats.fastest_time_s_plus){
              var pb_plusf3 = 0
            }else{
              var pb_plusf3 = normal_comps[3].stats.fastest_time_s_plus
              pb_plusf3 = pb_date(pb_plusf3)
            }
          } if(!normal_comps[4] || normal_comps[4].stats.tier_completions){
            var f4 = 0
          }else{
            var f4 = normal_comps[4].stats.tier_completions;
            if(!normal_comps[4].stats.fastest_time_s){
              var pbf4 = 0
            }else{
              var pbf4 = normal_comps[4].stats.fastest_time_s
              pbf4 = pb_date(pbf4)
            }
            if(!normal_comps[4].stats.fastest_time_s_plus){
              var pb_plusf4 = 0
            }else{
              var pb_plusf4 = normal_comps[4].stats.fastest_time_s_plus
              pb_plusf4 = pb_date(pb_plusf4)
            }
          } if(!normal_comps[5] || normal_comps[5].stats.tier_completions){
            var f5 = 0
          }else{
            var f5 = normal_comps[5].stats.tier_completions;
            if(!normal_comps[5].stats.fastest_time_s){
              var pbf5 = 0
            }else{
              var pbf5 = normal_comps[5].stats.fastest_time_s
              pbf5 = pb_date(pbf5)
            }
            if(!normal_comps[5].stats.fastest_time_s_plus){
              var pb_plusf5 = 0
            }else{
              var pb_plusf5 = normal_comps[5].stats.fastest_time_s_plus
              pb_plusf5 = pb_date(pb_plusf5)
            }
          } if(!normal_comps[6] || normal_comps[6].stats.tier_completions){
            var f6 = 0
          }else{
            var f6 = normal_comps[6].stats.tier_completions;
            if(!normal_comps[6].stats.fastest_time_s){
              var pbf6 = 0
            }else{
              var pbf6 = normal_comps[6].stats.fastest_time_s
              pbf6 = pb_date(pbf6)
              if(!normal_comps[6].stats.fastest_time_s_plus){
                var pb_plusf6 = 0
              }else{
                var pb_plusf6 = normal_comps[6].stats.fastest_time_s_plus
                pb_plusf6 = pb_date(pb_plusf6)
              }
            }
          } if(!normal_comps[7] || normal_comps[7].stats.tier_completions){
            var f7 = 0
          }else{
            var f7 = normal_comps[7].stats.tier_completions;
            if(!normal_comps[7].stats.fastest_time_s){
              var pbf7 = 0
            }else{
              var pbf7 = normal_comps[7].stats.fastest_time_s
              pbf7 = pb_date(pbf7)
            }
            if(!normal_comps[7].stats.fastest_time_s_plus){
              var pb_plusf7 = 0
            }else{
              var pb_plusf7 = normal_comps[7].stats.fastest_time_s_plus
              pb_plusf7 = pb_date(pb_plusf7)
            }
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
          if(!master_comps[1] || master_comps[1].stats.tier_completions){
            var m1 = 0
          }else{
            var m1 = master_comps[1].stats.tier_completions;
            if(!master_comps[1].stats.fastest_time_s){
              var pbm1 = 0
            }else{
              var pbm1 = master_comps[1].stats.fastest_time_s
              pbm1 = pb_date(pbm1)
            }
            if(!master_comps[1].stats.fastest_time_s_plus){
              var pb_plusm1 = 0
            }else{
              var pb_plusm1 = master_comps[1].stats.fastest_time_s_plus
              pb_plusm1 = pb_date(pb_plusm1)
            }
          } if(!master_comps[2] || master_comps[2].stats.tier_completions){
            var m2 = 0
          }else{
            var m2 = master_comps[2].stats.tier_completions;
            if(!master_comps[2].stats.fastest_time_s){
              var pbm2 = 0
            }else{
              var pbm2 = master_comps[2].stats.fastest_time_s
              pbm2 = pb_date(pbm2)
            }
            if(!master_comps[2].stats.fastest_time_s_plus){
              var pb_plusm2 = 0
            }else{
              var pb_plusm2 = master_comps[2].stats.fastest_time_s_plus
              pb_plusm2 = pb_date(pb_plusm2)
            }
          } if(!master_comps[3] || master_comps[3].stats.tier_completions){
            var m3 = 0
          }else{
            var m3 = master_comps[3].stats.tier_completions;
            if(!master_comps[3].stats.fastest_time_s){
              var pbm3 = 0
            }else{
              var pbm3 = master_comps[3].stats.fastest_time_s
              pbm3 = pb_date(pbm3)
            }
            if(!master_comps[3].stats.fastest_time_s_plus){
              var pb_plusm3 = 0
            }else{
              var pb_plusm3 = master_comps[3].stats.fastest_time_s_plus
              pb_plusm3 = pb_date(pb_plusm3)
            }
          } if(!master_comps[4] || !master_comps[4].stats.tier_completions){
            var m4 = 0
          }else{
            var m4 = master_comps[4].stats.tier_completions;
            if(!master_comps[4].stats.fastest_time_s){
              var pbm4 = 0
            }else{
              var pbm4 = master_comps[4].stats.fastest_time_s
              pbm4 = pb_date(pbm4)
            }
            if(!master_comps[2].stats.fastest_time_s_plus){
              var pb_plusm4 = 0
            }else{
              var pb_plusm4 = master_comps[4].stats.fastest_time_s_plus
              pb_plusm4 = pb_date(pb_plusm4)
            }
          } if(!master_comps[5] || master_comps[5].stats.tier_completions){
            var m5 = 0
          }else{
            var m5 = master_comps[5].stats.tier_completions;
            if(!master_comps[5].stats.fastest_time_s){
              var pbm5 = 0
            }else{
              var pbm5 = master_comps[5].stats.fastest_time_s
              pbm5 = pb_date(pbm5)
            }
            if(!master_comps[2].stats.fastest_time_s_plus){
              var pb_plusm5 = 0
            }else{
              var pb_plusm5 = master_comps[5].stats.fastest_time_s_plus
              pb_plusm5 = pb_date(pb_plusm5)
            }
          } if(!master_comps[6] || master_comps[6].stats.tier_completions){
            var m6 = 0
          }else{
            var m6 = master_comps[6].stats.tier_completions;
            if(!master_comps[6].stats.fastest_time_s){
              var pbm6 = 0
            }else{
              var pbm6 = master_comps[6].stats.fastest_time_s
              pbm6 = pb_date(pbm6)
            }
            if(!master_comps[6].stats.fastest_time_s_plus){
              var pb_plusm6 = 0
            }else{
              var pb_plusm6 = master_comps[6].stats.fastest_time_s_plus
              pb_plusm6 = pb_date(pb_plusm6)
            }
          } if(!master_comps[7] || master_comps[7].stats.tier_completions){
            var m7 = 0
          }else{
            var m7 = master_comps[7].stats.tier_completions;
            if(!master_comps[2].stats.fastest_time_s){
              var pbm7 = 0
            }else{
              var pbm7 = master_comps[7].stats.fastest_time_s
              pbm7 = pb_date(pbm7)
            }
            if(!master_comps[7].stats.fastest_time_s_plus){
              var pb_plusm7 = 0
            }else{
              var pb_plusm7 = master_comps[7].stats.fastest_time_s_plus
              pb_plusm7 = pb_date(pb_plusm7)
            }
          }
        }
        
        var total_runs = (entrance+f1+f2+f3+f4+f5+f6+f7+m1+m2+m3+m4+m5+m6+m7);
        var secrets_found_av = cdata.secrets_found;
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
        hover_msg(`${colors[6]}Normal ${colors[11]}Personal Best ${colors[15]}(Hover)`,`${normal_pb}`)
        hover_msg(`${colors[1]}Master ${colors[11]}Personal Best ${colors[15]}(Hover)`,`${master_pb}`)
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
}).setName("pcata")