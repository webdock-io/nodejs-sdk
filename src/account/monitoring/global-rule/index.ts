import type { Webdock } from "../../../index.js";
import type {
  MonitoringNoContentResponseType,
  MonitoringRuleResponseType,
  UpdateMonitoringRuleRequest,
} from "../../../monitoring/types.js";
import { req } from "../../../utils/req.js";

export class AccountMonitoringGlobalRuleClass {
  private readonly parent: Webdock;

  constructor(parent: Webdock) {
    this.parent = parent;
  }

  get() {
    return req<MonitoringRuleResponseType>({
      token: this.parent.string_token,
      endpoint: "/account/monitoring/globalRule",
      method: "GET",
    });
  }

  update(args: UpdateMonitoringRuleRequest) {
    return req<MonitoringRuleResponseType>({
      token: this.parent.string_token,
      endpoint: "/account/monitoring/globalRule",
      method: "PATCH",
      body: {
        checks: args.checks,
        checkInterval: args.checkInterval,
        notifyUserIds: args.notifyUserIds,
        callbackUrl: args.callbackUrl,
      },
    });
  }

  clear() {
    return req<MonitoringNoContentResponseType>({
      token: this.parent.string_token,
      endpoint: "/account/monitoring/globalRule",
      method: "DELETE",
    });
  }
}
