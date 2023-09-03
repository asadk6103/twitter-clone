import path from 'path'
import { Sequelize } from 'sequelize-typescript'
import { appConfig } from '../config/appConfig'

export const sequelize = new Sequelize({
    host: appConfig.host,
    port: appConfig.db_port,
    username: appConfig.username,
    password: appConfig.password,
    database: appConfig.database,
    dialect: 'mysql',
    models: [appConfig.models],
})