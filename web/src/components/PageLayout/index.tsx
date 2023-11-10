import React from 'react'

interface PageLayoutProps {
  children: React.ReactNode
}

const PageLayout: React.FC<PageLayoutProps> = ({children}) => {
  return (
    <div className='flex flex-row h-screen'>
      <div className='basis-1/6 shadow-lg'>Navbar</div>
      <div className='basis-5/6'>
        {children}
      </div>
    </div>
  )
}

export default PageLayout