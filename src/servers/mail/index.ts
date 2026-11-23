import type { Webdock } from "../../index.js";
import { ServerMailCloudflareClass } from "./cloudflare/index.js";

export class ServerMailClass {
  readonly cloudflare: ServerMailCloudflareClass;

  constructor(parent: Webdock) {
    this.cloudflare = new ServerMailCloudflareClass(parent);
  }
}
