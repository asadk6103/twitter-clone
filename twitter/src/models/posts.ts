import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import Users from "./users";
import PostLikes from "./likes";

@Table({
  tableName: "posts",
  initialAutoIncrement: '10000'
})
export default class Posts extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.TEXT('long'),
    field: "description"
  })
  description?: string;

  @Column({
    type: DataType.STRING(255),
    field: "image"
  })
  image?: string;



  @ForeignKey(() => Users)
  @Column
  userId?: number;


  @BelongsTo(() => Users)
  posts?: Users;

  @HasMany(() => PostLikes)
  postLikes?: PostLikes[];
}
