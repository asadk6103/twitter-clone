export class BaseResponse extends Error {
    public statusCode: number

    constructor(message: string, statusCode = 500) {
        super(message)
        this.message = message
        this.statusCode = statusCode
        Object.setPrototypeOf(this, BaseResponse.prototype)
    }
}


export class BadRequest extends BaseResponse {
    constructor(message: string) {
        super(message, 400)
        Object.setPrototypeOf(this, BadRequest.prototype)
    }
}
export class Forbidden extends BaseResponse {
    constructor(message: string) {
        super(message, 403)
        Object.setPrototypeOf(this, Forbidden.prototype)
    }
}

export class InternalServer extends BaseResponse {
    constructor(message: string) {
        super(message, 500)
        Object.setPrototypeOf(this, InternalServer.prototype)
    }
}

export class NotFound extends BaseResponse {
    constructor(message: string) {
        super(message, 404)
        Object.setPrototypeOf(this, NotFound.prototype)
    }
}

export class Unauthorized extends BaseResponse {
    constructor(message: string) {
        super(message, 401)
        Object.setPrototypeOf(this, Unauthorized.prototype)
    }
}