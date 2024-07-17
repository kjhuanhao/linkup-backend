import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('content')
export class ContentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string

  @Column('longtext')
  content: string;

  @Column()
  resource: string

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
