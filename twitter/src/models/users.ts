import { Model, Table, Column, DataType, HasMany, BeforeUpdate, BeforeCreate, BeforeFind } from "sequelize-typescript";
import Posts from "./posts";
import PostLikes from "./likes";
import Followers from "./followers";
import * as crypto from 'crypto'

@Table({
    tableName: "users",
    initialAutoIncrement: '10000'
})
export default class Users extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    })
    id?: number;

    @Column({
        type: DataType.STRING(50),
        field: "name"
    })
    name?: string;

    @Column({
        type: DataType.STRING(50),
        field: "username"
    })
    username?: string;

    @Column({
        type: DataType.STRING(50),
        field: "email"
    })
    email?: string;

    @Column({
        type: DataType.STRING(50),
        field: "password"
    })
    password?: string;

    @Column({
        type: DataType.DATEONLY,
        field: "dob"
    })
    dob?: Date;

    @Column({
        type: DataType.STRING(255),
        field: "image"
    })
    image?: string;

    @BeforeFind
    static encryptPassword(options: any) {
        if (options.where && options.where.password) {
            options.where.password = crypto.createHash('md5').update(options.where.password).digest('hex');
        }
    }

    @BeforeUpdate
    @BeforeCreate
    static hashPassword(instance: Users) {
        const hashedPassword = crypto.createHash("md5").update(String(instance.password)).digest("hex")
        instance.password = hashedPassword
    }


    @HasMany(() => Posts)
    posts?: Posts[];


    @HasMany(() => PostLikes)
    postLikes?: PostLikes[];

    @HasMany(() => Followers)
    followers?: Followers[];
}

