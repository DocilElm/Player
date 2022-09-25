const colors = {
    1: '§4', // Dark Red
    2: '§c', // Red
    3: '§6', // Gold
    4: '§e', // Yellow
    5: '§2', // Dark Green
    6: '§a', // Light Green
    7: '§b', // Aqua
    8: '§3', // Dark Aqua
    9: '§1', // Dark Blue
    10: '§9', // Blue
    11: '§d', // Light Purple
    12: '§5', // Dark Purple
    13: '§0', // Black
    14: '§8', // Dark Gray
    15: '§7', // Gray
    16: '§f' // White
}

const short_number = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
const math_number = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
}
const hover_msg = (msg, msg_hover) =>{ 
  return new TextComponent(ChatLib.getCenteredText(`${msg}`)).setHoverValue(`${msg_hover}`).chat();
}
const break_chat = (id) => {
  return ChatLib.chat(`${colors[id]}${ChatLib.getChatBreak("-")}`)
}
const mid_chat = (msg) => {
  return ChatLib.chat(ChatLib.getCenteredText(`${msg}`));
}
export { 
    short_number, 
    math_number, 
    hover_msg, 
    break_chat,
    mid_chat,
    colors
};