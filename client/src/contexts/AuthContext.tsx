import React, { createContext, useContext } from 'react'
import jwt_decode from 'jwt-decode'
import { USER_TOKEN } from "resources/constants"
import { AuthEnum } from "enums"

type AuthContextT = {
  role: AuthEnum | null,
  token: string | null
  name: string | null
}

const AuthContext = createContext<AuthContextT>({ role: null, token: null, name: null })

function useAuthContext() {
  return useContext(AuthContext)
}

type Props = {
  children: JSX.Element
}

type TokenT = {
  id: number
  name: string
  role: AuthEnum
}

const AuthContextProvider = ({ children }: Props) => {
  const token = localStorage.getItem(USER_TOKEN) || ""
  const decoded = jwt_decode<TokenT>(token) || { role: null, name: null }
  const { role, name } = decoded
  return <AuthContext.Provider value={{ role, token, name }}>{children}</AuthContext.Provider>
}


export { AuthContextProvider, useAuthContext }