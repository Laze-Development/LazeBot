import { Structures } from "discord.js"
import { MemberEntity } from "../..";

export class ExtendedMember extends Structures.get("GuildMember") {
    public db: MemberEntity | null = null;

    constructor() {
        super(arguments[0], arguments[1], arguments[2]);
        (async () => await this.init())();
    }

    async init() {
        this.db = (await MemberEntity.findOne({
            uid: this.id,
            gid: this.guild.id
        })) || new MemberEntity(this.id, this.guild.id);
    }
}

Structures.extend("GuildMember", () => ExtendedMember);
