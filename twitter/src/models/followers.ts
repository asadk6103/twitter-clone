import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import Users from "./users";

@Table({
  tableName: "followers",
  initialAutoIncrement: '10000'
})
export default class Followers extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @ForeignKey(() => Users)
  @Column
  followerId?: number;

  @ForeignKey(() => Users)
  @Column
  followingId?: number;

  @BelongsTo(() => Users, { as: 'follower', foreignKey: 'followerId' })
  follower?: Users;

  @BelongsTo(() => Users, { as: 'following', foreignKey: 'followingId' })
  following?: Users;
}
