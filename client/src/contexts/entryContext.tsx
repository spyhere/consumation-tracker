import {
  createContext,
  useContext
} from "react"

type EntryContextT = {
  deleteEntry: (id: number) => void
}

const noop = () => {}
const defaultValue = {
  deleteEntry: noop
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
