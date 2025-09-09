import React from 'react'
import { Stack } from '@mui/material'
import Image from 'next/image'    
import logo from '/public/images/logo.png'
// import { RiDashboardLine } from "react-icons/ri";
// import { SiWikibooks } from "react-icons/si";
import { BadgeIcon, BookOpen, GraduationCap,LayoutDashboard, Settings } from 'lucide-react'

function SideNavbar() {
    const sidebaritem= [
        {
            id:1,
            name:'Dashboard',
            icon:LayoutDashboard
        },
        {
            id:2,
            name:'All Courses',
            icon:BookOpen
        },
        {
            id:3,
            name:'Membership',
            icon:BadgeIcon
        },
        {
            id:4,
            name:'Be Instuctor',
            icon:GraduationCap
        },
        {
            id:5,
            name:'Setting',
            icon:Settings
        },
    ]

  return (
<div className='sidebar p-5'>
  <div className='flex justify-center mb-6'>
    <Image src={logo} alt="logo" width={100} height={100} />
  </div>

  <Stack spacing={2}>
    {sidebaritem.map((item) => (
      <div key={item.id} 
      className='flex gap-3 items-center
      text-gray-700 cursor-pointer
        hover:bg-blue-200 
        hover:text-black 
        rounded-md p-1
        transition-all
        ease-in-out duration-200
        '>
        <item.icon />
        <h2 className='font-medium'>{item.name}</h2>
      </div>
    ))}
  </Stack>
</div>

  )
}

export default SideNavbar
