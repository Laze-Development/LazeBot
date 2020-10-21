import { Command } from "../../../Lib";
import {Message, MessageEmbed} from "discord.js";

export = class HelpCommand extends Command {
    constructor() {
        super("help", {
            category: "information",
            description: "help yes"
        });
    }
    public run(message: Message, args: string[]) {

        let cmd = this.bot.commands.get(args[0]) || this.bot.commands.find(c => c.aliases.includes(args[0]))

        if(cmd) {
            let embed = new MessageEmbed()
                .setTitle(`**${cmd.name}**`)
                .addField(`**Category::**`, cmd.category, true)
                .addField(`**Aliases:**`,
                    cmd.aliases.map(a => `\`${a}\``).join(", ") || "There are no aliases for this command.", true)
                .addField(`**Description:**`, cmd.description || "No description")
                .setFooter("Required: `<>` Optional: `[]`")
                .setTimestamp();

            message.channel.send(embed)
        } else {
            // you write this down yes
        }
    }
}
