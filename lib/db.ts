import { createStore } from "zustand/vanilla"
import { SimpleUser } from "./zod"

export interface DatabaseState {
  users: Array<SimpleUser>
}

export const createDb = createStore<DatabaseState>((set) => ({
  users: [],
}))
