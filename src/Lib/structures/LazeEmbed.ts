import { MessageEmbed } from "discord.js";
import { BaseClient } from "../";
import { Message } from "discord.js";
import { ExtendedMessage } from "./extend/Message";

export class LazeEmbed extends MessageEmbed {
  public readonly bot: BaseClient;
  public readonly message: ExtendedMessage | Message;

  constructor(message: ExtendedMessage | Message) {
    super();
    this.message = message;
    this.bot = message.client as BaseClient;
  }

  base(content?: string) {
    this.setAuthor(
      this.message.author.username,
      this.message.author.displayAvatarURL({ dynamic: true })
    )
      .setFooter(
        this.bot.user!.username,
        this.bot.user!.displayAvatarURL({ dynamic: true })
      )
      .setColor("#5050ff")
      .setTimestamp();
    if (content) this.setDescription(content);
    return this;
  }
  error(content?: string) {
    return this.base(content).setColor("#8a0000");
  }
}
