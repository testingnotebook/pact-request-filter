const ProductRepository = require("../provider/product.repository");
const Product = require("../provider/product");

it("should update product", async () => {
  const repository = new ProductRepository();
  let body = {
    id: "10",
    type: "DEBIT_CARD",
    description: "28 Degrees",
    version: "v1",
  };
  const product = await repository.updateProductById("10", body);
  expect(product).toEqual(
    new Map([["10", new Product("10", "DEBIT_CARD", "28 Degrees", "v1")]])
  );
});
