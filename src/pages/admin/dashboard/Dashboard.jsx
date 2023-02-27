import React from 'react'
import AdminSass from "../Admin.module.sass";
import { FaUsers, FaChartBar, FaClipboard } from 'react-icons/fa'

const Dashboard = () => {
  return (
    <div>
      <div className={AdminSass.dashboardOverview}>
        <h2>Overview</h2>
        <div className={AdminSass.dashboardOverviewData}>
          <div className={AdminSass.dashboardOverviewDataItem}>
            <FaUsers className={AdminSass.dataItemIcon}/>
            <div className={AdminSass.dataItemContent}>
              <div>76</div>
              <div>Users</div>
            </div>
            <div className={AdminSass.dataComparisson}></div>
          </div>
          <div className={AdminSass.dashboardOverviewDataItem}>
            <FaChartBar className={AdminSass.dataItemIcon}/>
            <div className={AdminSass.dataItemContent}>
              <div>32</div>
              <div>Orders</div>
            </div>
            <div className={AdminSass.dataComparisson}></div>
          </div>
          <div className={AdminSass.dashboardOverviewDataItem}>
            <FaClipboard className={AdminSass.dataItemIcon}/>
            <div className={AdminSass.dataItemContent}>
              <div>€4,234</div>
              <div>Earnings</div>
            </div>
            <div className={AdminSass.dataComparisson}>
            
            </div>
          </div>
        
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard
