import { Structures } from "discord.js";
import { Message, MessageEmbed } from "discord.js"
import { BaseClient, LazeEmbed } from "../.."

export class ExtendedMessage extends Structures.get("Message") {
    sendEmbed(
        content: string,
        options?: {
            type?: "base" | "error",
            reply?: boolean
        }
    ): Promise<Message> {
        if(!options) {
            options = {
                type: "base",
                reply: false
            }
        }

        const embed = new LazeEmbed(this, (this.client as BaseClient))[
            options!.type || "base"
        ](content)
        return options!.reply ? this.reply(embed) : this.channel.send(embed)
    }
}