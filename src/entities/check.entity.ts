import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('check')
export class CheckEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('longtext')
  content: string

  @Column('json')
  images: string[]

  @CreateDateColumn()
  createdAt: Date
  
  @UpdateDateColumn()
  updatedAt: Date
}