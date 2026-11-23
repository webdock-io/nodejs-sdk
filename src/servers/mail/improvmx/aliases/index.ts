import type { Webdock } from "../../../../index.js";
import type { ImprovmxAliasesResponseType } from "../../types.js";
import { req } from "../../../../utils/req.js";

export class ServerMailImprovmxAliasesClass {
  private readonly parent: Webdock;

  constructor(parent: Webdock) {
    this.parent = parent;
  }

  list(args: { serverSlug: string }) {
    return req<ImprovmxAliasesResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/mail/improvmx/aliases`,
      method: "GET",
    });
  }

  create(args: { serverSlug: string; alias: string; destination: string }) {
    return req<ImprovmxAliasesResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/mail/improvmx/aliases`,
      method: "POST",
      body: {
        alias: args.alias,
        destination: args.destination,
      },
    });
  }

  remove(args: { serverSlug: string; alias: string }) {
    return req<ImprovmxAliasesResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/mail/improvmx/aliases/remove`,
      method: "POST",
      body: { alias: args.alias },
    });
  }
}
