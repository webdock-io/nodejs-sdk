export type WordpressAsyncActionResponseType = {
  body: unknown;
  headers: { "x-callback-id": string };
};

export type SetupWordpressCliRequest = {
  serverSlug: string;
  /** Absolute path to an existing WordPress installation. */
  path?: string;
  /** Used when linking an existing installation through path. */
  url?: string | null;
};

export type RegisterWordpressInstallationRequest = {
  serverSlug: string;
  path: string;
  url?: string | null;
};

export type WordpressInstallation = {
  status: string;
  path: string;
  url: string | null;
};

export type WordpressInstallationResponseType = {
  body: WordpressInstallation;
};

export type InstallWordpressRequest = {
  serverSlug: string;
  locale: string;
  path: string;
  url: string;
  title: string;
  username: string;
  email: string;
  dbName?: string;
  dbHost?: string;
  adminPassword?: string;
} & (
  | { dbUser?: never; dbPass?: never }
  | { dbUser: string; dbPass: string }
);

export type WordpressLockdownRequest = {
  serverSlug: string;
  allowedWritePaths?: string[];
  disallowPhpPaths?: string[];
  webUserGroup?: string;
};

export type WordpressUpdateType = "core" | "plugins" | "all";
