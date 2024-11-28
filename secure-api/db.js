const mysql = require("mysql2");
const { Sequelize, QueryTypes } = require("sequelize");
require("dotenv").config();

// Use the Sequelize instance properly
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    operatorsAliases: 0,
    logging: false,
  }
);

const execute = async (query) => {
  try {
    await sequelize.authenticate();
    const rows = await sequelize.query(query, { type: QueryTypes.SELECT });
    return Promise.resolve(rows);
  } catch (error) {
    return Promise.reject(error);
  }
};

const remove = async (query) => {
  try {
    await sequelize.authenticate();
    const rows = await sequelize.query(query, { type: QueryTypes.DELETE });
    return Promise.resolve(1);
  } catch (error) {
    return Promise.reject(error);
  }
};

const insert = async (tableName, param) => {
  try {
    await sequelize.authenticate();
    let paramKeys = Object.keys(param);
    const query = `
      INSERT INTO ${process.env.DB_NAME}.${tableName}
      (${paramKeys.join(", ")}) 
      VALUES
      (${paramKeys.map((key) => `"${param[key]}"`).join(", ")})
    `;
    console.log(query);
    const rows = await sequelize.query(query, { type: QueryTypes.INSERT });
    return Promise.resolve(rows);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateOne = async (query) => {
  try {
    await sequelize.authenticate();
    const rows = await sequelize.query(query, { type: QueryTypes.UPDATE });
    return Promise.resolve(rows.length > 0 ? rows[0] : null);
  } catch (error) {
    return Promise.reject(error);
  }
};

const insertMany = async (tableName, param) => {
  try {
    await sequelize.authenticate();
    let itemKeys = Object.keys(param[0]);
    let query = `INSERT INTO ${process.env.DB_NAME}.${tableName} (${itemKeys.join(",")}) VALUES `;
    
    for (let obj of param) {
      let itemValues = [];
      itemKeys.forEach((item) => {
        let val = obj[item];
        if (val) {
          val = val.toString().replace(/'/g, "''");
        }
        itemValues.push(val);
      });
      query += `('${itemValues.join("','")}'),`;
    }
    
    query = query.slice(0, -1); // Remove the last comma
    const rows = await sequelize.query(query, { type: QueryTypes.INSERT });
    return Promise.resolve(rows);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = { execute, remove, insert, insertMany, updateOne, Sequelize };
