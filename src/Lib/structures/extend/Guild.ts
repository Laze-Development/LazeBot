import { Structures } from "discord.js";
import { GuildEntity } from "../..";

export class ExtendedGuild extends Structures.get('Guild') {
    public db: GuildEntity | null = null;

    constructor() {
        super(arguments[0], arguments[1]);
        (async () => await this.init())();
    }

    async init() {
        this.db = (await GuildEntity.findOne({ gid: this.id })) ||
            new GuildEntity(this.id);
    }
}

Structures.extend('Guild', () => ExtendedGuild);
