import type { Webdock } from "../../index.js";
import type { ArchivedServer } from "../../account/account.js";
import type { AsyncActionResponseType } from "../index.js";
import { req } from "../../utils/req.js";

export type ArchivedServerResponseType = { body: ArchivedServer };
export type ArchivedServersResponseType = { body: ArchivedServer[] };

export class ArchivedServersClass {
  private readonly parent: Webdock;

  constructor(parent: Webdock) {
    this.parent = parent;
  }

  list() {
    return req<ArchivedServersResponseType>({
      token: this.parent.string_token,
      endpoint: "/servers/archived",
      method: "GET",
    });
  }

  getById(args: { archivedServerId: number }) {
    return req<ArchivedServerResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/archived/${args.archivedServerId}`,
      method: "GET",
    });
  }

  remove(args: { archivedServerId: number }) {
    return req<AsyncActionResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/archived/${args.archivedServerId}`,
      method: "DELETE",
      headers: ["x-callback-id"],
    });
  }
}
