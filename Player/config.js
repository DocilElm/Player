import {
    @Vigilant, 
    @TextProperty, 
    @ColorProperty, 
    @ButtonProperty, 
    @SwitchProperty, 
    Color 
} from 'Vigilance';

@Vigilant("Player", "§2Player Settings", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General", "Dungeons", "Nether"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})
class PlayerSettings {
    constructor() {
        this.initialize(this);
    }
    @SwitchProperty({
        name: "Auto Player View Finder",
        description: "Automatically checks player's stats and inventory on Party Finder join.",
        category: "Dungeons",
        subcategory: "Dungeons"
    })
    auto_pf_check = true
    @SwitchProperty({
        name: "Frag Bot Feature",
        description: "Automatically joins party invites from people in the bot list",
        category: "Dungeons",
        subcategory: "Dungeons"
    })
    bot_feature_check = true
    //
    @SwitchProperty({
        name: "Ghast Alert",
        description: "Alerts you when it's 9pm in the nether for ghast spawning",
        category: "Nether",
        subcategory: "Nether"
    })
    ghast_alert_check = true
}

export default new PlayerSettings();