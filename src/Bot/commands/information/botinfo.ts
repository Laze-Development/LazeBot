import { Command, LazeEmbed, Config } from "../../../Lib";
import { Message, version } from "discord.js";
import ms from "ms";
import os from "os";
import { utc } from "moment";

const formatMemory = (data: number): number => Math.round(data / 1024 / 1024 * 100) / 100;

export = class BotInfoCommand extends Command {
    constructor() {
        super("botinfo", {
            aliases: ["bi"]
        })
    }
    run(message: Message, args: string[]) {
        const infoEmbed = new LazeEmbed(message)
          .base()
          .addField("User", [
              `>>> **Discord.js Version**: ${version}`,
              `**Uptime**: ${ms(this.bot!.uptime!)}`,
              `**Ping**: ${this.bot!.ws.ping}ms`,
              `**Guilds(Servers)**: ${this.bot!.guilds.cache.size}`,
              `**Users (Cached)**: ${this.bot!.users.cache.size}`,
              `**Channels**: ${this.bot!.channels.cache.size}`,
              `**Creation Date**: ${utc(this.bot!.user!.createdTimestamp).format(
                "Do MMMM YYYY HH:mm:ss"
              )}`,
              `**Default Prefix**: ${Config.get("prefix")}`
          ], true)
          .addField("System", [
            `>>> **NodeJS Version:** ${process.version}`,
            `**Platform:** ${os.platform}`,
            `**Uptime:** ${ms(os.uptime() * 1000)}`,
            `**Ram Usage:**\nProcess: ${formatMemory(process.memoryUsage().heapUsed)}MB / ${formatMemory(process.memoryUsage().heapTotal)}MB\nTotal: ${(formatMemory(os.totalmem() - os.freemem()) / 1000).toFixed()}GB / ${(formatMemory(os.totalmem()) / 1000).toFixed()}GB`
          ], true);

        message.channel.send(infoEmbed);
    }
}
