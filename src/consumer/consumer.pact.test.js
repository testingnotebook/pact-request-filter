const { Pact } = require("@pact-foundation/pact");
const updateProduct = require("./api");
const { Matchers } = require("@pact-foundation/pact");
const product = require("./product");
const { like, regex } = Matchers;

const mockProvider = new Pact({
  consumer: "pactflow-example-consumer",
  provider: "pactflow-example-provider",
});

describe("API Pact test", () => {
  jest.setTimeout(30000);
  beforeAll(() => mockProvider.setup());
  afterEach(() => mockProvider.verify());
  afterAll(() => mockProvider.finalize());

  describe("updating a product", () => {
    it("updates product", async () => {
      const expectedProduct = {
        id: "10",
        type: "CREDIT_CARD",
        description: "28 Degrees",
        version: "v1",
      };

      await mockProvider.addInteraction({
        state: "product updated",
        uponReceiving: "a request to update a product",
        withRequest: {
          method: "POST",
          path: "/product/10",
          headers: {
            Authorization: like("Bearer faketoken"),
            "Content-Type": "application/json",
          },
          body: like(expectedProduct),
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": regex({
              generate: "application/json; charset=utf-8",
              matcher: "application/json;?.*",
            }),
          },
          body: like(expectedProduct),
        },
      });

      const p = await updateProduct(mockProvider.mockService.baseUrl, "10");

      expect(p).toStrictEqual(product(expectedProduct));
    });
  });
});
