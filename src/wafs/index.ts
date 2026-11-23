import type { Webdock } from "../index.js";
import type { EdgeNoContentResponseType, EdgeOptions, EdgeSettings, EdgeUpstream, EdgeUpstreamInput } from "../edge/types.js";
import { req } from "../utils/req.js";

export type WafProtectionLevel = "monitoring" | "full" | "advanced";

export type Waf = {
  id: string;
  name: string;
  domain: string;
  protectionLevel: WafProtectionLevel;
  upstreams: EdgeUpstream[];
  settings: EdgeSettings;
};

export type WafResponseType = { body: Waf };
export type WafsResponseType = { body: Waf[] };

export type WafOptions = EdgeOptions & {
  protectionLevel?: WafProtectionLevel;
  ddosProtection?: boolean;
  ddosProtectionAdvanced?: boolean;
  botguardProtection?: boolean;
};

export type CreateWafRequest = WafOptions & {
  name: string;
  domain: string;
  upstreams: EdgeUpstreamInput[];
};

export type UpdateWafRequest = WafOptions & {
  wafId: string;
  name?: string;
  domain?: string;
  upstreams?: EdgeUpstreamInput[];
};

export class WafsClass {
  private readonly parent: Webdock;

  constructor(parent: Webdock) {
    this.parent = parent;
  }

  list() {
    return req<WafsResponseType>({
      token: this.parent.string_token,
      endpoint: "/wafs",
      method: "GET",
    });
  }

  create(args: CreateWafRequest) {
    return req<WafResponseType>({
      token: this.parent.string_token,
      endpoint: "/wafs",
      method: "POST",
      body: args,
    });
  }

  getById(args: { wafId: string }) {
    return req<WafResponseType>({
      token: this.parent.string_token,
      endpoint: `/wafs/${encodeURIComponent(args.wafId)}`,
      method: "GET",
    });
  }

  update(args: UpdateWafRequest) {
    return req<WafResponseType>({
      token: this.parent.string_token,
      endpoint: `/wafs/${encodeURIComponent(args.wafId)}`,
      method: "PATCH",
      body: {
        name: args.name,
        domain: args.domain,
        protectionLevel: args.protectionLevel,
        upstreams: args.upstreams,
        enableHttp3: args.enableHttp3,
        cacheStaticFiles: args.cacheStaticFiles,
        cacheDynamicPages: args.cacheDynamicPages,
        upstreamsUseHttps: args.upstreamsUseHttps,
        ddosProtection: args.ddosProtection,
        ddosProtectionAdvanced: args.ddosProtectionAdvanced,
        botguardProtection: args.botguardProtection,
      },
    });
  }

  remove(args: { wafId: string }) {
    return req<EdgeNoContentResponseType>({
      token: this.parent.string_token,
      endpoint: `/wafs/${encodeURIComponent(args.wafId)}`,
      method: "DELETE",
    });
  }
}
