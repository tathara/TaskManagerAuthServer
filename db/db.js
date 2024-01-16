import { Sequelize } from "sequelize";
import pg from 'pg';

export default new Sequelize(process.env.POSTGRES_URL + "?sslmode=require", { dialect: 'postgres', dialectModule: pg });