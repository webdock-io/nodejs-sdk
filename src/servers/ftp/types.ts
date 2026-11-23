export type FtpUser = {
  id: number;
  username: string;
  group: string;
  homeDir: string;
  created: string;
};

export type FtpUsersResponseType = { body: FtpUser[] };

export type CreateFtpUserRequest = {
  serverSlug: string;
  username: string;
  password: string;
  group?: string;
  homeDir?: string;
};

export type FtpDaemonStatus = {
  enabled: boolean;
  manageable: boolean;
};

export type FtpDaemonStatusResponseType = { body: FtpDaemonStatus };
