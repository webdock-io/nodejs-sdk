import type { Webdock } from "../../../index.js";
import type { WordpressAsyncActionResponseType, WordpressLockdownRequest } from "../types.js";
import { req } from "../../../utils/req.js";

export class ServerWordpressLockdownClass {
  private readonly parent: Webdock;

  constructor(parent: Webdock) {
    this.parent = parent;
  }

  enable(args: WordpressLockdownRequest) {
    const body = args.allowedWritePaths !== undefined || args.disallowPhpPaths !== undefined || args.webUserGroup !== undefined
      ? {
          allowedWritePaths: args.allowedWritePaths,
          disallowPhpPaths: args.disallowPhpPaths,
          webUserGroup: args.webUserGroup,
        }
      : undefined;

    return req<WordpressAsyncActionResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/wordpress/lockdown`,
      method: "POST",
      body,
      headers: ["x-callback-id"],
    });
  }

  disable(args: { serverSlug: string }) {
    return req<WordpressAsyncActionResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/wordpress/unlock`,
      method: "POST",
      headers: ["x-callback-id"],
    });
  }
}
