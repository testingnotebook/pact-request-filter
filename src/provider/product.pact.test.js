const { Verifier } = require("@pact-foundation/pact");
const controller = require("./product.controller");
const Product = require("./product");

const app = require("express")();
const authMiddleware = require("./auth.middleware");
app.use(authMiddleware);
app.use(require("./product.routes"));
app.use(require("body-parser").urlencoded({ extended: false }));
const server = app.listen("8080");

describe("Pact Verification", () => {
  it("validates the expectations of ProductService", () => {
    const baseOpts = {
      logLevel: "INFO",
      providerBaseUrl: "http://localhost:8080",
      providerVersion: "1",
      providerVersionTags: "main",
      verbose: process.env.VERBOSE === "true",
    };

    const pactChangedOpts = {
      pactUrls: [process.env.PACT_URL],
    };

    const fetchPactsDynamicallyOpts = {
      provider: "pactflow-example-provider",
      consumerVersionSelectors: [
        { tag: "test", latest: true },
        { deployed: true, version: 1 },
      ],
      pactBrokerUrl: process.env.PACT_BROKER_BASE_URL,
      enablePending: false,
      includeWipPactsSince: undefined,
    };

    const stateHandlers = {
      "product updated": () => {
        controller.repository.products = new Map([
          ["10", new Product("10", "CREDIT_CARD", "28 Degrees", "v1")],
        ]);
      },
    };

    const requestFilter = (req, res, next) => {
      if (!req.headers["authorization"]) {
        next();
        return;
      }
      req.headers["authorization"] = "Bearer t3s7InGn073b0oK";
      next();
    };

    const opts = {
      ...baseOpts,
      ...(process.env.PACT_URL ? pactChangedOpts : fetchPactsDynamicallyOpts),
      stateHandlers: stateHandlers,
      requestFilter: requestFilter,
      publishVerificationResult: true,
    };

    return new Verifier(opts)
      .verifyProvider()
      .then((output) => {
        console.log("Pact Verification Complete!");
        console.log(output);
      })
      .finally(() => {
        server.close();
      });
  });
});
