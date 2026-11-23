import type { Webdock } from "../../index.js";
import { ServerFtpUsersClass } from "./users/index.js";
import { ServerFtpDaemonClass } from "./daemon/index.js";

export class ServerFtpClass {
  readonly users: ServerFtpUsersClass;
  readonly daemon: ServerFtpDaemonClass;

  constructor(parent: Webdock) {
    this.users = new ServerFtpUsersClass(parent);
    this.daemon = new ServerFtpDaemonClass(parent);
  }
}
