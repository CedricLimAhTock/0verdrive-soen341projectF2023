import Sequelize from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PWD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    define: {
      freezeTableName: true
    }
  }
);

(async () => {
  try {
    console.log(process.env.DB_NAME);
    console.log(process.env.DB_USER);
    console.log(process.env.DB_HOST);
    console.log(process.env.DB_PWD);
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export default sequelize;
