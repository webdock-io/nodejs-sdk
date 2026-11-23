import type { Webdock } from "../index.js";
import type { EdgeNoContentResponseType, EdgeOptions, EdgeSettings, EdgeUpstream, EdgeUpstreamInput } from "../edge/types.js";
import { req } from "../utils/req.js";

export type LoadBalancer = {
  id: string;
  name: string;
  domain: string;
  upstreams: EdgeUpstream[];
  settings: EdgeSettings;
};

export type LoadBalancerResponseType = { body: LoadBalancer };
export type LoadBalancersResponseType = { body: LoadBalancer[] };

export type CreateLoadBalancerRequest = EdgeOptions & {
  name: string;
  domain: string;
  /** The API requires at least two upstreams. */
  upstreams: EdgeUpstreamInput[];
};

export type UpdateLoadBalancerRequest = EdgeOptions & {
  loadBalancerId: string;
  name?: string;
  domain?: string;
  upstreams?: EdgeUpstreamInput[];
};

export class LoadBalancersClass {
  private readonly parent: Webdock;

  constructor(parent: Webdock) {
    this.parent = parent;
  }

  list() {
    return req<LoadBalancersResponseType>({
      token: this.parent.string_token,
      endpoint: "/loadbalancers",
      method: "GET",
    });
  }

  create(args: CreateLoadBalancerRequest) {
    return req<LoadBalancerResponseType>({
      token: this.parent.string_token,
      endpoint: "/loadbalancers",
      method: "POST",
      body: args,
    });
  }

  getById(args: { loadBalancerId: string }) {
    return req<LoadBalancerResponseType>({
      token: this.parent.string_token,
      endpoint: `/loadbalancers/${encodeURIComponent(args.loadBalancerId)}`,
      method: "GET",
    });
  }

  update(args: UpdateLoadBalancerRequest) {
    return req<LoadBalancerResponseType>({
      token: this.parent.string_token,
      endpoint: `/loadbalancers/${encodeURIComponent(args.loadBalancerId)}`,
      method: "PATCH",
      body: {
        name: args.name,
        domain: args.domain,
        upstreams: args.upstreams,
        enableHttp3: args.enableHttp3,
        cacheStaticFiles: args.cacheStaticFiles,
        cacheDynamicPages: args.cacheDynamicPages,
        upstreamsUseHttps: args.upstreamsUseHttps,
      },
    });
  }

  remove(args: { loadBalancerId: string }) {
    return req<EdgeNoContentResponseType>({
      token: this.parent.string_token,
      endpoint: `/loadbalancers/${encodeURIComponent(args.loadBalancerId)}`,
      method: "DELETE",
    });
  }
}
