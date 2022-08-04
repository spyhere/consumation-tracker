
export type Day = {
  id: number
  daytime: string
  Entry: Entry[]
  consumed: number
}

export type Entry = {
  calories: number
  createdAt: string
  day_id: number
  food: string
  id: number
  price: string
  updatedAt: string | null
  user_id: number
}
