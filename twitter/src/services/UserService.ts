import { Op, QueryTypes } from "sequelize";
import Users from "../models/users";
import { BadRequest } from "../middlewares/BaseResponse";
import Followers from "../models/followers";
import { sequelize } from "../loader/dbLoader";


export class UserServie {

    public static async register(payload: Users) {
        const validateUserName = await UserServie.validateUserName(String(payload.username))
        const validateEmail = await UserServie.validateEmail(String(payload.email))

        if (validateEmail && validateUserName) {
            return null
        }

        const user = await Users.create<Users>({ ...payload })
        return user

    }

    public static async getUserById(id: number) {

        const user = await Users.findByPk(id)
        return user?.get({ plain: true })

    }

    public static async validateUserName(username: string) {
        const response = await Users.findAll({
            where: {
                username: {
                    [Op.eq]: username
                }
            }
        })

        if (response.length > 0) {
            throw new BadRequest("This username is already registered")
        }
        return null
    }
    public static async validateEmail(email: string) {
        const response = await Users.findAll({
            where: {
                email: {
                    [Op.eq]: email
                }
            }
        })

        if (response.length > 0) {
            throw new BadRequest("This Email Address is already registered")
        }
        return null
    }

    public static async getAllUsers() {
        const response = await Users.findAll({
            raw: true,
            attributes: ["name", "username", "id"]
        })
        return response
    }


    public static async getSuggestions() {
        const response = await sequelize.query("SELECT `Users`.`id`, `Users`.`name`, `Users`.`username`, `Users`.`email`, `Users`.`password`, `Users`.`dob`, `Users`.`image`, `Users`.`createdAt`, `Users`.`updatedAt`, `followers`.`id` AS `followers.id`, `followers`.`followerId` AS `followers.followerId`, `followers`.`followingId` AS `followers.followingId`, `followers`.`createdAt` AS `followers.createdAt`, `followers`.`updatedAt` AS `followers.updatedAt` FROM `users` AS `Users` LEFT OUTER JOIN `followers` AS `followers` ON `Users`.`id` = `followers`.`followerId` WHERE `followers`.`followingId` != " + 10002 + ";",
            { type: QueryTypes.SELECT })
        return response
    }


    public static async getLogin(username: string, password: string) {
        let user: any = []
        if (username.indexOf('@') > 0) {
            user = await Users.findAll({
                raw: true,
                where: { email: username, password }
            })
        } else {
            user = await Users.findAll({
                raw: true,
                where: { username, password }
            })
        }


        if (user.length === 0) {
            throw new BadRequest("User not found")
        }

        return user

    }


}