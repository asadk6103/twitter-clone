import { Op } from "sequelize";
import { BadRequest } from "../middlewares/BaseResponse";
import PostLikes from "../models/likes";
import Posts from "../models/posts";
import Users from "../models/users";


export class LikesService {

    public static async createLike(like: PostLikes) {
        const validation = await LikesService.validateLike(Number(like.userId), Number(like.postId))
        if (validation.length > 0) {
            validation.forEach(async (element: any) => {
                await LikesService.deleteLike(element.id)
            });
        } else {
            const _like = await PostLikes.create({ ...like })
            return _like.get({ plain: true })
        }
    }


    public static async validateLike(userId: number, postId: number) {
        const response = await PostLikes.findAll({
            raw: true,
            where: { userId, postId }
        })
        return response
    }


    public static async deleteLike(likeId: number) {
        const response = await PostLikes.destroy({
            where: {
                id: {
                    [Op.eq]: likeId
                }
            }
        })

        return response
    }


    public static async getLikesCounts() {
        const response = await PostLikes.count({
            col: "postId",
            group: ["postId"],
        })
        return response
    }

    public static async getLikes() {
        const response = await PostLikes.findAll({
            raw: true,
            attributes: ['userId', 'postId'],
            include:[
                {
                    model: Users,
                    attributes: ["name"]
                }
            ]
        })
        return response
    }
}