import React from 'react'
import { Navigate, useLocation } from "react-router-dom"
import { AuthEnum } from "../enums"
import { useAuthContext } from "../contexts/AuthContext"

type Props = {
  children: JSX.Element
}

const AdminGuard = ({ children }: Props) => {
  const { role } = useAuthContext()
  const location = useLocation()

  if (role !== AuthEnum.ADMIN) {
    return <Navigate to="/" state={{ from: location }} replace/>
  }

  return children
}


export default AdminGuard