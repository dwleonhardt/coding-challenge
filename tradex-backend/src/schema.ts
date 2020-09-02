import { Column, Entity, PrimaryColumn } from 'typeorm'
import { Item, Poll } from './types'

@Entity()
export class Polls implements Poll {
  @PrimaryColumn('uuid')
  poll!: string

  @Column()
  title!: string
}

@Entity()
export class Items implements Item {
  @PrimaryColumn('uuid')
  item!: string

  @Column('uuid')
  pollId!: string

  @Column()
  name!: string

  @Column()
  votes!: number
}

export const allEntities = [Polls, Items]
