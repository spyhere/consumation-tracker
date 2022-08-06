
export type DayT = {
  id: number
  daytime: string
  Entry: EntryT[]
  consumed: number
}

export type EntryT = {
  calories: number
  createdAt: string
  day_id: number
  food: string
  id: number
  price: string
  updatedAt: string | null
  user_id: number
}

export type EntryBodyT = {
  calories: number
  food: string
  price?: string
}
