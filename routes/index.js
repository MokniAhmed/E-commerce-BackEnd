const categoryRoute = require('./categoryRoute');

const userRoute = require('./userRoute');
const authRoute = require('./authRoute');
const subCategoryRoute = require("./subCategoryRoute");
const brandRoute = require("./brandRoute");
const productRoute = require("./productRoute");
const cartRoute = require("./cartRoute");
const orderRoute = require("./orderRoute");
const devisRoute = require("./devisRoute");
const contactRoute = require("./contactRoute");

const mountRoutes = (app) => {
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/users", userRoute);
  app.use("/api/v1/categories", categoryRoute);
  app.use("/api/v1/subCategory", subCategoryRoute);
  app.use("/api/v1/brand", brandRoute);
  app.use("/api/v1/product", productRoute);
  app.use("/api/v1/cart", cartRoute);
  app.use("/api/v1/order", orderRoute);
  app.use("/api/v1/devis", devisRoute);
  app.use("/api/v1/contacts", contactRoute);
};

module.exports = mountRoutes;
