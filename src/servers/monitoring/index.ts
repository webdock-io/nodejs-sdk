import type { Webdock } from "../../index.js";
import type {
  MonitoringNoContentResponseType,
  MonitoringRuleResponseType,
  ServerMonitoringResponseType,
  UpdateMonitoringRuleRequest,
} from "../../monitoring/types.js";
import { req } from "../../utils/req.js";

export class ServerMonitoringClass {
  private readonly parent: Webdock;

  constructor(parent: Webdock) {
    this.parent = parent;
  }

  get(args: { serverSlug: string }) {
    return req<ServerMonitoringResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/monitoring`,
      method: "GET",
    });
  }

  update(args: { serverSlug: string } & UpdateMonitoringRuleRequest) {
    return req<MonitoringRuleResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/monitoring`,
      method: "PATCH",
      body: {
        checks: args.checks,
        checkInterval: args.checkInterval,
        notifyUserIds: args.notifyUserIds,
        callbackUrl: args.callbackUrl,
      },
    });
  }

  useGlobal(args: { serverSlug: string }) {
    return req<MonitoringNoContentResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/monitoring`,
      method: "DELETE",
    });
  }

  disable(args: { serverSlug: string }) {
    return req<MonitoringRuleResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/monitoring/disable`,
      method: "POST",
    });
  }
}
