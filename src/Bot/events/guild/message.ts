import { Config, Event } from "../../../Lib";
import { Message } from "discord.js";

const prefix = Config.get("prefix");

export = class MessageEvent extends Event {
    constructor() {
        super("MessageCreate");
    }
    async run(message: Message) {
        if(!message.guild || !message.content.startsWith(prefix)) return;

        if(!message.guild!.db) await message.guild!.init()
        if(!message.member!.db) await message.member!.init()
        if(!message.author!.db) await message.author!.init()

        const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = this.bot.commands.get(cmd) || this.bot.commands.find((c) => c.aliases.includes(cmd));

        if(command) command.run(message, args);

    }
}
