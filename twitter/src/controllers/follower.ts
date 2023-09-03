import { Body, Controller, Get, Post, QueryParam } from "routing-controllers"
import { FollowService } from "../services/FollowService"
import BuildResponse from "../middlewares/response"

@Controller()
export class FollowerController {

    @Post("/me/follow")
    async createFollow(@Body() follow: any) {
        const _follow = await FollowService.create(follow)
        return BuildResponse.created({ follow: _follow })
    }

    @Get("/me/follower")
    async getMyFollowers(@QueryParam("id") id: any) {
        const _follow = await FollowService.getMyFollowers(id)
        return BuildResponse.created({ follower: _follow })
    }

    @Get("/me/following")
    async getMyFollowings(@QueryParam("id") id: any) {
        const _follow = await FollowService.getMyFollowings(id)
        return BuildResponse.created({ following: _follow })
    }

    @Get("/follow")
    async getFollows() {
        const _follow = await FollowService.getAllFollows()
        return BuildResponse.created({ follows: _follow })
    }
}
