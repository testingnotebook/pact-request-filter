const Product = require("./product");

class ProductRepository {
  constructor() {
    this.products = new Map([
      ["10", new Product("10", "CREDIT_CARD", "28 Degrees", "v1")],
    ]);
  }

  async updateProductById(id, body) {
    if (!this.products.get(id)) {
      return null;
    }
    const product = new Product(
      body.id,
      body.type,
      body.description,
      body.version
    );
    return this.products.set(id, product);
  }
}

module.exports = ProductRepository;
