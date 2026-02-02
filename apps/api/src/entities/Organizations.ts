import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Organizations {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;
}
