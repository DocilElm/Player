/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
import { data, PREFIX, setKey } from "./utils/utils"

import "./features/Player"
import "./features/Slayer"
import "./features/Essence"
import "./features/Cata"
import "./features/Nether"
import "./features/Hotm"

register("command", () => Settings.openGUI()).setName("pgui")

const st = register("step", () => {
    if(!World.isLoaded() || !data.firstTime) return

    data.firstTime = false
    data.save()

    new TextComponent(`${PREFIX} &aJoin Our Discord!  &b&nhttps://discord.gg/SK9UDzquEN &7(click)`).setClickAction("open_url").setClickValue("https://discord.gg/SK9UDzquEN").chat()
    ChatLib.chat(`${PREFIX} &aPlease Set Your api key By Doing /pset <key> or /api new`)

    st.unregister()
}).setFps(1)

register("command", (key) => setKey(key)).setName("pset")
register("chat", (key) => setKey(key)).setCriteria(/^Your new API key is ([\w\d-]+)$/)