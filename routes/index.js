const categoryRoute = require('./categoryRoute');

const userRoute = require('./userRoute');
const authRoute = require('./authRoute');


const mountRoutes = (app) => {
  app.use('/api/v1/categories', categoryRoute);
  app.use('/api/v1/users', userRoute);
  app.use('/api/v1/auth', authRoute);
};

module.exports = mountRoutes;
