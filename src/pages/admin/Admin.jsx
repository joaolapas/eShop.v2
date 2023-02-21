import React from 'react'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import Dashboard from './dashboard/Dashboard'

const Admin = () => {
  return (
    <div>
     Admin Area
     <Link to="dashboard">Dashboard</Link>
     <Link to="products">Products</Link>
     <Outlet />
    </div>
  )
}

export default Admin
