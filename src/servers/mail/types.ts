export type MailSetupStatus = "not_setup" | "pending_verified" | "verified";

export type MailEnableRequest = {
  serverSlug: string;
  domain: string;
} & (
  | { cfZoneId?: never; cfAccountId?: never; zone?: never }
  | { cfZoneId: string; cfAccountId: number; zone?: never }
  /** Legacy combined zone selector; prefer cfZoneId and cfAccountId. */
  | { zone: string; cfAccountId: number; cfZoneId?: never }
);

export type ImprovmxAlias = {
  alias: string;
  email: string;
  destination: string;
  count: number;
};

export type ImprovmxAliasesResponseType = {
  body: ImprovmxAlias[];
};

export type MailManagement = {
  qualifiers: {
    profileEligibleForMailServices: boolean;
    minimumProfilePriceThresholdEurCents: number;
    minimumProfilePriceThresholdInAccountCurrencyCents: number;
    accountCurrency: string;
    premiumRequirementSummary: string;
    postmarkRequiresAccountValidation: boolean;
    postmarkAccountValidated: boolean;
    postmarkSupportContactRequired: boolean;
    postmarkValidationSummary: string;
  };
  postmark: {
    status: MailSetupStatus;
    connected: boolean;
    postmarkServerId: number | null;
    postmarkDomainId: number | null;
    domainName: string | null;
    domainValidation: {
      dkimVerified: boolean;
      dkimHost: string;
      dkimValue: string;
      returnPathVerified: boolean;
      returnPathDomain: string;
      returnPathValue: string;
    } | null;
    dnsRecords: {
      type: "TXT" | "CNAME";
      name: string;
      value: string;
      ttlSeconds: number;
      verified: boolean;
      required: boolean;
      note: string | null;
    }[];
    dnsRecordsUnavailable: boolean;
    smtpConfiguration: {
      host: string;
      port: number;
      fromAddressExample: string;
      credentialsAvailable: boolean;
      apiToken: string | null;
      securityHandling: string;
    } | null;
    outboundStats: {
      sent: number;
      opens: number;
      bounceRate: number;
      spamComplaints: number;
    } | null;
    outboundActivity: {
      messageId: string;
      status: string;
      subject: string;
      recipients: string[];
      receivedAt: string;
    }[];
    statsUnavailable: boolean;
    statsErrorMessage: string | null;
    cleanupWarning?: string | null;
  };
  improvmx: {
    status: MailSetupStatus;
    connected: boolean;
    domainName: string | null;
    dnsRecords: {
      type: "MX" | "TXT";
      name: string;
      value: string;
      priority: number | null;
      ttlSeconds: number;
      note: string | null;
    }[];
    mxVerified: boolean | null;
    inboundStats: {
      receivedCount: number;
      aliasesCount: number;
    } | null;
    aliases: ImprovmxAlias[];
    remoteDomainMissing: boolean;
    statsErrorMessage: string | null;
  };
};

export type MailManagementResponseType = {
  body: MailManagement;
};
