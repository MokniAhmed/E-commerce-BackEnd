const categoryRoute = require('./categoryRoute');

const userRoute = require('./userRoute');
const authRoute = require('./authRoute');
const subCategoryRoute = require("./subCategoryRoute");
const brandRoute = require("./brandRoute");

const mountRoutes = (app) => {
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/users", userRoute);
  app.use("/api/v1/categories", categoryRoute);
  app.use("/api/v1/subCategory", subCategoryRoute);
  app.use("/api/v1/brand", brandRoute);
};

module.exports = mountRoutes;
