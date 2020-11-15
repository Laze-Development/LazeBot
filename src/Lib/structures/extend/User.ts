import { Structures } from "discord.js"
import { UserEntity } from "../..";

export class ExtendedUser extends Structures.get("User") {
    public db: UserEntity | null = null;

    constructor() {
        super(arguments[0], arguments[1]);
        (async () => await this.init())();
    }

    async init() {
        this.db = (await UserEntity.findOne({
            uid: this.id,
        })) || new UserEntity(this.id);
    }
}

Structures.extend("User", () => ExtendedUser);
