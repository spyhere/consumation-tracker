import React from 'react'
import AppRoutes from "./routes"
import { USER_TOKEN } from "resources/constants"
import { AuthContextProvider } from "./contexts/AuthContext"

function App() {
  localStorage.setItem(USER_TOKEN, process.env.REACT_APP_USER_TOKEN || "")

  return (
    <>
      <AuthContextProvider>
        <AppRoutes/>
      </AuthContextProvider>
    </>
  )
}

export default App
