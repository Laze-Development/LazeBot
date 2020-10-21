import { Command } from "../../../Lib";
import {Message, MessageEmbed} from "discord.js";

export = class BalanceCommand extends Command {
    constructor() {
        super("balance", {
            category: "economy",
            aliases: ["bal"],
            description: "Shows your current balance."
        });
    }
    public run(message: Message, args: string[]) {
        let member = message.mentions.members!.first() || message.guild!.members.cache.get(args[0]) || message.member!;
        let { user } = member!

        let bank = member.db!.economy.bank
        let wallet = member.db!.economy.wallet

        let embed = new MessageEmbed()
            .setAuthor(`**${user.tag}'s** balance`, user.displayAvatarURL({ dynamic: true }))
            .setDescription([`Bank balance: **${bank}**`,
            `Wallet balance: **${wallet}**`].join("\n"))
            .setTimestamp()
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))

        message.channel.send(embed)

    }
}
