import type { Webdock } from "../../index.js";
import type { AsyncActionResponseType } from "../index.js";
import { req } from "../../utils/req.js";

export type CronJob = {
  id: number;
  command: string;
  minute: string;
  hour: string;
  day: string;
  month: string;
  dayOfWeek: string;
  user: string;
  isPaused: boolean;
  created: string;
};

export type CronJobsResponseType = { body: CronJob[] };

export type CreateCronJobRequest = {
  serverSlug: string;
  command: string;
  minute?: string;
  hour?: string;
  day?: string;
  month?: string;
  dayOfWeek?: string;
  user?: string;
};

/** Cron deletion can return 202 with a callback ID or 204 without one. */
export type DeleteCronJobResponseType = {
  body: unknown;
  headers: { "x-callback-id"?: string };
};

export class ServerCronJobsClass {
  private readonly parent: Webdock;

  constructor(parent: Webdock) {
    this.parent = parent;
  }

  list(args: { serverSlug: string }) {
    return req<CronJobsResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/cronjobs`,
      method: "GET",
    });
  }

  create(args: CreateCronJobRequest) {
    return req<AsyncActionResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/cronjobs`,
      method: "POST",
      body: {
        command: args.command,
        minute: args.minute,
        hour: args.hour,
        day: args.day,
        month: args.month,
        dayOfWeek: args.dayOfWeek,
        user: args.user,
      },
      headers: ["x-callback-id"],
    });
  }

  remove(args: { serverSlug: string; cronjobId: number }) {
    return req<DeleteCronJobResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/cronjobs/${args.cronjobId}`,
      method: "DELETE",
      headers: ["x-callback-id"],
    });
  }

  pause(args: { serverSlug: string; cronjobId: number }) {
    return req<AsyncActionResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/cronjobs/${args.cronjobId}/pause`,
      method: "POST",
      headers: ["x-callback-id"],
    });
  }

  unpause(args: { serverSlug: string; cronjobId: number }) {
    return req<AsyncActionResponseType>({
      token: this.parent.string_token,
      endpoint: `/servers/${args.serverSlug}/cronjobs/${args.cronjobId}/unpause`,
      method: "POST",
      headers: ["x-callback-id"],
    });
  }
}
