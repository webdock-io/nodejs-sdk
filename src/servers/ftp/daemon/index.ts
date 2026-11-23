import type { Webdock } from "../../../index.js";
import type { AsyncActionResponseType } from "../../index.js";
import type { FtpDaemonStatusResponseType } from "../types.js";
import { req } from "../../../utils/req.js";

export class ServerFtpDaemonClass {
  private readonly parent: Webdock;

  constructor(parent: Webdock) {
    this.parent = parent;
  }

  get(args: { serverSlug: string }) {
    return req<FtpDaemonStatusResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/ftp/daemon`,
      method: "GET",
    });
  }

  enable(args: { serverSlug: string }) {
    return req<AsyncActionResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/ftp/daemon/enable`,
      method: "POST",
      headers: ["x-callback-id"],
    });
  }

  disable(args: { serverSlug: string }) {
    return req<AsyncActionResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/ftp/daemon/disable`,
      method: "POST",
      headers: ["x-callback-id"],
    });
  }
}
