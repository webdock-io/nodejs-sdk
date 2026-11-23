import type { Webdock } from "../../../index.js";
import type { AsyncActionResponseType } from "../../index.js";
import { req } from "../../../utils/req.js";

export type MysqlDatabase = {
  id: number;
  name: string;
  created: string;
  host: string;
  dbUser: { id: number; username: string } | null;
};

export type MysqlDatabasesResponseType = { body: MysqlDatabase[] };

export type CreateMysqlDatabaseRequest = {
  serverSlug: string;
  dbName: string;
  dbUser?: string;
  dbUserPassword?: string;
};

export class ServerMysqlDatabasesClass {
  private readonly parent: Webdock;

  constructor(parent: Webdock) {
    this.parent = parent;
  }

  list(args: { serverSlug: string }) {
    return req<MysqlDatabasesResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/mysql/databases`,
      method: "GET",
    });
  }

  create(args: CreateMysqlDatabaseRequest) {
    return req<AsyncActionResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/mysql/databases`,
      method: "POST",
      body: {
        dbName: args.dbName,
        dbUser: args.dbUser,
        dbUserPassword: args.dbUserPassword,
      },
      headers: ["x-callback-id"],
    });
  }

  remove(args: { serverSlug: string; databaseId: number; deleteDbUser?: boolean; dbUserId?: number }) {
    const params = new URLSearchParams();
    if (args.deleteDbUser !== undefined) params.set("deleteDbUser", String(args.deleteDbUser));
    if (args.dbUserId !== undefined) params.set("dbUserId", String(args.dbUserId));
    const query = params.toString();

    return req<AsyncActionResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/mysql/databases/${args.databaseId}${query ? `?${query}` : ""}`,
      method: "DELETE",
      headers: ["x-callback-id"],
    });
  }
}
