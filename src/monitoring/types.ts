export type MonitoringCheck = "httpcheck" | "pingcheck";
export type MonitoringRuleType = "global" | "custom" | "disabled";

export type UpdateMonitoringRuleRequest = {
  checks: MonitoringCheck[];
  checkInterval: 5 | 10 | 15 | 20 | 25 | 30 | 40 | 50 | 60 | 120;
  /** At least one recipient or callback URL is required by the API. */
  notifyUserIds?: number[];
  callbackUrl?: string | null;
};

export type MonitoringRule = {
  id: number;
  scope: "global" | "server" | "disabled";
  serverSlug: string | null;
  checks: MonitoringCheck[];
  checkInterval: number;
  notifyUserIds: number[];
  callbackUrl: string | null;
};

export type MonitoringRuleResponseType = {
  body: MonitoringRule;
};

/** Axios may represent an HTTP 204 response body as undefined or an empty string. */
export type MonitoringNoContentResponseType = {
  body: undefined | "";
};

export type MonitoringOverviewRow = {
  serverSlug: string;
  serverName: string;
  ruleType: MonitoringRuleType;
  checkInterval: number | null;
  notifyUserIds: number[];
  callbackUrl: string | null;
  lastChecks: {
    checkType: MonitoringCheck;
    lastChecked: string;
    result: boolean;
  }[];
};

export type MonitoringOverviewResponseType = {
  body: MonitoringOverviewRow[];
};

export type ServerMonitoringConfiguration = {
  ruleType: MonitoringRuleType;
  serverRule: MonitoringRule | null;
  effectiveRule: MonitoringRule | null;
};

export type ServerMonitoringResponseType = {
  body: ServerMonitoringConfiguration;
};
