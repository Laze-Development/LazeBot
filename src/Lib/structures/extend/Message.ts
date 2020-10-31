import { Structures, User, GuildMember } from "discord.js";
import { Message } from "discord.js";
import { LazeEmbed } from "../..";

const searchQuery = (query: string, str: string) =>
  new RegExp(`.*${query.split(" ").join(".*")}.*`, "gi").test(str);

export class ExtendedMessage extends Structures.get("Message") {
  public sem(
    content: string,
    options: {
      type?: "base" | "error";
      reply?: boolean;
    } = {
      type: "base",
      reply: false,
    }
  ): Promise<Message> {
    const embed = new LazeEmbed(this)[options?.type || "base"](content);
    return options?.reply ? this.reply(embed) : this.channel.send(embed);
  }

  public async find(
    type: "member" | "user",
    query: string
  ): Promise<User | GuildMember | undefined | null> {
    if (type === "member") {
      if (this.mentions.members!.first())
        return this.mentions.members!.first()!;
      if (this.mentions.users.first() && !this.mentions.members!.first()) {
        return await this.guild!.members.fetch(this.mentions.users.first()!);
      }
      return (
        this.guild!.members.cache.get(query) ||
        this.guild!.members.cache.find((x) =>
          searchQuery(query, x.user.username)
        ) ||
        null
      );
    } else {
      if (this.mentions.users.first()) return this.mentions.users.first();
      return (
        this.client.users.cache.get(query) ||
        this.client.users.cache.find((u) => searchQuery(query, u.username))
      );
    }
  }
}

Structures.extend("Message", () => ExtendedMessage);
