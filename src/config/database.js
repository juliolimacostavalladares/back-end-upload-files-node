module.exports = {
  database: process.env.GSQL_DATABASE,
  username: process.env.GSQL_USERNAME,
  password: process.env.GSQL_PASSWORD,
  host: process.env.GSQL_HOST,
  dialect: process.env.GSQL_DIALECT,
  define: {
    timestamps: true,
  },
};
