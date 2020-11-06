import { Command } from "../../../Lib";
import { Message, MessageEmbed, GuildMember } from "discord.js";
import moment from "moment";

export = class UserInfoCommand extends Command {
  constructor() {
    super("userinfo", {
      aliases: ["ui"],
      description: "Information about a certain user",
    });
  }

  public async run(message: Message, args: string[]) {
    let member = args[0]
      ? ((await message.find("member", args.join(" "))) as GuildMember)
      : message.member!;

    let { user } = member!;

    const roles = member.roles.cache
      .filter((r) => r.id !== message.guild!.id)
      .map((r) => `${r}`);
    const embed = new MessageEmbed()
      .setColor(member.roles.highest.hexColor)
      .setAuthor(
        `${user.tag} information`,
        user.displayAvatarURL({ dynamic: true })
      )
      .addField("User Information", [
        `**Username:** ${user.username}`,
        `**Created At:** ${moment
          .utc(user.createdAt)
          .format("DDDD/MM/YYYY hh:mm:ss")}`,
        `**Status:** ${
          user.presence.status[0].toUpperCase() + user.presence.status.slice(1)
        }`,
        `**Activity:** ${user.presence?.activities[0]?.name ?? "None"}`,
      ])

      .addField("Member Information", [
        `${
          member.nickname ? `**Nickname:** ${member.nickname}` : "- No Nickname"
        }`,
        `**Roles:** ${
          roles.length > 10
            ? roles.slice(0, 10).join(", ") + "..."
            : roles.join(", ")
        }`,
        `**Permissions:**\n - Owner: ${
          message.guild!.owner!.id == message.author.id ? "Yes" : "No"
        } \n - Administrator: ${
          message.member!.hasPermission("ADMINISTRATOR", { checkOwner: true })
            ? "Yes"
            : "No"
        }`,
      ]);

    message.channel.send(embed);
  }
};
