import type { Webdock } from "../../index.js";
import { ServerWordpressInstallationClass } from "./installation/index.js";
import { ServerWordpressLockdownClass } from "./lockdown/index.js";
import { ServerWordpressUpdatesClass } from "./updates/index.js";
import type { SetupWordpressCliRequest, WordpressAsyncActionResponseType } from "./types.js";
import { req } from "../../utils/req.js";

export class ServerWordpressClass {
  private readonly parent: Webdock;
  readonly installation: ServerWordpressInstallationClass;
  readonly lockdown: ServerWordpressLockdownClass;
  readonly updates: ServerWordpressUpdatesClass;

  constructor(parent: Webdock) {
    this.parent = parent;
    this.installation = new ServerWordpressInstallationClass(parent);
    this.lockdown = new ServerWordpressLockdownClass(parent);
    this.updates = new ServerWordpressUpdatesClass(parent);
  }

  setupCli(args: SetupWordpressCliRequest) {
    const body = args.path !== undefined || args.url !== undefined
      ? { path: args.path, url: args.url }
      : undefined;

    return req<WordpressAsyncActionResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/wordpress/setup-cli`,
      method: "POST",
      body,
      headers: ["x-callback-id"],
    });
  }
}
