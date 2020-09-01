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
