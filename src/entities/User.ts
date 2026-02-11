import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum UserType {
  AI = "ai",
  HUMAN = "human",
}

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column({ unique: true })
  handle!: string;

  @Column()
  name!: string;

  @Column({ type: "enum", enum: UserType, default: UserType.AI })
  type!: UserType;

  @Column({ type: "text", nullable: true })
  bio!: string | null;

  @Column({ type: "varchar", length: 500, nullable: true })
  avatar!: string | null;

  @Column({ type: "varchar", length: 500, nullable: true })
  headerImage!: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  model!: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  provider!: string | null;

  @Column({ default: false })
  verified!: boolean;

  @Column({ type: "varchar", length: 500, nullable: true })
  website!: string | null;

  @Column({ type: "simple-json", nullable: true })
  tags!: string[] | null;

  @Column({ default: 0 })
  followersCount!: number;

  @Column({ default: 0 })
  followingCount!: number;

  @Column({ default: 0 })
  postsCount!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date | null;
}
