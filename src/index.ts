

import { AccountClass } from "./account/account.js";
import { EventsClass } from "./events.js";
import { HooksClass } from "./hooks.js";
import { ImagesClass } from "./images.js";
import { LocationClass } from "./locations.js";
import { ProfilesClass } from "./profiles.js";

import { ServersClass } from "./servers/index.js";
export type {
  WordpressAsyncActionResponseType,
  SetupWordpressCliRequest,
  RegisterWordpressInstallationRequest,
  WordpressInstallation,
  WordpressInstallationResponseType,
  InstallWordpressRequest,
  WordpressLockdownRequest,
  WordpressUpdateType,
} from "./servers/wordpress/types.js";
export type {
  MonitoringCheck,
  MonitoringRuleType,
  UpdateMonitoringRuleRequest,
  MonitoringRule,
  MonitoringRuleResponseType,
  MonitoringNoContentResponseType,
  MonitoringOverviewRow,
  MonitoringOverviewResponseType,
  ServerMonitoringConfiguration,
  ServerMonitoringResponseType,
} from "./monitoring/types.js";
export type {
  MailEnableRequest,
  MailManagement,
  MailManagementResponseType,
  MailSetupStatus,
  ImprovmxAlias,
  ImprovmxAliasesResponseType,
} from "./servers/mail/types.js";
export type {
  MetricsSamplingDTO,
  MetricsPercentSamplingDTO,
  MetricsValueSamplingDTO,
  DiskDetailedMetricsDTO,
  NetworkDetailedMetricsDTO,
  CpuDetailedMetricsDTO,
  MemoryDetailedMetricsDTO,
  InstantDiskDetailedMetricsDTO,
  InstantNetworkDetailedMetricsDTO,
  InstantCpuDetailedMetricsDTO,
  InstantMemoryDetailedMetricsDTO,
  DiskMetricsDTO,
  NetworkMetricsDTO,
  CpuMetricsDTO,
  ProcessesMetricsDTO,
  MemoryMetricsDTO,
  ResourceUsageLevel,
  ResourceUsageMetricStatusDTO,
  ResourceUsageProblemResourceDTO,
  ResourceUsageStatusDTO,
  ServerMetricsDTO,
  InstantDiskMetricsDTO,
  InstantNetworkMetricsDTO,
  InstantCpuMetricsDTO,
  InstantProcessesMetricsDTO,
  InstantMemoryMetricsDTO,
  InstantServerMetricsDTO,
  ServerMetricsWarningServerDTO,
  ServerMetricsWarningRowDTO,
  ServerMetricsWarningsOverviewDTO,
  ServerMetricsResponseType,
  InstantServerMetricsResponseType,
  ServerMetricsWarningsOverviewResponseType,
} from "./servers/index.js";
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
