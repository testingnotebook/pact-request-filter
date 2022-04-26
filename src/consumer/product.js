const product = (product) => {
  return {
    id: product.id,
    name: product.description,
    type: product.type,
  };
};

module.exports = product;
