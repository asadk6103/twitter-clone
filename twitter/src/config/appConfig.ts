import path from "path";
import { getEnv } from "../common/env";


export const appConfig: any = {
    app_port: getEnv('APP_PORT'),
    app_host: Number(getEnv('APP_HOST')),
    models: path.join(getEnv('DB_MODELS_DIR'), '**/*{.ts,.js}'),
    database: getEnv('DB_NAME'),
    dialect: String(getEnv('DB_DIALECT')),
    username: getEnv('DB_USER'),
    password: getEnv('DB_PASS'),
    host: getEnv('DB_HOST'),
    db_port: Number(getEnv('DB_PORT')),
    route_prefix: getEnv('APP_ROUTE_PREFIX'),
    controllersDir: path.join(getEnv('ROUTER_CONTROLLERS_DIR'), '**/*{.ts,.js}'),
}