const forest = require("forest-express-sequelize");
const Sequelize = require("sequelize");
const connection = require("./path/to/your/sequelize/connection");

forest
  .init({
    envSecret: process.env.FOREST_ENV_SECRET,
    authSecret: process.env.FOREST_AUTH_SECRET,
    objectMapping: Sequelize,
    connections: { default: connection },
  })
  .then((FAMiddleware) => {
    app.use(FAMiddleware);
  });

app.use("^(?!forest/?$).*", cors(corsOptions));
