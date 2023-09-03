import { Controller, Param, Body, Get, Post, Put, Delete, Req, Res, UseAfter, Params, QueryParam } from 'routing-controllers';
import BuildResponse from '../middlewares/response';
import { UserServie } from '../services/UserService';
import { BadRequest } from '../middlewares/BaseResponse';
import { PostService } from '../services/PostService';

@Controller()
export class PostController {

    @Get("/tweets")
    async getAllPosts(@QueryParam("id") id: number) {
        const posts = await PostService.getAllPosts(id)
        if (!posts) {
            return BuildResponse.get({ posts: [] })
        } else {
            return BuildResponse.get({ posts })
        }
    }

    @Post("/me/tweets")
    async postTweet(@Body() tweet: any) {
        try {
            const createTweet = await PostService.createTweet(tweet)
            if (!createTweet) {
                return new BadRequest("Interal Server Error")
            }
            return BuildResponse.get({ tweet: createTweet })
        } catch (err) {
            console.log({ err })
        }
    }


    @Delete("/me/tweets/:id")
    async deleteTweet(@Param("id") id: number) {
        try {
            const deleted = await PostService.deleteTweet(id)
            return BuildResponse.deleted({ message: "Record deleted Successfully" })

        } catch (err) {
            console.log({ err })
        }
    }

    @Get("/me/tweets/:id")
    async getTweetById(@Param("id") id: number) {
        try {
            const tweet = await PostService.getTweetById(id)
            return BuildResponse.get({ tweet })

        } catch (err) {
            console.log({ err })
        }
    }
   
    @Get("/me/tweets")
    async getTweetByUserId(@QueryParam("uid") id: number) {
        try {
            const tweet = await PostService.getTweetByUserId(id)
            return BuildResponse.get({ tweet })

        } catch (err) {
            console.log({ err })
        }
    }
}