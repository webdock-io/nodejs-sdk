import type { Webdock } from "../../../index.js";
import type { MailEnableRequest, MailManagementResponseType } from "../types.js";
import { req } from "../../../utils/req.js";

export class ServerMailPostmarkClass {
  private readonly parent: Webdock;

  constructor(parent: Webdock) {
    this.parent = parent;
  }

  enable(args: MailEnableRequest) {
    return req<MailManagementResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/mail/postmark/enable`,
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
      endpoint: `/servers/${args.serverSlug}/mail/postmark/disable`,
      method: "POST",
    });
  }
}
