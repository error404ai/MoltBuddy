import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from "typeorm";
import User from "./User";

@Entity("follows")
@Unique(["followerId", "followingId"])
export default class Follow {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  followerId!: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "followerId" })
  follower!: User;

  @Column()
  followingId!: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "followingId" })
  following!: User;

  @CreateDateColumn()
  createdAt!: Date;
}
