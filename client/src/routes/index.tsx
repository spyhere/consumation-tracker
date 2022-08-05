import React from 'react'
import {
  Route,
  Routes
} from "react-router-dom"
import AdminGuard from "guards/AdminGuard"
import AdminOverview from "pages/admin/overview"
import Entries from "pages/user/entries"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="admin">
        <Route path="overview">
          <Route path="" element={<AdminGuard><AdminOverview/></AdminGuard>}/>
          <Route path="users/:id" element={<AdminGuard><Entries/></AdminGuard>}/>
        </Route>
      </Route>

      <Route path="">
        <Route path="" element={<Entries/>}/>
      </Route>
    </Routes>
  )
}


export default AppRoutes