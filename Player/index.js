/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
const File = Java.type("java.io.File");

import { player_data } from './features/player_feature';
import { pets_feature } from './features/pets_feature';
import { cata_feature } from './features/cata_feature';
import { slayer_feature } from './features/slayer_feature';
import { hotm_feature } from './features/hotm_feature';
import { essence_feature } from './features/essence_feature';
import { nether_feature } from './features/nether_feature';
import { trophy_feature } from './features/trophy_feature';
import { pbot_feature } from './features/bot_feature';
import { inventory_feature } from './features/inventory_feature';
import PogObject from "PogData";
import sleep from 'sleep';
import { break_chat, mid_chat, colors, hover_msg } from "./utils/functions"
import { PREFIX, check_apikey } from "./utils/cons"

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
    break_chat(5)
    mid_chat(`${PREFIX}${colors[6]} Run /phelp For All Commands!`)
    break_chat(5)
    new TextComponent(ChatLib.getCenteredText(`${PREFIX} ${colors[6]}Join Our Discord!  &b&nhttps://discord.gg/SK9UDzquEN ${colors[15]}(Click)`)).setClickAction("open_url").setClickValue("https://discord.gg/SK9UDzquEN").chat()
    break_chat(5)
  });
}
register('command', set_api).setCommandName('pset');
register('command', help).setCommandName('phelp');

register("chat", (key) => {
  data.api_key = key
  data.save()
  mid_chat(`${PREFIX}${colors[6]}Api Key Successfully Set!`);
}).setCriteria(/Your new API key is (.+)/)

function set_api(api_key_set){
  if (!api_key_set){return mid_chat(`${PREFIX}${colors[1]}Error No Api Key Sent`);}
  check_apikey(api_key_set).then(api_data => {
     let aa = api_data
     if (aa.success == true){
       data.api_key = api_key_set;
       data.save();        
       mid_chat(`${PREFIX}${colors[6]}Api Key Successfully Set!`);
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
  mid_chat(`${colors[5]}+ ${colors[3]}/player ${colors[5]}aliases | ${colors[3]}/pskills & /pstats`);
  break_chat(5)
  mid_chat(`${colors[11]}/ppets <Username> ${colors[6]}| Checks Player's Pets`);
  mid_chat(`${colors[1]}/pcata <Username> ${colors[6]}| Checks Player's Cata`);
  mid_chat(`${colors[7]}/pslayers <Username> ${colors[6]}| Checks Player's Slayers`);
  mid_chat(`${colors[5]}+ ${colors[7]}/pslayers ${colors[5]}aliases | ${colors[7]}/pslayer`);
  break_chat(5)
  mid_chat(`${colors[12]}/photm <Username> ${colors[6]}| Checks Player's Mining Data`);
  mid_chat(`${colors[15]}/pessence <Username> ${colors[6]}| Checks Player's Essence Data`);
  mid_chat(`${colors[5]}+ ${colors[15]}/pessence ${colors[5]}aliases | ${colors[15]}/pess`);
  break_chat(5)
  mid_chat(`${colors[10]}/pnether <Username> ${colors[6]}| Checks Player's Nether Data`);
  mid_chat(`${colors[4]}/ptrophy <Username> ${colors[6]}| Checks Player's Trophy Data`);
  mid_chat(`${colors[6]}/phelp | Gives A List Of All The Commands`);
  break_chat(5)
}
import './features/bot_feature';
import './features/inventory_feature';