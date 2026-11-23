export type EdgeUpstreamInput = {
  slug?: string;
  name: string;
  ipv4: string;
  zone?: string;
};

export type EdgeUpstream = {
  slug: string;
  name: string;
  ipv4: string;
  zone: string;
};

export type EdgeSettings = {
  enable_http3: boolean;
  force_https: boolean;
  cache_static_files: boolean;
  cache_dynamic_pages: boolean;
  force_subdomains_redirect: boolean;
  upstreams_use_https: boolean;
  ddos_protection: boolean;
  ddos_protection_advanced: boolean;
  botguard_protection: boolean;
  early_hints: boolean;
};

export type EdgeOptions = {
  enableHttp3?: boolean;
  cacheStaticFiles?: boolean;
  cacheDynamicPages?: boolean;
  upstreamsUseHttps?: boolean;
};

export type EdgeNoContentResponseType = { body: undefined | "" };
