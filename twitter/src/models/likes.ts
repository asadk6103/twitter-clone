import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import Users from "./users";
import Posts from "./posts";

@Table({
  tableName: "post_likes",
  initialAutoIncrement: '10000'
})
export default class PostLikes extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;


  @ForeignKey(() => Users)
  @Column
  userId?: number;


  @BelongsTo(() => Users)
  users?: Users;



  @ForeignKey(() => Posts)
  @Column
  postId?: number;


  @BelongsTo(() => Posts)
  posts?: Posts;
}
