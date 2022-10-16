import { short_number, hover_msg, break_chat, mid_chat, colors, slayer_loop } from "./../utils/functions"
import { g_rank, PREFIX, get_slayers, get_profile_id } from "./../utils/cons"
export const slayer_feature = register("command", username => {
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
      get_slayers(apikey,profile_id).then(slayer_data => {
            var slayers = slayer_data.profile.members[user_uuid].slayer_bosses;
            if (!slayers){return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Slayers`);}
            //rev
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
            } if(!tara_xp){
              tara_xp = 0;
              tara_lvl = 0;
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
              sven_xp = 0;
              sven_lvl = 0;
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
              eman_xp = 0;
              eman_lvl = 0;
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
              blaze_xp = 0;
              blaze_lvl = 0;
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
}).setName("pslayer").setAliases("pslayers")