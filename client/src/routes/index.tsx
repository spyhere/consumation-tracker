import React from 'react'
import { Route, Routes } from "react-router-dom"
import AdminGuard from "../guards/AdminGuard"
import Overview from "../pages/admin/overview"
import Entries from "../pages/user/entries"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="admin">
        <Route path="overview" element={<AdminGuard><Overview /></AdminGuard>} />
      </Route>

      <Route path="">
        <Route path="entries" element={<Entries />} />
      </Route>
    </Routes>
  )
}


export default AppRoutes