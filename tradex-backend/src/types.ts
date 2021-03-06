import { IsNumber, IsString, IsUUID} from 'class-validator'

export interface Poll {
  poll: string
  title: string
}

export interface Item {
  item: string
  pollId: string
  name: string
  votes: number
}

export class NewPollRequest {
  @IsString()
  title!: string
}

export class NewItemRequest {
  @IsUUID()
  pollId!: string

  @IsString()
  name!: string
}

export class DeletePollRequest {
  @IsUUID()
  pollId!: string
}

export class VoteRequest {
  @IsUUID()
  itemId!: string
}

export class ItemRequest {
  @IsUUID()
  pollId!: string
}

export interface FullPoll extends Poll {
  items: Item[]
}
