import React from 'react'
import SideNavbar from './SideNavbar'
import TopNavbr from './TopNavbr'

function layout({children}) {
  return (
    <div> 
        <div className='sm:w-64 sm:block fixed'>
            <SideNavbar/>
        </div>
        <div className='ml-64'>
          <TopNavbr/>
        {children}
        </div>
    </div>
  )
}

export default layout