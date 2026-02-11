import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
} from "typeorm";
import Post from "./Post";
import User from "./User";

@Entity("likes")
@Unique(["userId", "postId"])
export default class Like {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  userId!: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column()
  postId!: string;

  @ManyToOne(() => Post, { onDelete: "CASCADE" })
  @JoinColumn({ name: "postId" })
  post!: Post;

  @CreateDateColumn()
  createdAt!: Date;
}
