

import { AccountClass } from "./account.js";
import { EventsClass } from "./events.js";
import { HooksClass } from "./hooks.js";
import { ImagesClass } from "./images.js";
import { LocationClass } from "./locations.js";
import { ProfilesClass } from "./profiles.js";

import { ServersClass } from "./servers.js";
import { ShellUsersClass } from "./shellusers.js";
import { SshKeysClass } from "./sshkeys.js";
import { SnapshotsClass } from "./snapshots.js";
import * as OldWebdock from "webdock"
import { OperationClass } from "./operation.js";
import { WebdockClass } from "./webdock.js";
import PlatformsClass from "./platforms.js";

export const oldWebdock = OldWebdock

export type WebdockApiRequestReturn<T> = Promise<
  | {
    success: true;
    response: T;
  }
  | {
    success: false;
    error: string;
    errorType: "network" | "server";
    code: number;
  }
>;
export interface WebdockApiRequestOptions<T> {
  token?: string | undefined;
  endpoint: string;
  method: string;
  body?: unknown;
  headers?: ("x-callback-id" | (string & {}))[];
  log?: boolean | undefined;
}

export type WebdockOptions = {
  token?: string;
};


export class Webdock {
  account: AccountClass;
  images: ImagesClass;
  profiles: ProfilesClass;
  events: EventsClass;
  hooks: HooksClass;
  location: LocationClass;
  servers: ServersClass;
  shellUsers: ShellUsersClass;
  sshkeys: SshKeysClass;
  snapshots: SnapshotsClass;
  operation: OperationClass;
  webdock: WebdockClass
  platforms: PlatformsClass
  string_token: string;
  constructor();
  constructor(token: string);
  constructor(options: WebdockOptions);
  constructor(options: string | WebdockOptions = "") {
    const token = typeof options === "string" ? options : options.token ?? "";

    this.string_token = token
    this.account = new AccountClass(this);
    this.images = new ImagesClass(this);
    this.profiles = new ProfilesClass(this);
    this.events = new EventsClass(this);
    this.hooks = new HooksClass(this);
    this.location = new LocationClass(this);
    this.servers = new ServersClass(this);
    this.shellUsers = new ShellUsersClass(this);
    this.sshkeys = new SshKeysClass(this);
    this.snapshots = new SnapshotsClass(this);
    this.operation = new OperationClass(this);
    this.webdock = new WebdockClass(this)
    this.platforms = new PlatformsClass(this)
  }
}
