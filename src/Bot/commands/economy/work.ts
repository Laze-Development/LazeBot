import { Command } from "../../../Lib";
import {Message, MessageEmbed} from "discord.js";

export = class WorkCommand extends Command {
    constructor() {
        super("work", {
            category: "economy",
            description: "Put description."
        });
    }
    public run(message: Message, args: string[]) {
        let member = message.member!
        let { user } = member

        let bank = member.db!.economy.bank
        let wallet = member.db!.economy.wallet

        let Work_Messages: string[] = ["You worked as a {job} and got {money}!"]
        let Work_Jobs: string[] = ["Developer", "Manager", "Police Man", "Firefighter", "Car Instructor"]
        let Work_Money = Math.floor(Math.random() * 200)

        member.db!.economy.wallet += Work_Money

        let Work_Responses = Work_Messages[Math.floor(Math.random() * Work_Messages.length)]
        .replace("{work}", (Work_Jobs[Math.floor(Math.random() * Work_Jobs.length)].toString()))
        .replace("{money}", (Work_Money.toString()))

        message.sem(Work_Responses)

    }
}
