import { Structures } from "discord.js";
import { Message } from "discord.js"
import { LazeEmbed } from "../.."
import { ExtendedUser } from "./User";

export class ExtendedMessage extends Structures.get("Message") {
    sem(content: string, options: {
        type?: "base" | "error", reply?: boolean
    } = {
        type: "base",
        reply: false
    }): Promise<Message> {
        const embed = new LazeEmbed(this)[options?.type || "base"](content)
        return options?.reply ? this.reply(embed) : this.channel.send(embed)
    }
}

Structures.extend("Message", () => ExtendedMessage);
