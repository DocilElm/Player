import { get_uuid, g_rank, PREFIX } from "../utils/cons";
import { break_chat, colors, mid_chat, unranked_username } from "./../utils/functions"
let allowed_users = []
register("chat", (username) => {
    if(!allowed_users){return print(`b_error`);}
    username = unranked_username(username)
    if(allowed_users.includes(username)){
        ChatLib.command(`p accept ${username}`)
      }
}).setChatCriteria("${username} has invited you to join their party!")

export const pbot_feature = register("command", (...args) => {
    if(!args || !args[0]){return mid_chat(`${PREFIX}${colors[1]}Please Use /pbot add | remove <Username>`);}
    const data = JSON.parse(FileLib.read("./config/ChatTriggers/modules/Player/.playerData.json"))
    var apikey = `${data.api_key}`;
    if(apikey == null){return mid_chat(`${PREFIX}${colors[1]}Error Invalid Api Key`);}
    if(args[0] == "add"){
        if(!args[1]){return mid_chat(`${PREFIX}${colors[1]}Error No Username Given`);}
        var username = args[1]
        padd(username)
    }
    function padd(username) {
        g_rank(username,apikey).then(rank_data => {
            let name_ = JSON.parse(rank_data).rank;
            get_uuid(username).then(uuid_data => {
                username = uuid_data.data.player.username;
                if(allowed_users.includes(username)){return mid_chat(`${PREFIX} ${name_} ${colors[1]}Already In List`);}
                  allowed_users.push(username)
                  break_chat(5)
                  mid_chat(`${PREFIX}`)
                  break_chat(5)
                  mid_chat(`${colors[6]}Successfully Added ${name_}${colors[6]} To The Bot List`)
                  break_chat(5)
            }).catch(function(error) {
                print(error)
                return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's UUID`);
             });
         
          }).catch(function(error) {
            print(error)
            return mid_chat(`${PREFIX}${colors[1]}Error Getting Player's Data`);
         });
    }
}).setName("pbot")