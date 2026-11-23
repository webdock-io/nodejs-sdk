import type { Webdock } from "../../../index.js";
import type {
  InstallWordpressRequest,
  RegisterWordpressInstallationRequest,
  WordpressAsyncActionResponseType,
  WordpressInstallationResponseType,
} from "../types.js";
import { req } from "../../../utils/req.js";

export class ServerWordpressInstallationClass {
  private readonly parent: Webdock;

  constructor(parent: Webdock) {
    this.parent = parent;
  }

  register(args: RegisterWordpressInstallationRequest) {
    return req<WordpressInstallationResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/wordpress/installation`,
      method: "PATCH",
      body: { path: args.path, url: args.url },
    });
  }

  install(args: InstallWordpressRequest) {
    return req<WordpressAsyncActionResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/wordpress/install`,
      method: "POST",
      body: {
        locale: args.locale,
        path: args.path,
        url: args.url,
        title: args.title,
        username: args.username,
        email: args.email,
        dbName: args.dbName,
        dbHost: args.dbHost,
        dbUser: args.dbUser,
        dbPass: args.dbPass,
        adminPassword: args.adminPassword,
      },
      headers: ["x-callback-id"],
    });
  }
}
