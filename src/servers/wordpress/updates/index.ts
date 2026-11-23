import type { Webdock } from "../../../index.js";
import type { WordpressAsyncActionResponseType, WordpressUpdateType } from "../types.js";
import { req } from "../../../utils/req.js";

export class ServerWordpressUpdatesClass {
  private readonly parent: Webdock;

  constructor(parent: Webdock) {
    this.parent = parent;
  }

  check(args: { serverSlug: string }) {
    return req<WordpressAsyncActionResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/wordpress/check-updates`,
      method: "POST",
      headers: ["x-callback-id"],
    });
  }

  apply(args: { serverSlug: string; updateType: WordpressUpdateType }) {
    return req<WordpressAsyncActionResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/wordpress/update`,
      method: "POST",
      body: { updateType: args.updateType },
      headers: ["x-callback-id"],
    });
  }
}
