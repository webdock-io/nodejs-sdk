import { config } from "dotenv"
config()

import { AccountClass } from "./account.mts";
import { EventsClass } from "./events.mts";
import { HooksClass } from "./hooks.ts";
import { ImagesClass } from "./images.ts";
import { LocationClass } from "./locations.ts";
import { ProfilesClass } from "./profiles.ts";
import { ScriptsClass } from "./scripts.ts";
import { ServersClass } from "./servers.ts";
import { ShellUsersClass } from "./shellusers.ts";
import { SshKeysClass } from "./sshkeys.ts";
import { SnapshotsClass } from "./snapshots.ts";
import * as OldWebdock from "webdock"
import { OperationClass } from "./operation.ts";

export const oldWebdock = OldWebdock

export type WebdockApiRequestReturn<T> = Promise<
  | {
    success: true;
    response: T;
  }
  | {
    success: false;
    error: string;
    errorType: "network" | "server" | "client";
    code: number;
  }
>;
export interface WebdockApiRequestOptions<T> {
  token?: string | undefined;
  endpoint: string;
  method: string;
  body?: unknown;
  headers?: string[] | undefined;
  log?: boolean | undefined;
}




export class Webdock {
  account: AccountClass;
  images: ImagesClass;
  profiles: ProfilesClass;
  events: EventsClass;
  hooks: HooksClass;
  location: LocationClass;
  scripts: ScriptsClass;
  servers: ServersClass;
  shellUsers: ShellUsersClass;
  sshkeys: SshKeysClass;
  snapshots: SnapshotsClass;
  operation: OperationClass;

  string_token: string;
  constructor(token: string) {
    this.string_token = token
    this.account = new AccountClass(this);
    this.images = new ImagesClass(this);
    this.profiles = new ProfilesClass(this);
    this.events = new EventsClass(this);
    this.hooks = new HooksClass(this);
    this.location = new LocationClass(this);
    this.scripts = new ScriptsClass(this);
    this.servers = new ServersClass(this);
    this.shellUsers = new ShellUsersClass(this);
    this.sshkeys = new SshKeysClass(this);
    this.snapshots = new SnapshotsClass(this);
    this.operation = new OperationClass(this);
  }
}
