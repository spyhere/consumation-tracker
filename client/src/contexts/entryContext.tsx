import {
  createContext,
  useContext
} from "react"
import { EntryUpdateT } from "../api/entry"

type EntryContextT = {
  deleteEntry: (id: number) => void
  editEntry: (id: number, body: EntryUpdateT) => void
}

const noop = () => {}
const defaultValue = {
  deleteEntry: noop,
  editEntry: noop,
}

const EntryContext = createContext<EntryContextT>(defaultValue)

const useStateContext = () => useContext(EntryContext)

type Props = {
  children: JSX.Element
  defaultValue: EntryContextT
}

const StateContextProvider = ({ children, defaultValue }: Props) => {
  return <EntryContext.Provider value={defaultValue}>{children}</EntryContext.Provider>
}

export { StateContextProvider, useStateContext }
