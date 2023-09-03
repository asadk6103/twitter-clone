import { Op, QueryTypes } from "sequelize";
import { BadRequest } from "../middlewares/BaseResponse";
import Posts from "../models/posts";
import Users from "../models/users";
import { sequelize } from "../loader/dbLoader";


export class PostService {

    public static async getAllPosts(id: number) {
        const response = await sequelize.query(
            `select followers.*,posts.*, users.* FROM followers JOIN posts ON followers.followingId  = posts.userId JOIN users ON followers.followingId  = users.Id  WHERE followers.followerId = ${id}`,
            { type: QueryTypes.SELECT }
        )
        return response
    }

    public static async createTweet(payload: Posts) {
        const response = await Posts.create({
            description: payload.description,
            userId: payload.userId,
            image: ""
        })
        return response
    }

    public static async getTweetById(id: number) {
        const response = await Posts.findByPk(id)
        return response?.get({ plain: true })
    }

    public static async getTweetByUserId(id: number) {
        const response = await sequelize.query(
            `select posts.*, users.* FROM posts 
            JOIN users ON posts.userId = users.Id  
            WHERE users.Id =  ${id}`,
            { type: QueryTypes.SELECT }
        )
        return response
    }

    public static async deleteTweet(id: number) {
        const response = await Posts.destroy({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        })
        return response
    }

}