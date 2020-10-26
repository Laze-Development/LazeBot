import { Command } from "../../../Lib";
import { Message, MessageEmbed } from "discord.js";
import moment from "moment"

interface PermissionsIndex {
	[key: string]: string;
}

const PERMISSIONS: PermissionsIndex = {
	ADMINISTRATOR: 'Administrator',
	VIEW_AUDIT_LOG: 'View audit log',
	MANAGE_GUILD: 'Manage server',
	MANAGE_ROLES: 'Manage roles',
	MANAGE_CHANNELS: 'Manage channels',
	KICK_MEMBERS: 'Kick members',
	BAN_MEMBERS: 'Ban members',
	CREATE_INSTANT_INVITE: 'Create instant invite',
	CHANGE_NICKNAME: 'Change nickname',
	MANAGE_NICKNAMES: 'Manage nicknames',
	MANAGE_EMOJIS: 'Manage emojis',
	MANAGE_WEBHOOKS: 'Manage webhooks',
	VIEW_CHANNEL: 'Read text channels and see voice channels',
	SEND_MESSAGES: 'Send messages',
	SEND_TTS_MESSAGES: 'Send TTS messages',
	MANAGE_MESSAGES: 'Manage messages',
	EMBED_LINKS: 'Embed links',
	ATTACH_FILES: 'Attach files',
	READ_MESSAGE_HISTORY: 'Read message history',
	MENTION_EVERYONE: 'Mention everyone',
	USE_EXTERNAL_EMOJIS: 'Use external emojis',
	ADD_REACTIONS: 'Add reactions',
	CONNECT: 'Connect',
	SPEAK: 'Speak',
	MUTE_MEMBERS: 'Mute members',
	DEAFEN_MEMBERS: 'Deafen members',
	MOVE_MEMBERS: 'Move members',
	USE_VAD: 'Use voice activity',
};

export = class UserInfoCommand extends Command {
    constructor() {
        super("user", {
            category: "information",
            description: "help yes"
        });
    }

    public run(message: Message, args: string[]) {
        let member = message.mentions.members!.first() || message.guild!.members.cache.get(args[0]) || message.member!;
        let { user } = member!

        const permissions = Object.keys(PERMISSIONS).filter(
            // @ts-ignore
            (permission) => member.permissions.serialize()[permission]);

        const roles = member.roles.cache
        .filter(r => r.id !== message.guild!.id)
        .map(r => `\`${r.name}\``)
        .join(", ")
            
        const embed = new MessageEmbed()
        .setColor(member.roles.highest.hexColor)
        .setAuthor(`${user.tag} information`, user.displayAvatarURL({ dynamic: true }))
        .addField("• User Information", 
        `- Username: ${user.username}
        - Created At: ${moment.utc(user.createdAt).format("DDDD/MM/YYYY hh:mm:ss")}
        - Status: ${user.presence.status.toUpperCase()}
        - Activity: ${user.presence.activities[0].name ?? "None"}`)

        .addField("- Member Information", 
        `${member.nickname ? `- Nickname: ${member.nickname}` : "- No Nickname"}
        - Roles: ${roles}
        - Permissions: ${permissions.map((p) => `\`${PERMISSIONS[p]}\``).join(', ') || 'None'}`)

        message.channel.send(embed)

    }
}