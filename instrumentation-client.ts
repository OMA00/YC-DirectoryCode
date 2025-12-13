import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://90fd57402e28e5dd58cba46a6ecb744e@o4510518549741568.ingest.de.sentry.io/4510518553542736",

  integrations: [
    Sentry.replayIntegration(),
  ],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});