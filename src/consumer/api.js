const axios = require("axios");
const adapter = require("axios/lib/adapters/http");
const product = require("./product");

axios.defaults.adapter = adapter;

const updateProduct = async (url, id) => {
  return axios
    .post(
      `${url}/product/` + id,
      {
        id: "11",
        type: "DEBIT_CARD",
        description: "28 Degrees",
        version: "v1",
      },
      {
        headers: {
          Authorization: "faketoken",
        },
      }
    )
    .then((r) => product(r.data));
};

module.exports = updateProduct;
