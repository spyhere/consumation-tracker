import React from 'react'
import AppRoutes from "./routes"
import {
  JWT_TOKEN,
  USER_TOKEN
} from "resources/constants"
import { AuthContextProvider } from "./contexts/AuthContext"

function App() {
  localStorage.setItem(USER_TOKEN, JWT_TOKEN)

  return (
    <>
      <AuthContextProvider>
        <AppRoutes/>
      </AuthContextProvider>
    </>
  )
}

export default App
