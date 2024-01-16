import { Sequelize } from "sequelize";

export default new Sequelize(process.env.POSTGRES_URL + "?sslmode=require", { dialect: 'postgres', dialectModule: pg });