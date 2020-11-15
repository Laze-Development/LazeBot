import { Command } from "../../../Lib";
import { Message, MessageEmbed } from "discord.js";

export = class HelpCommand extends Command {
    constructor() {
        super("help", {
            category: "information",
            description: "help yes",
        });
    }

    public run(message: Message, args: string[]) {
        let cmd = this.bot.commands.get(args[0]) || this.bot.commands.find((c) => c.aliases.includes(args[0]))!;
        const embed = new MessageEmbed();
        if (cmd) {
            embed
              .setTitle(`**${ cmd.name }**`)
              .addField(`**Category:**`, cmd.category[0].toUpperCase() + cmd.category.slice(1), true)
              .addField(`**Aliases:**`, cmd.aliases.map((a) => `\`${ a }\``).join(", ") || "There are no aliases for this command.", true)
              .addField(`**Description:**`, cmd.description || "No description")
              .setFooter("Required: `<>` Optional: `[]`")
              .setTimestamp();
        } else {
            const categories = this.bot.commands.reduce((acc: string[], cmd) => acc.includes(cmd.category) ? acc : [...acc, cmd.category], []);

            embed.setTitle("Commands");
            for (let i = 0; i < categories.length; i++) {
                const category = categories[i];
                embed.addField(category[0].toUpperCase() + category.slice(1), this.bot.commands
                  .filter((cmd) => cmd.category === category)
                  .map((x) => `\`${ x.name }\``)
                  .join(", "));
            }
        }
        message.channel.send(embed);
    }
};
