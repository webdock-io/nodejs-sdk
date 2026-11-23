import type { Webdock } from "../../index";
import { req } from "../../utils/req";
import { AccountCloudflareDefaultAlias } from "./default-alias";

export type CloudflareCredential = {
  id: number;
  accountName: string;
  username: string;
  authMode: "global_api_key" | "api_token";
};

export type CloudflareZone = {
  id: string;
  name: string;
  value: string;
};

export type ListCloudflareCredentialsResponseType = {
  body: CloudflareCredential[];
};

export type ListCloudflareZonesResponseType = {
  body: CloudflareZone[];
};

export type CreateCloudflareCredentialRequest = {
  accountName: string;
  authMode: CloudflareCredential["authMode"];
  username?: string;
  apiKey: string;
};

export type UpdateCloudflareCredentialRequest = {
  credentialId: number;
  accountName: string;
  authMode?: CloudflareCredential["authMode"];
  username?: string;
  apiKey: string;
};

export class AccountCloudflare {
  private readonly parent: Webdock | null;
  readonly credentials: AccountCloudflareCredentials | null;
  readonly defaultAlias: AccountCloudflareDefaultAlias;

  constructor(parent: Webdock) {
    this.parent = parent;
    this.credentials = new AccountCloudflareCredentials(parent);
    this.defaultAlias = new AccountCloudflareDefaultAlias(parent);
  }
}

class AccountCloudflareCredentials {
  private readonly parent: Webdock | null;

  constructor(parent: Webdock) {
    this.parent = parent;
  }

  list() {
    return req<ListCloudflareCredentialsResponseType>({
      token: this.parent?.string_token,
      endpoint: "/account/cloudflare/credentials",
      method: "GET",
    });
  }

  create(args: CreateCloudflareCredentialRequest) {
    return req<ListCloudflareCredentialsResponseType>({
      token: this.parent?.string_token,
      endpoint: "/account/cloudflare/credentials",
      method: "POST",
      body: {
        accountName: args.accountName,
        authMode: args.authMode,
        username: args.username,
        apiKey: args.apiKey,
      },
    });
  }

  update(args: UpdateCloudflareCredentialRequest) {
    return req<ListCloudflareCredentialsResponseType>({
      token: this.parent?.string_token,
      endpoint: `/account/cloudflare/credentials/${args.credentialId}`,
      method: "PATCH",
      body: {
        accountName: args.accountName,
        authMode: args.authMode,
        username: args.username,
        apiKey: args.apiKey,
      },
    });
  }

  remove(args: { credentialId: number }) {
    return req<ListCloudflareCredentialsResponseType>({
      token: this.parent?.string_token,
      endpoint: `/account/cloudflare/credentials/${args.credentialId}`,
      method: "DELETE",
    });
  }

  ListZones(args: { credentialId: number }) {
    return req<ListCloudflareZonesResponseType>({
      token: this.parent?.string_token,
      endpoint: `/account/cloudflare/credentials/${args.credentialId}/zones`,
      method: "GET",
    });
  }
}
