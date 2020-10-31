require("dotenv").config({ path: __dirname + "/../.env" });
import {
  BaseClient,
  Config,
  GuildEntity,
  MemberEntity,
  UserEntity,
} from "./Lib";
import { createConnection } from "typeorm";
import "./Lib/structures/extend/Guild";
import "./Lib/structures/extend/GuildMember";
import "./Lib/structures/extend/User";
import "./Lib/structures/extend/Message";

declare module "discord.js" {
  interface Guild {
    db: GuildEntity | null;

    init(): Promise<void>;
  }

  interface GuildMember {
    db: MemberEntity | null;

    init(): Promise<void>;
  }

  interface User {
    db: UserEntity | null;

    init(): Promise<void>;
  }

  interface Message {
    find(
      type: "member" | "user",
      query: string
    ): Promise<GuildMember | User | undefined | null>;

    sem(
      content: string,
      options?: { type?: "base" | "error"; reply?: boolean }
    ): Promise<Message>;
  }
}

(async () => {
  const connection = await createConnection({
    type: "mongodb",
    url: Config.get("uri"),
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    entities: [UserEntity, MemberEntity, GuildEntity],
  });

  const bot = new BaseClient(Config.get("token"));
  bot.start();
})();
