import type { Webdock } from "../../index";
import { req } from "../../utils/req";

export type CloudflareDefaultAlias = {
  cloudflareAccountId: number;
  zoneId: string;
  zoneName: string;
  aliasPattern: string;
  hasDefaultAlias: boolean;
  customAliasExample: string;
  defaultWebdockAliasExample: string;
  mainUseCase: string;
};

export type CloudflareDefaultAliasResponseType = {
  body: CloudflareDefaultAlias;
};

export type UpdateCloudflareDefaultAliasRequest = {
  accountId: number;
  zoneId: string;
  zoneName: string;
  pattern?: string;
};

export class AccountCloudflareDefaultAlias {
  private readonly parent: Webdock;

  constructor(parent: Webdock) {
    this.parent = parent;
  }

  get() {
    return req<CloudflareDefaultAliasResponseType>({
      token: this.parent.string_token,
      endpoint: "/account/cloudflare/defaultAlias",
      method: "GET",
    });
  }

  update(args: UpdateCloudflareDefaultAliasRequest) {
    return req<CloudflareDefaultAliasResponseType>({
      token: this.parent.string_token,
      endpoint: "/account/cloudflare/defaultAlias",
      method: "PATCH",
      body: args,
    });
  }

  clear() {
    return req<CloudflareDefaultAliasResponseType>({
      token: this.parent.string_token,
      endpoint: "/account/cloudflare/defaultAlias",
      method: "DELETE",
    });
  }
}
