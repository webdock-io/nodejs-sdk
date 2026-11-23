import type { Webdock } from "../../../index.js";
import { ServerMailCloudflareDefaultAliasClass } from "./default-alias/index.js";
import { req } from "../../../utils/req.js";

export type ServerMailCloudflareOptions = {
  hasCredentials: boolean;
  accounts: {
    id: number;
    accountName: string;
  }[];
  defaultAliasSettings: {
    cloudflareAccountId: number;
    zoneId: string;
    zoneName: string;
    aliasPattern: string;
    customAliasExample: string | null;
    defaultWebdockAliasExample: string;
    mainUseCase: string;
  };
};

export type ServerMailCloudflareOptionsResponseType = {
  body: ServerMailCloudflareOptions;
};

export type ServerMailCloudflareZone = {
  id: string;
  name: string;
  value: string;
};

export type ServerMailCloudflareZonesResponseType = {
  body: ServerMailCloudflareZone[];
};

export class ServerMailCloudflareClass {
  private readonly parent: Webdock;
  readonly defaultAlias: ServerMailCloudflareDefaultAliasClass;

  constructor(parent: Webdock) {
    this.parent = parent;
    this.defaultAlias = new ServerMailCloudflareDefaultAliasClass(parent);
  }

  options(args: { serverSlug: string }) {
    return req<ServerMailCloudflareOptionsResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/mail/cloudflare/options`,
      method: "GET",
    });
  }

  zones(args: { serverSlug: string; accountId: number }) {
    return req<ServerMailCloudflareZonesResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/mail/cloudflare/accounts/${args.accountId}/zones`,
      method: "GET",
    });
  }
}
