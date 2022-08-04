import React from 'react'
import './App.css'
import AppRoutes from "./routes"
import { AuthContextProvider } from "./contexts/AuthContext"

function App() {
  return (
    <>
      <AuthContextProvider>
        <AppRoutes/>
      </AuthContextProvider>
    </>
  )
}

export default App
