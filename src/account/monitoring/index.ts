import type { Webdock } from "../../index.js";
import { AccountMonitoringGlobalRuleClass } from "./global-rule/index.js";
import type { MonitoringOverviewResponseType } from "../../monitoring/types.js";
import { req } from "../../utils/req.js";

export class AccountMonitoringClass {
  private readonly parent: Webdock;
  readonly globalRule: AccountMonitoringGlobalRuleClass;

  constructor(parent: Webdock) {
    this.parent = parent;
    this.globalRule = new AccountMonitoringGlobalRuleClass(parent);
  }

  overview() {
    return req<MonitoringOverviewResponseType>({
      token: this.parent.string_token,
      endpoint: "/account/monitoring/overview",
      method: "GET",
    });
  }
}
