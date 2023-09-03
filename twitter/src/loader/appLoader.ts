import 'reflect-metadata';
import { appConfig } from "../config/appConfig";
import express, { Application } from "express";
import { sequelize } from "./dbLoader";
import bodyParser from 'body-parser';
import { useExpressServer } from "routing-controllers";
import path from 'path';
import { Server } from "http";

class App {
    private host: string = appConfig.app_host
    private port: number = appConfig.app_port
    private app: Application = express()

    public constructor() {
        this.initApp()
    }

    public initApp() {
        this.setupMiddlWares()
        this.registerAppRoutingController()
        this.loadDatabase()
        this.bootstrap()
    }

    public setupMiddlWares() {
        console.log("\n\n\n", path.join(path.resolve(process.cwd()), "src", "public"))
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(bodyParser.json())
        this.app.use("/uploads", express.static(path.join(path.resolve(process.cwd()), "src",  "public")))
    }

    public async loadDatabase() {
        try {
            await sequelize.sync()
        } catch (err) {
            console.log({ err })
        }
    }

    public registerAppRoutingController() {
        console.log("\n\n\n\n", process.cwd())
        useExpressServer(this.app, {
            cors: true,
            routePrefix: '/api',
            defaultErrorHandler: false,
            controllers: [appConfig.controllersDir],
            // middlewares: [path.join(path.resolve("/"), "src", appConfig.middlwWareDir)]
        })
    }


    public bootstrap() {
        const server = new Server(this.app)
        server.listen(this.port, () => console.log(`🚀 Server started at http://localhost:${this.port}\n🚨️ Environment: ${process.env.NODE_ENV}`));

    }
}

export default App