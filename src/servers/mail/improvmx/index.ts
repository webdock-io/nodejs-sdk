import type { Webdock } from "../../../index.js";
import { ServerMailImprovmxAliasesClass } from "./aliases/index.js";
import type { MailEnableRequest, MailManagementResponseType } from "../types.js";
import { req } from "../../../utils/req.js";

export class ServerMailImprovmxClass {
  private readonly parent: Webdock;
  readonly aliases: ServerMailImprovmxAliasesClass;

  constructor(parent: Webdock) {
    this.parent = parent;
    this.aliases = new ServerMailImprovmxAliasesClass(parent);
  }

  enable(args: MailEnableRequest) {
    return req<MailManagementResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/mail/improvmx/enable`,
      method: "POST",
      body: {
        domain: args.domain,
        cfZoneId: args.cfZoneId,
        cfAccountId: args.cfAccountId,
        zone: args.zone,
      },
    });
  }

  disable(args: { serverSlug: string }) {
    return req<MailManagementResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/mail/improvmx/disable`,
      method: "POST",
    });
  }
}
