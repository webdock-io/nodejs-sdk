import type { Webdock } from "../../index.js";
import { ServerMailCloudflareClass } from "./cloudflare/index.js";
import { ServerMailImprovmxClass } from "./improvmx/index.js";
import { ServerMailPostmarkClass } from "./postmark/index.js";
import type { MailManagementResponseType } from "./types.js";
import { req } from "../../utils/req.js";

export class ServerMailClass {
  private readonly parent: Webdock;
  readonly cloudflare: ServerMailCloudflareClass;
  readonly postmark: ServerMailPostmarkClass;
  readonly improvmx: ServerMailImprovmxClass;

  constructor(parent: Webdock) {
    this.parent = parent;
    this.cloudflare = new ServerMailCloudflareClass(parent);
    this.postmark = new ServerMailPostmarkClass(parent);
    this.improvmx = new ServerMailImprovmxClass(parent);
  }

  get(args: { serverSlug: string }) {
    return req<MailManagementResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/mail`,
      method: "GET",
    });
  }
}
