import type { Webdock } from "../../../../index.js";
import type { ServerMailCloudflareOptionsResponseType } from "../index.js";
import { req } from "../../../../utils/req.js";

export type UpdateServerMailCloudflareDefaultAliasRequest = {
  serverSlug: string;
  accountId: number;
  zoneId: string;
  zoneName: string;
  pattern?: string;
};

export class ServerMailCloudflareDefaultAliasClass {
  private readonly parent: Webdock;

  constructor(parent: Webdock) {
    this.parent = parent;
  }

  update(args: UpdateServerMailCloudflareDefaultAliasRequest) {
    return req<ServerMailCloudflareOptionsResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/mail/cloudflare/default-alias`,
      method: "PATCH",
      body: {
        accountId: args.accountId,
        zoneId: args.zoneId,
        zoneName: args.zoneName,
        pattern: args.pattern,
      },
    });
  }

  clear(args: { serverSlug: string }) {
    return req<ServerMailCloudflareOptionsResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/mail/cloudflare/default-alias`,
      method: "DELETE",
    });
  }
}
