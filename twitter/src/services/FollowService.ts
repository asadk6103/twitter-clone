import { Op } from "sequelize";
import Followers from "../models/followers";
import Users from "../models/users";


export class FollowService {

    public static async create(follower: Followers) {
        const validation = await FollowService.validateLike(Number(follower.followerId), Number(follower.followingId))
        if (validation.length > 0) {
            validation.forEach(async (element: any) => {
                await FollowService.deleteLike(element.id)
            });
        } else {
            const _follower = await Followers.create({ ...follower })
            return _follower.get({ plain: true })
        }
    }


    public static async validateLike(followerId: number, followingId: number) {
        const response = await Followers.findAll({
            raw: true,
            where: { followerId, followingId }
        })
        return response
    }


    public static async deleteLike(id: number) {
        const response = await Followers.destroy({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        })

        return response
    }


    public static async getMyFollowers(id: number) {
        const response = await Followers.findAll({
            where: {
                followingId: {
                    [Op.eq]: id
                }
            }
        })

        return response
    }


    public static async getMyFollowings(id: number) {
        const response = await Followers.findAll({
            where: {
                followerId: {
                    [Op.eq]: id
                }
            }
        })

        return response
    }


    public static async getSuggestions() {
        const user = await Followers.findAll({
            include: [
                {
                    model: Users,
                }
            ],
            where: {
                followingId: {
                    [Op.not]: "users.id"
                }
            }
        })
        return user

    }


    public static async getAllFollows() {
        const follows = await Followers.findAll({
            raw: true
        })
        return follows

    }
}