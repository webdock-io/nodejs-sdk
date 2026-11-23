import type { Webdock } from "../../../index.js";
import type { AsyncActionResponseType } from "../../index.js";
import type { CreateFtpUserRequest, FtpUsersResponseType } from "../types.js";
import { req } from "../../../utils/req.js";

export class ServerFtpUsersClass {
  private readonly parent: Webdock;

  constructor(parent: Webdock) {
    this.parent = parent;
  }

  list(args: { serverSlug: string }) {
    return req<FtpUsersResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/ftp/users`,
      method: "GET",
    });
  }

  create(args: CreateFtpUserRequest) {
    return req<AsyncActionResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/ftp/users`,
      method: "POST",
      body: {
        username: args.username,
        password: args.password,
        group: args.group,
        homeDir: args.homeDir,
      },
      headers: ["x-callback-id"],
    });
  }

  remove(args: { serverSlug: string; ftpUserId: number }) {
    return req<AsyncActionResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/ftp/users/${args.ftpUserId}`,
      method: "DELETE",
      headers: ["x-callback-id"],
    });
  }
}
