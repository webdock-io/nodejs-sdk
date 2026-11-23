import type { Webdock } from "../../index.js";
import { ServerMysqlDatabasesClass } from "./databases/index.js";

export class ServerMysqlClass {
  readonly databases: ServerMysqlDatabasesClass;

  constructor(parent: Webdock) {
    this.databases = new ServerMysqlDatabasesClass(parent);
  }
}
