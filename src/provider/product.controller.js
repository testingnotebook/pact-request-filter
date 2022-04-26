const ProductRepository = require("./product.repository");

const repository = new ProductRepository();

exports.updateProductById = async (req, res) => {
  const product = await repository.updateProductById(req.params.id, req.body);
  return product;
};

exports.repository = repository;
