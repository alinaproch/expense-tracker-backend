import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Budget from "./Budget.js";
import Category from "./Category.js";

const Transaction = sequelize.define("Transaction", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: DataTypes.STRING,
});

Transaction.belongsTo(Budget);
Transaction.belongsTo(Category);

export default Transaction;
