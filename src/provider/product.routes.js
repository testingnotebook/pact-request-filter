const router = require("express").Router();
const controller = require("./product.controller");
var bodyParser = require("body-parser");

router.use(bodyParser.json());
router.post("/product/:id", async (req, res) => {
  const product = await controller.updateProductById(req, res);
  product
    ? res.send(product.get(req.params.id))
    : res.status(404).send({ message: "Product not found" });
});

module.exports = router;
