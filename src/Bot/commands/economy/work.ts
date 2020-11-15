import { Command } from "../../../Lib";
import { Message } from "discord.js";

const messages = ["You worked as a {job} and got {money}!"];
const jobs = ["Developer", "Manager", "Police Man", "Firefighter", "Car Instructor",];
export = class WorkCommand extends Command {
    constructor() {
        super("work", {
            category: "economy",
            description: "Put description.",
        });
    }

    public run(message: Message, args: string[]) {
        let member = message.member!;

        const money = Math.floor(Math.random() * 200);

        member.db!.economy.wallet += money;

        const res = messages[Math.floor(Math.random() * messages.length)]
          .replace("{work}", jobs[Math.floor(Math.random() * jobs.length)])
          .replace("{money}", `${money}`);

        message.sem(res);
    }
};
