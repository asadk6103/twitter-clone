import { Body, Controller, Get, Post } from "routing-controllers";
import { LikesService } from "../services/LikesService";
import BuildResponse from "../middlewares/response";


@Controller()
export class PostController {

    @Post("/like")
    async createLiek(@Body() like: any) {
        const _like = await LikesService.createLike(like)
        return BuildResponse.created({ like: _like })
    }

    @Get("/likes-count")
    async getLikesCounts() {
        const _likes = await LikesService.getLikesCounts()
        return BuildResponse.get({ likes: _likes })
    }
   
    @Get("/likes")
    async getLikes() {
        const _likes = await LikesService.getLikes()
        if(!_likes) {
            return BuildResponse.get({ likes: [] })
        }else{
            return BuildResponse.get({ likes: _likes })
        }
    }
}
