import { Webdock } from "./index.js";

export function getClient(): Webdock {
	const token = process.env.WEBDOCK_TOKEN ?? "";
	if (!token) {
		throw new Error("WEBDOCK_TOKEN is required for integration tests");
	}
	return new Webdock(token);
}

export async function waitForCallback(client: Webdock, callbackId?: string) {
	if (!callbackId) return;
	// Simple polling loop using events endpoint

	while (true) {

		const res = await client.operation.fetch(callbackId);
		if (res.success) {
			const ev = res.response.body?.[0];

			if (ev && (ev.status === "finished" || ev.status === "error")) {
				return ev.status;
			}
			await new Promise((r) => setTimeout(r, 3000));
		} else {
			console.error("Error fetching event log:", res.error);
			process.exit(1);

		}

	}
}

export function isE2EEnabled(): boolean {
	return (process.env.WEBDOCK_E2E ?? "").toLowerCase() === "true";
}

