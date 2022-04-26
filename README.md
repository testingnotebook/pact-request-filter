# pact-request-filter

## Purpose of Repo

Supporting repo for the post at https://testingnotebook.com/using-bearer-token-on-pact/. Please view there for the prerequisites and instructions.

Set the PACT_BROKER_TOKEN and PACT_BROKER_BASE_URL environment variables on the build once it's created.

## Installing & Testing

Install dependencies run `npm i`.

Run the pact consumer tests: `npm run test:consumer`
Publish the pact to broker: `node pact-publisher.js`
Run the pact provider tests: `npm run test:provider`
