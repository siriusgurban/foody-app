import { Box } from '@chakra-ui/react'
import React, { Component } from 'react'
import AdminHeader from '../../admin/AdminHeader'
import AdminAsideMenu from '../../admin/AdminAsideMenu'
import AdminAsideMenuResponsive from '../../admin/AdminAsideMenuResponsive'

function AdminLayout({ children }: { children: any }) {
  return (
    <Box className="bg-admin-bg h-full min-h-lvh">
      <Box className="max-w-[1440px] mx-auto">
        <AdminHeader />
        <Box className="flex gap-7">
          <AdminAsideMenu />
          <AdminAsideMenuResponsive />
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default AdminLayout
