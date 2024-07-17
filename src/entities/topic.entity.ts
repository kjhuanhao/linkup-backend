import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('main_topic')
export class MainTopicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string

  @Column()
  emoji: string
}

@Entity('child_topic')
export class ChildTopicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  emoji: string;

  @Column({
    nullable: false,
  })
  @ManyToOne(() => MainTopicEntity, (mainTopic) => mainTopic.id)
  mainTopicId: string;

  @Column({
    nullable: false,
  })
  lastTopicId: string;

  @Column({
    nullable: true,
  })
  contentId: string;
}
