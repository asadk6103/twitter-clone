import { Controller, Param, Body, Get, Post, Put, Delete, Req, Res, UseAfter, Params, QueryParam, UseBefore } from 'routing-controllers';
import BuildResponse from '../middlewares/response';
import { UserServie } from '../services/UserService';
import { BadRequest } from '../middlewares/BaseResponse';
import multer, { diskStorage } from 'multer';

@Controller()

export class UserController {
    @Post("/signup")
    // @UseBefore(multer({
    //     dest: 'uploads/',
    //     storage: diskStorage({
    //         destination: function (req, file, cb) {
    //             cb(null, 'src/public/')
    //         },
    //         filename: function (req, file, cb) {
    //             const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    //             if (!allowedMimeTypes.includes(file.mimetype)) {
    //                 cb(new BadRequest(`${file.mimetype} is not a supported file type!`), file.originalname)
    //             }
    //             cb(null, Date.now() + file.originalname)
    //         }
    //     })
    // }).single("image"))
    async signup(@Body() user: any, @Req() req: any) {
        try {
            // user['image'] = "/uploads/" + req.file.filename
            const _user = await UserServie.register(user)
            if (!_user) {
                return new BadRequest("Interal Server Error")
            }

            return BuildResponse.created({ user: _user.dataValues })
        } catch (err) {

        }
    }


    @Get("/email/:email")
    async validateEmail(@Param("email") email: string) {
        const _user = await UserServie.validateEmail(email)
        return BuildResponse.get({ _user })
    }

    @Get("/username/:username")
    async validateUserName(@Param("username") username: string) {
        const _user: any = await UserServie.validateUserName(username)
        return BuildResponse.get({ _user })
    }

    @Get("/login")
    async loginUser(@QueryParam("username") username: string, @QueryParam("password") password: string) {
        const _user = await UserServie.getLogin(username, password)
        return BuildResponse.get({ user: _user })
    }
   
    @Get("/users")
    async users() {
        const _user = await UserServie.getAllUsers()
        return BuildResponse.get({ user: _user })
    }


    @Get("/user")
    async getUsers(@QueryParam("id") id: number) {
   
        const _user = await UserServie.getUserById(id)
        return BuildResponse.get({ user: _user })
    }



}